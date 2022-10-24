import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import dayjs from 'dayjs';
import { FormContainer } from 'react-hook-form-mui';
import UserApi from '../api/UserApi';
import { AdminUserDetails, AdminUserParameters } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import { useOnDependenciesChange } from '../../react-hooks-alias/ReactHooksAlias';
import useConfirmation from '../../react-hook-confirm/ReactHookConfirm';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import NotificationEngine from '../../plume-notification/NotificationEngine';
import { makeErrorMessageMapping } from '../../plume-form-error-messages/FormErrorMessages';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';
import PlumeMessageResolverService from '../../plume-messages/MessageResolverService';
import useMessagesResolver from '../../plume-messages/messagesResolveHook';

type UsersRouteParams = {
  userId: string,
};

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  updateUsersAndRoles: () => void,
  usersPath: string,
};

function findUser(userId?: string, usersWithRoles?: AdminUsersWithIndexedRolesType): AdminUserDetails | undefined {
  return userId && usersWithRoles
    ? usersWithRoles.users.filter((user) => user.id === userId)?.[0]
    : undefined;
}

export default class UsersEdit {
  constructor(private readonly userApi: UserApi,
    private readonly notificationEngine: NotificationEngine,
    private readonly theme: PlumeAdminTheme,
    private readonly messageService: PlumeMessageResolverService) {
  }

