import { Translations } from './Translations';

const frMessages: Translations = {
  // actions
  'action.back': 'Retour',
  'action.cancel': 'Annuler',
  'action.save': 'Enregistrer',
  'action.delete': 'Supprimer',
  'action.search': 'Rechercher',
  'action.add': 'Ajouter',
  'action.authenticate': 'Connexion',
  'action.disconnect': 'Déconnexion',
  'action.keep-editing': 'Rester sur la page',
  'action.close-without-saving': 'Fermer sans sauvegarder',
  // common labels
  'label.creation-date': 'Date de création',
  'label.loading': 'Chargement...',
  // common messages
  'message.changes-saved': 'Les modifications ont bien été enregistrées',
  'message.unsaved-data': 'Des modifications n\'ont pas été enregistrées. '
    + 'Si vous voulez enregistrer ces modifications, cliquez sur le bouton "Rester sur la page"',
  'message.confirm-delete': 'Pour confirmer la suppression, cliquez sur le bouton "Supprimer"',
  // navigation
  'app.name': 'Plume admin',
  'nav.home': 'Accueil',
  'nav.users': 'Gestion des utilisateurs',
  'nav.user-list': 'Utilisateurs',
  // home
  'home.title': 'Page d\'accueil',
  'login.title': 'Veuillez vous authentifier',
  // users
  'users.USERNAME': 'Nom d\'utilisateur',
  'users.PASSWORD': 'Mot de passe',
  'users.PASSWORD_CONFIRM': 'Confirmation du mot de passe',
  'users.EMAIL': 'E-mail',
  'users.FIRSTNAME': 'Prénom',
  'users.LASTNAME': 'Nom',
  'users.ROLE': 'Rôle',
  // pages users
  'user.title-list': 'Liste des utilisateurs',
  'user.title-create': 'Création d\'un utilisateur',
  'user.title-edit': 'Modification d\'un utilisateur',
  'user.error-passwords-different': 'Le mot de passe et sa confirmation sont différents',
  // sample with pluralization
  'clicks.count': (count: number) => `Il y a eu ${count} clic${count > 1 ? 's' : ''} !`,
  // errors
  'error.field.required': 'Le champ est requis',
  'error.field.email-wrong-format': 'L\'adresse e-mail saisie semble être incorrecte',
  'http-errors': {
    INTERNAL_ERROR: 'Une erreur inattendue s\'est produite',
    NETWORK_ERROR: 'Erreur réseau, votre connexion internet semble indisponible',
    TIMEOUT_ERROR: 'Erreur réseau (timeout), votre connexion internet ou le serveur distant semble indisponible',
    FORBIDDEN_ERROR: 'Il semble que vous n\'avez pas accès à cette ressource ou à cette action',
    WRONG_LOGIN_OR_PASSWORD: 'Nom d\'utilisateur ou mot de passe incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => `Suite à des erreurs dans la saisie de vos identifiants, votre compte est verrouillé pendant ${seconds} secondes, veuillez-vous reconnecter ultérieurement`,
    FIELD_REQUIRED: (fieldName: string) => `Le champ '${fieldName}' est requis`,
    MESSAGE: (message: string) => message,
  },
} as const;

export default frMessages;
