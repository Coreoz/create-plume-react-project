import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import dayjs from 'dayjs';
import UserApi from '../api/UserApi';
import { AdminUserDetails, AdminUserParameters } from '../api/AdminUserTypes';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import { useOnDependenciesChange } from '../../react-hooks-alias/ReactHooksAlias';
import useConfirmation from '../../react-hook-confirm/ReactHookConfirm';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import PlumeMessageResolver from '../../plume-messages/MessageResolver';
import NotificationEngine from '../../plume-notification/NotificationEngine';
import { makeErrorMessageMapping } from '../../plume-form-error-messages/FormErrorMessages';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';

type UsersRouteParams = {
  userId: string,
};

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  updateUsersAndRoles: () => void,
  usersPath: string,
};

function findUser(userId: string, usersWithRoles?: AdminUsersWithIndexedRolesType): AdminUserDetails | undefined {
  return userId && usersWithRoles
    ? usersWithRoles.users.filter((user) => user.id === userId)?.[0]
    : undefined;
}

export default class UsersEdit {
  constructor(private readonly userApi: UserApi,
    private readonly notificationEngine: NotificationEngine,
    private readonly theme: PlumeAdminTheme,
    private readonly messages: PlumeMessageResolver) {
  }

  render = ({ usersWithRoles, updateUsersAndRoles, usersPath }: Props) => {
    const { userId } = useParams<UsersRouteParams>();

    const history = useHistory();

    const isCreation = userId === undefined;

    // small optimization to avoid fetching the current user during each render cycle
    const userToEdit = useMemo(() => findUser(userId, usersWithRoles), [usersWithRoles]);

    const {
      handleSubmit, getValues, setError, reset, formState, control, formState: { errors },
    } = useForm<AdminUserParameters>({
      defaultValues: userToEdit,
    });

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
            this.notificationEngine.addSuccess(this.messages.t('message.changes-saved'));
            if (createdUser) {
              history.push(`${usersPath}/${createdUser.id}`);
            }
          })
          .catch((httpError) => this.notificationEngine.addDanger(this.messages.httpError(httpError))));
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
          this.notificationEngine.addSuccess(this.messages.t('message.changes-saved'));
          history.push(usersPath);
        })
        .catch((httpError) => this.notificationEngine.addDanger(this.messages.httpError(httpError))));
    };

    // cancel modification handling

    const cancelEdit = () => history.push(usersPath);

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
          {this.messages.t('message.confirm_delete')}
          <this.theme.actionsContainer>
            <this.theme.actionButton
              style={ActionStyle.SECONDARY}
              onClick={confirmDeleteUser.reset}
            >
              {this.messages.t('action.cancel')}
            </this.theme.actionButton>
            <this.theme.actionButton
              style={ActionStyle.DANGER}
              onClick={confirmDeleteUser.confirm(() => tryDeleteUser(userId))}
            >
              {this.messages.t('action.delete')}
            </this.theme.actionButton>
          </this.theme.actionsContainer>
        </this.theme.popin>
        )}
        <h2>{isCreation ? this.messages.t('user.title_create') : this.messages.t('user.title-edit')}</h2>
        <this.theme.actionsContainer>
          <this.theme.actionLink
            icon="keyboard_arrow_left"
            linkTo={usersPath}
          >
            {this.messages.t('action.back')}
          </this.theme.actionLink>
        </this.theme.actionsContainer>
        <this.theme.panel>
          <form onSubmit={handleSubmit(trySaveUser)}>
            <input type="hidden" name="id" value={userToEdit?.id} />
            <this.theme.formField inputId="userName" label={this.messages.t('users.userName')} error={errors.userName}>
              <this.theme.inputText control={control} name="userName" rules={{ required: true }} useNameAsId />
            </this.theme.formField>
            <this.theme.formField
              inputId="email"
              label={this.messages.t('users.email')}
              error={errors.email}
              errorMessageMapping={makeErrorMessageMapping(this.messages.t('error.field.email_wrong_format'))}
            >
              <this.theme.inputText
                name="email"
                control={control}
                rules={{ required: true, validate: isEmail }}
                useNameAsId
              />
            </this.theme.formField>
            <this.theme.formField
              inputId="firstName"
              label={this.messages.t('users.firstName')}
              error={errors.firstName}
            >
              <this.theme.inputText control={control} name="firstName" rules={{ required: true }} useNameAsId />
            </this.theme.formField>
            <this.theme.formField inputId="lastName" label={this.messages.t('users.lastName')} error={errors.lastName}>
              <this.theme.inputText control={control} name="lastName" rules={{ required: true }} useNameAsId />
            </this.theme.formField>
            <this.theme.formField inputId="idRole" label={this.messages.t('users.role')} error={errors.idRole}>
              <this.theme.inputSelect
                name="idRole"
                useNameAsId
                control={control}
                defaultValue={userToEdit?.idRole}
                required
              >
                {
                usersWithRoles
                  ? Array
                    .from(usersWithRoles?.roles)
                    .map(
                      ([roleId, roleName]) => (
                        <option
                          key={roleId}
                          value={roleId}
                        >
                          {roleName}
                        </option>
                      ),
                    )
                  : undefined
              }
              </this.theme.inputSelect>
            </this.theme.formField>
            <this.theme.panelSeparator />
            <this.theme.formField
              inputId="password"
              label={this.messages.t('users.password')}
              error={errors.password}
              errorMessageMapping={makeErrorMessageMapping(this.messages.t('user.error_passwords_different'))}
            >
              <this.theme.inputText
                control={control}
                type="password"
                name="password"
                autoComplete="off"
                onBlur={() => validatePasswordAndConfirmation()}
                rules={{ required: isCreation }}
                useNameAsId
              />
            </this.theme.formField>
            <this.theme.formField
              inputId="passwordConfirmation"
              label={this.messages.t('user.password_confirm')}
              error={errors.passwordConfirmation}
            >
              <this.theme.inputText
                control={control}
                type="password"
                name="passwordConfirmation"
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
                <this.theme.formField label={this.messages.t('label.creation_date')}>
                  <this.theme.inputText
                    control={control}
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
                {this.messages.t('action.back')}
              </this.theme.actionButton>
              {
                userId && (
                <this.theme.actionButton
                  icon="delete"
                  style={ActionStyle.DANGER}
                  onClick={confirmDeleteUser.handleConfirmation(() => tryDeleteUser(userId))}
                  isLoading={deletingLoader.isLoading}
                >
                  {this.messages.t('action.delete')}
                </this.theme.actionButton>
                )
              }
              <this.theme.actionButton icon="save" style={ActionStyle.PRIMARY} isLoading={savingLoader.isLoading}>
                {this.messages.t('action.save')}
              </this.theme.actionButton>
            </this.theme.actionsContainer>
          </form>
        </this.theme.panel>
      </this.theme.popin>
    );
  };
}