  render = ({ usersWithRoles, updateUsersAndRoles, usersPath }: Props) => {
    const { userId } = useParams<UsersRouteParams>();

    const messages = useMessagesResolver(this.messageService);

    const navigate = useNavigate();

    const isCreation = userId === undefined;

    // small optimization to avoid fetching the current user during each render cycle
    const userToEdit = useMemo(() => findUser(userId, usersWithRoles), [usersWithRoles]);

    const formContext = useForm<AdminUserParameters>({
      defaultValues: userToEdit,
    });

    const {
      getValues, setError, reset, formState,
    } = formContext;

    // when the users are loaded from the upper component, we need update the form with the new values
    useOnDependenciesChange(() => reset(userToEdit), [usersWithRoles]);

    // data validation

    // TODO en réalité le changement de mot de passe devrait être dans une action à part
    const validatePasswordAndConfirmationEmptiness = (values: AdminUserParameters) => {
      if (values.password && !values.passwordConfirmation) {
        setError('passwordConfirmation', { type: 'required' });
        return false;
      }
      if (!values.password && values.passwordConfirmation) {
        setError('password', { type: 'required' });
        return false;
      }
      return true;
    };

    const validatePasswordAndConfirmation = (optionalValues?: AdminUserParameters) => {
      const values = optionalValues ?? getValues();
      if (values.password && values.passwordConfirmation && values.password !== values.passwordConfirmation) {
        setError('password', { type: 'validate' });
        return false;
      }
      return true;
    };

    // save user handling

    const savingLoader = useLoader();

    const trySaveUser = (userToSave: AdminUserParameters) => {
      if (validatePasswordAndConfirmationEmptiness(userToSave) && validatePasswordAndConfirmation(userToSave)) {
        savingLoader.monitor(this
          .userApi
          .save(userToSave)
          .then((createdUser) => {
            updateUsersAndRoles();
            this.notificationEngine.addSuccess(messages.t('message.changes_saved'));
            if (createdUser) {
              navigate(createdUser.id);
            }
          })
          .catch((httpError) => this.notificationEngine.addDanger(messages.httpError(httpError))));
      }
    };

    // delete user handling

    const deletingLoader = useLoader();

    const confirmDeleteUser = useConfirmation();

    const tryDeleteUser = (idUser: string) => {
      deletingLoader.monitor(this
        .userApi
        .delete(idUser)
        .then(() => {
          updateUsersAndRoles();
          this.notificationEngine.addSuccess(messages.t('message.changes_saved'));
          navigate(usersPath);
        })
        .catch((httpError) => this.notificationEngine.addDanger(messages.httpError(httpError))));
    };

    // cancel modification handling

    const cancelEdit = () => navigate(usersPath);

    const { dirtyFields } = formState;
    // usage of dirtyFields instead of isDirty: https://github.com/react-hook-form/react-hook-form/issues/3562
    const confirmCloseWithoutSaving = useConfirmation({ onlyIf: Object.keys(dirtyFields).length !== 0 });

    return (
      <this.theme.popin>
        <this.theme.popinCloseWithoutSaving
          confirmCloseWithoutSaving={confirmCloseWithoutSaving}
          closeWithoutSavingAction={cancelEdit}
        />
        {confirmDeleteUser.shouldAskConfirmation && (
        <this.theme.popin zIndex={101}>
          {messages.t('message.confirm_delete')}
          <this.theme.actionsContainer>
            <this.theme.actionButton
              style={ActionStyle.SECONDARY}
              onClick={confirmDeleteUser.reset}
            >
              {messages.t('action.cancel')}
            </this.theme.actionButton>
            {userId && (
            <this.theme.actionButton
              style={ActionStyle.DANGER}
              onClick={confirmDeleteUser.confirm(() => tryDeleteUser(userId))}
            >
              {messages.t('action.delete')}
            </this.theme.actionButton>
            )}
          </this.theme.actionsContainer>
        </this.theme.popin>
        )}
        <h2>{isCreation ? messages.t('user.title_create') : messages.t('user.title_edit')}</h2>
        <this.theme.actionsContainer>
          <this.theme.actionLink
            icon="keyboard_arrow_left"
            linkTo={usersPath}
          >
            {messages.t('action.back')}
          </this.theme.actionLink>
        </this.theme.actionsContainer>
        <this.theme.panel>
          <FormContainer formContext={formContext} onSuccess={trySaveUser}>
            <input type="hidden" name="id" value={userToEdit?.id} />
            <this.theme.formField
              inputId="userName"
            >
              <this.theme.inputText
                label={messages.t('users.userName')}
                name="userName"
                rules={{ required: true }}
                useNameAsId
              />
            </this.theme.formField>
            <this.theme.formField
              inputId="email"
              errorMessageMapping={makeErrorMessageMapping(messages.t('error.field.email_wrong_format'))}
            >
              <this.theme.inputText
                name="email"
                label={messages.t('users.email')}
                rules={{ required: true, validate: isEmail }}
                useNameAsId
              />
            </this.theme.formField>
            <this.theme.formField
              inputId="firstName"
            >
              <this.theme.inputText
                name="firstName"
                rules={{ required: true }}
                label={messages.t('users.firstName')}
                useNameAsId
              />
            </this.theme.formField>
            <this.theme.formField
              inputId="lastName"
            >
              <this.theme.inputText
                name="lastName"
                label={messages.t('users.lastName')}
                rules={{ required: true }}
                useNameAsId
              />
            </this.theme.formField>
            <this.theme.formField
              inputId="idRole"
            >
              <this.theme.inputSelect
                name="idRole"
                useNameAsId
                label={messages.t('users.role')}
                defaultValue={userToEdit?.idRole}
                required
                options={
                  Array.from(usersWithRoles?.roles || []).map(
                    ([roleId, roleName]) => ({ value: roleId, label: roleName }))
                }
              />
            </this.theme.formField>
            <this.theme.panelSeparator />
            <this.theme.formField
              inputId="password"
              errorMessageMapping={makeErrorMessageMapping(messages.t('user.error_passwords_different'))}
            >
              <this.theme.inputText
                type="password"
                name="password"
                label={messages.t('users.password')}
                autoComplete="off"
                onBlur={() => validatePasswordAndConfirmation()}
                rules={{ required: isCreation }}
                useNameAsId
              />
            </this.theme.formField>
            <this.theme.formField
              inputId="passwordConfirmation"
            >
              <this.theme.inputText
                type="password"
                name="passwordConfirmation"
                label={messages.t('user.password_confirm')}
                autoComplete="off"
                onBlur={() => validatePasswordAndConfirmation()}
                rules={{ required: isCreation }}
                useNameAsId
              />
            </this.theme.formField>
            {userToEdit
              && (
              <>
                <this.theme.panelSeparator />
                <this.theme.formField>
                  <this.theme.inputText
                    label={messages.t('label.creation_date')}
                    disabled
                    defaultValue={dayjs(userToEdit.creationDate).format('L LT')}
                  />
                </this.theme.formField>
              </>
              )}
            <this.theme.actionsContainer>
              <this.theme.actionButton
                icon="keyboard_arrow_left"
                style={ActionStyle.SECONDARY}
                onClick={confirmCloseWithoutSaving.handleConfirmation(cancelEdit)}
              >
                {messages.t('action.back')}
              </this.theme.actionButton>
              {
                userId && (
                <this.theme.actionButton
                  icon="delete"
                  style={ActionStyle.DANGER}
                  onClick={confirmDeleteUser.handleConfirmation(() => tryDeleteUser(userId))}
                  isLoading={deletingLoader.isLoading}
                >
                  {messages.t('action.delete')}
                </this.theme.actionButton>
                )
              }
              <this.theme.actionButton icon="save" style={ActionStyle.PRIMARY} isLoading={savingLoader.isLoading}>
                {messages.t('action.save')}
              </this.theme.actionButton>
            </this.theme.actionsContainer>
          </FormContainer>
        </this.theme.panel>
      </this.theme.popin>
    );
  };
}
