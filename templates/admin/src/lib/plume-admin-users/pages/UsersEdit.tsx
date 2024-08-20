import usePlumeTheme from '@components/hooks/ThemeHook';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';
import PlumeAdminTheme from '@lib/plume-admin-theme/PlumeAdminTheme';
import {
  makeErrorMessageMapping,
} from '@lib/plume-form-error-messages/FormErrorMessages';
import useLoader, {
  LoaderState,
} from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import useNotification, {
  PlumeNotification,
} from '@lib/plume-notification/NotificationHook';
import useConfirmation, {
  ReactHookConfirm,
} from '@lib/react-hook-confirm/ReactHookConfirm';
import {
  useOnDependenciesChange,
} from '@lib/react-hooks-alias/ReactHooksAlias';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormContainer } from 'react-hook-form-mui';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { HttpError } from 'simple-http-rest-client';
import isEmail from 'validator/lib/isEmail';
import { AdminUserDetails, AdminUserParameters } from '../api/AdminUserTypes';
import UserApi from '../api/UserApi';
import {
  AdminUsersWithIndexedRolesType,
} from './AdminUsersWithIndexedRolesType';

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
    ? usersWithRoles.users.filter((user: AdminUserDetails) => user.id === userId)?.[0]
    : undefined;
}

