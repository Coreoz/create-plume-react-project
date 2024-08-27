import usePlumeTheme from '@components/hooks/ThemeHook';
import {
  checkEmptyTrimmed,
} from '@components/theme/form/validators/Validators';
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
import { getGlobalInstance } from 'plume-ts-di';
import React, { useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormContainer } from 'react-hook-form-mui';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { HttpError } from 'simple-http-rest-client';
import isEmail from 'validator/lib/isEmail';
import dayjs from 'dayjs';
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

  const {
    actionLink: ActionLink,
    actionsContainer: ActionContainer,
    actionButton: ActionButton,
    popin: Popin,
    popinCloseWithoutSaving: PopinCloseWithoutSaving,
    panelSeparator: PanelSeparator,
    inputText: InputText,
    inputSelect: InputSelect,
    inputPassword: InputPassword,
  }: PlumeAdminTheme = usePlumeTheme();

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
    getValues,
    setError,
    reset,
    formState,
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
    <Popin>
      <PopinCloseWithoutSaving
        confirmCloseWithoutSaving={confirmCloseWithoutSaving}
        closeWithoutSavingAction={cancelEdit}
      />
      {confirmDeleteUser.shouldAskConfirmation && (
        <Popin zIndex={101}>
          {messages.message.confirm_delete}
          <ActionContainer>
            <ActionButton
              style={ActionStyle.SECONDARY}
              onClick={confirmDeleteUser.reset}
            >
              {messages.action.cancel}
            </ActionButton>
            {userId && (
              <ActionButton
                style={ActionStyle.DANGER}
                onClick={confirmDeleteUser.confirm(() => tryDeleteUser(userId))}
              >
                {messages.action.delete}
              </ActionButton>
            )}
          </ActionContainer>
        </Popin>
      )}
      <h2>{isCreation ? messages.user.title_create : messages.user.title_edit}</h2>
      <ActionContainer position="end">
        <ActionLink
          icon="keyboard_arrow_left"
          linkTo={`/${usersPath}`}
          variant="outlined"
          style={ActionStyle.SECONDARY}
        >
          {messages.action.back}
        </ActionLink>
      </ActionContainer>
      <FormContainer formContext={formContext} onSuccess={trySaveUser}>
        <input type="hidden" name="id" value={userToEdit?.id} />
        <InputText
          label={messages.users.userName}
          name="userName"
          rules={{ required: true }}
        />
        <InputText
          name="email"
          label={messages.users.email}
          rules={{ required: true, validate: isEmail }}
          errorMessageMapping={makeErrorMessageMapping(messages.error.field.email_wrong_format)}
        />
        <InputText
          name="firstName"
          rules={{ required: true }}
          label={messages.users.firstName}
        />
        <InputText
          name="lastName"
          label={messages.users.lastName}
          rules={{ required: true }}
        />
        <InputSelect
          name="idRole"
          label={messages.users.role}
          required
          options={
            Array.from(usersWithRoles?.roles || []).map(
              ([roleId, roleName]: [string, string]) => ({
                value: roleId,
                label: roleName,
              }))
          }
        />
        <PanelSeparator />
        <InputText
          label={messages.label.creation_date}
          name="date"
          disabled={true}
          InputProps={{ value: dayjs(userToEdit?.creationDate).format('L LT') }}
        />
        <PanelSeparator />
        <InputPassword
          name="password"
          label={messages.users.password}
          autoComplete="off"
          rules={{
            required: isCreation,
            validate: {
              empty_field: checkEmptyTrimmed,
            },
          }}
        />
        <InputPassword
          name="passwordConfirmation"
          label={messages.user.password_confirm}
          autoComplete="off"
          rules={{
            required: isCreation,
            validate: {
              password_same_value: (value: string) => (
                formContext.getValues().password === value
              ),
            },
          }}
          errorMessageMapping={makeErrorMessageMapping(messages.user.error_passwords_different)}
        />
        <ActionContainer>
          <ActionButton
            icon="keyboard_arrow_left"
            style={ActionStyle.SECONDARY}
            variant="outlined"
            onClick={confirmCloseWithoutSaving.handleConfirmation(cancelEdit)}
          >
            {messages.action.back}
          </ActionButton>
          {
            userId && (
              <ActionButton
                icon="delete"
                style={ActionStyle.DANGER}
                onClick={confirmDeleteUser.handleConfirmation(() => tryDeleteUser(userId))}
                isLoading={deletingLoader.isLoading}
              >
                {messages.action.delete}
              </ActionButton>
            )
          }
          <ActionButton
            icon="save"
            style={ActionStyle.PRIMARY}
            isLoading={savingLoader.isLoading}
          >
            {messages.action.save}
          </ActionButton>
        </ActionContainer>
      </FormContainer>
    </Popin>
  );
}
