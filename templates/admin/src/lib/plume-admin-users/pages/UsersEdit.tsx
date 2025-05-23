import usePlumeTheme, { PlumeAdminThemeComponents } from '@components/hooks/ThemeHook';
import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';
import { ROUTE_USERS, ROUTE_USERS_UPDATE, usersRoutes } from '@lib/plume-admin-users/router/UsersRouter';
import { makeErrorMessageMapping } from '@lib/plume-form-error-messages/FormErrorMessages';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import useNotification, { PlumeNotification } from '@lib/plume-notification/NotificationHook';
import useConfirmationPopIn, { ConfirmationPopInType } from '@lib/react-hook-confirm/ReactHookConfirm';
import { useOnDependenciesChange } from '@lib/react-hooks-alias/ReactHooksAlias';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import { useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { HttpError } from 'simple-http-rest-client';
import isEmail from 'validator/lib/isEmail';
import { AdminUserDetails, AdminUserParameters } from '../api/AdminUserTypes';
import UserApi from '../api/UserApi';
import { AdminUsersWithIndexedRolesType } from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  updateUsersAndRoles: () => void,
  userId?: string,
};

function findUser(userId?: string, usersWithRoles?: AdminUsersWithIndexedRolesType): AdminUserDetails | undefined {
  return userId && usersWithRoles
    ? usersWithRoles.users.filter((user: AdminUserDetails) => user.id === userId)?.[0]
    : undefined;
}

export default function UsersEdit(
  {
    usersWithRoles,
    updateUsersAndRoles,
    userId,
  }: Props,
) {
  const userApi: UserApi = getGlobalInstance(UserApi);

  const {
    actionsContainer: ActionContainer,
    actionButton: ActionButton,
    popin: Popin,
    confirmationPopIn: ConfirmationPopIn,
    panelSeparator: PanelSeparator,
    formContainer: FormContainer,
    inputText: InputText,
    inputSelect: InputSelect,
    inputPassword: InputPassword,
  }: PlumeAdminThemeComponents = usePlumeTheme();

  const { showConfirmationPopIn, popInProps }: ConfirmationPopInType = useConfirmationPopIn();
  const { messages }: Messages = useMessages();
  const {
    notifyHttpError,
    notifySuccess,
  }: PlumeNotification = useNotification();

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
              usersRoutes[ROUTE_USERS_UPDATE]({ userId: createdUser.id }).push();
            }
          })
          .catch((httpError: HttpError) => notifyHttpError(httpError)),
      );
    }
  };

  // delete user handling

  const deletingLoader: LoaderState = useLoader();

  const tryDeleteUser = (idUser: string) => {
    deletingLoader.monitor(
      userApi
        .delete(idUser)
        .then(() => {
          updateUsersAndRoles();
          notifySuccess(messages.message.changes_saved);
          usersRoutes[ROUTE_USERS]().push();
        })
        .catch((httpError: HttpError) => notifyHttpError(httpError)));
  };

  const onDeleteUser = (idUser: string) => {
    showConfirmationPopIn({
      title: messages.label.confirm_delete,
      message: messages.users.messages.confirm_delete(userToEdit?.userName ?? ''),
      onConfirm: {
        title: messages.action.delete,
        action: () => tryDeleteUser(idUser),
      },
    });
  };

  // cancel modification handling

  const cancelEdit = () => usersRoutes[ROUTE_USERS]().push();

  const { dirtyFields } = formState;
  // usage of dirtyFields instead of isDirty: https://github.com/react-hook-form/react-hook-form/issues/3562
  const onClosePopIn = () => {
    if (Object.keys(dirtyFields).length === 0) {
      cancelEdit();
      return;
    }
    showConfirmationPopIn({
      title: messages.action.close_without_saving,
      message: messages.message.unsaved_data,
      onConfirm: {
        title: messages.action.close,
        action: () => cancelEdit(),
      },
      onCancel: {
        title: messages.action.keep_editing,
      },
    });
  };

  return (
    <Popin
      title={isCreation ? messages.user.title_create : messages.user.title_edit}
      isOpen
      onClose={onClosePopIn}
    >
      <ConfirmationPopIn {...popInProps} />
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
            onClick={onClosePopIn}
          >
            {messages.action.back}
          </ActionButton>
          {
            userId && (
              <ActionButton
                icon="delete"
                style={ActionStyle.DANGER}
                onClick={() => onDeleteUser(userId)}
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