export default function UsersEdit({
  usersWithRoles,
  updateUsersAndRoles,
  usersPath,
}: Props) {
  const userApi: UserApi = getGlobalInstance(UserApi);
  const { userId } = useParams<UsersRouteParams>();

  const theme: PlumeAdminTheme = usePlumeTheme();
  const { messages }: Messages = useMessages();
  const {
    notifyHttpError,
    notifySuccess,
  }: PlumeNotification = useNotification();

  const navigate: NavigateFunction = useNavigate();

  const isCreation: boolean = userId === undefined;

  // small optimization to avoid fetching the current user during each render cycle
  const userToEdit: AdminUserDetails | undefined = useMemo(
    () => findUser(userId, usersWithRoles),
    [userId, usersWithRoles],
  );

  const formContext: UseFormReturn<AdminUserParameters> = useForm<AdminUserParameters>({
    defaultValues: userToEdit,
  });

  const {
    getValues, setError, reset, formState,
  } = formContext;

  // when the users are loaded from the upper component, we need update the form with the new values
  useOnDependenciesChange(() => reset(userToEdit), [userToEdit, reset]);

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
    const values: AdminUserParameters = optionalValues ?? getValues();
    if (values.password && values.passwordConfirmation && values.password !== values.passwordConfirmation) {
      setError('password', { type: 'validate' });
      return false;
    }
    return true;
  };

  // save user handling
  const savingLoader: LoaderState = useLoader();

  const trySaveUser = (userToSave: AdminUserParameters) => {
    if (validatePasswordAndConfirmationEmptiness(userToSave) && validatePasswordAndConfirmation(userToSave)) {
      savingLoader.monitor(
        userApi
          .save(userToSave)
          .then((createdUser: AdminUserDetails | undefined) => {
            updateUsersAndRoles();
            notifySuccess(messages.message.changes_saved);
            if (createdUser) {
              navigate(createdUser.id);
            }
          })
          .catch((httpError: HttpError) => notifyHttpError(httpError)),
      );
    }
  };

  // delete user handling

  const deletingLoader: LoaderState = useLoader();

  const confirmDeleteUser: ReactHookConfirm = useConfirmation();

  const tryDeleteUser = (idUser: string) => {
    deletingLoader.monitor(
      userApi
        .delete(idUser)
        .then(() => {
          updateUsersAndRoles();
          notifySuccess(messages.message.changes_saved);
          navigate(`/${usersPath}`);
        })
        .catch((httpError: HttpError) => notifyHttpError(httpError)));
  };

  // cancel modification handling

  const cancelEdit = () => navigate(`/${usersPath}`);

  const { dirtyFields } = formState;
  // usage of dirtyFields instead of isDirty: https://github.com/react-hook-form/react-hook-form/issues/3562
  const confirmCloseWithoutSaving: ReactHookConfirm = useConfirmation({
    onlyIf: Object.keys(dirtyFields).length !== 0,
  });

  return (
    <theme.popin>
      <theme.popinCloseWithoutSaving
        confirmCloseWithoutSaving={confirmCloseWithoutSaving}
        closeWithoutSavingAction={cancelEdit}
      />
      {confirmDeleteUser.shouldAskConfirmation && (
        <theme.popin zIndex={101}>
          {messages.message.confirm_delete}
          <theme.actionsContainer>
            <theme.actionButton
              style={ActionStyle.SECONDARY}
              onClick={confirmDeleteUser.reset}
            >
              {messages.action.cancel}
            </theme.actionButton>
            {userId && (
              <theme.actionButton
                style={ActionStyle.DANGER}
                onClick={confirmDeleteUser.confirm(() => tryDeleteUser(userId))}
              >
                {messages.action.delete}
              </theme.actionButton>
            )}
          </theme.actionsContainer>
        </theme.popin>
      )}
      <h2>{isCreation ? messages.user.title_create : messages.user.title_edit}</h2>
      <theme.actionsContainer position="end">
        <theme.actionLink
          icon="keyboard_arrow_left"
          linkTo={`/${usersPath}`}
          style={ActionStyle.SECONDARY}
        >
          {messages.action.back}
        </theme.actionLink>
      </theme.actionsContainer>
      <FormContainer formContext={formContext} onSuccess={trySaveUser}>
        <input type="hidden" name="id" value={userToEdit?.id} />
        <theme.formField
          inputId="userName"
        >
          <theme.inputText
            label={messages.users.userName}
            name="userName"
            rules={{ required: true }}
            useNameAsId
          />
        </theme.formField>
        <theme.formField
          inputId="email"
          errorMessageMapping={makeErrorMessageMapping(messages.error.field.email_wrong_format)}
        >
          <theme.inputText
            name="email"
            label={messages.users.email}
            rules={{ required: true, validate: isEmail }}
            useNameAsId
          />
        </theme.formField>
        <theme.formField
          inputId="firstName"
        >
          <theme.inputText
            name="firstName"
            rules={{ required: true }}
            label={messages.users.firstName}
            useNameAsId
          />
        </theme.formField>
        <theme.formField
          inputId="lastName"
        >
          <theme.inputText
            name="lastName"
            label={messages.users.lastName}
            rules={{ required: true }}
            useNameAsId
          />
        </theme.formField>
        <theme.formField
          inputId="idRole"
        >
          <theme.inputSelect
            name="idRole"
            useNameAsId
            label={messages.users.role}
            defaultValue={userToEdit?.idRole}
            required
            options={
              Array.from(usersWithRoles?.roles || []).map(
                ([roleId, roleName]: [string, string]) => ({
                  value: roleId,
                  label: roleName,
                }))
            }
          />
        </theme.formField>
        <theme.panelSeparator />
        <theme.formField
          inputId="password"
          errorMessageMapping={makeErrorMessageMapping(messages.user.error_passwords_different)}
        >
          <theme.inputText
            type="password"
            name="password"
            label={messages.users.password}
            autoComplete="off"
            onBlur={() => validatePasswordAndConfirmation()}
            rules={{ required: isCreation }}
            useNameAsId
          />
        </theme.formField>
        <theme.formField
          inputId="passwordConfirmation"
        >
          <theme.inputText
            type="password"
            name="passwordConfirmation"
            label={messages.user.password_confirm}
            autoComplete="off"
            onBlur={() => validatePasswordAndConfirmation()}
            rules={{ required: isCreation }}
            useNameAsId
          />
        </theme.formField>
        {userToEdit
          && (
            <>
              <theme.panelSeparator />
              <theme.formField>
                <theme.inputText
                  label={messages.label.creation_date}
                  disabled
                  defaultValue={dayjs(userToEdit.creationDate).format('L LT')}
                />
              </theme.formField>
            </>
          )
        }
        <theme.actionsContainer>
          <theme.actionButton
            icon="keyboard_arrow_left"
            style={ActionStyle.SECONDARY}
            onClick={confirmCloseWithoutSaving.handleConfirmation(cancelEdit)}
          >
            {messages.action.back}
          </theme.actionButton>
          {
            userId && (
              <theme.actionButton
                icon="delete"
                style={ActionStyle.DANGER}
                onClick={confirmDeleteUser.handleConfirmation(() => tryDeleteUser(userId))}
                isLoading={deletingLoader.isLoading}
              >
                {messages.action.delete}
              </theme.actionButton>
            )
          }
          <theme.actionButton
            icon="save"
            style={ActionStyle.PRIMARY}
            isLoading={savingLoader.isLoading}
          >
            {messages.action.save}
          </theme.actionButton>
        </theme.actionsContainer>
      </FormContainer>
    </theme.popin>
  );
}
