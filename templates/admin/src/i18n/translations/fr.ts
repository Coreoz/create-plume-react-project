/* eslint-disable @stylistic/max-len */
import { viteHotContext } from '@i18n/translations/hmr-config';
import { observable, WritableObservable } from 'micro-observables';
import { Translations } from './Translations';
import translationHotReload from './translations-hmr';

const frMessages: Translations = {
  app: {
    name: 'Plume admin',
  },
  // actions
  action: {
    back: 'Retour',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    close: 'Fermer',
    search: 'Rechercher',
    add: 'Ajouter',
    authenticate: 'Me connecter',
    disconnect: 'Me déconnecter',
    display_more: 'Afficher plus',
    keep_editing: 'Rester sur la page',
    close_without_saving: 'Fermer sans sauvegarder',
  },
  // common labels
  label: {
    more_options: 'Plus d\'options',
    confirm_delete: 'Confirmation de suppression',
    creation_date: 'Date de création',
    empty: 'Aucun élément',
    loading: 'Chargement...',
  },
  // common messages
  message: {
    changes_saved: 'Les modifications ont bien été enregistrées',
    unsaved_data: 'Des modifications n\'ont pas été enregistrées. '
      + 'Si vous voulez enregistrer ces modifications, cliquez sur le bouton "Rester sur la page"',
  },
  // navigation
  nav: {
    home: 'Accueil',
    users: 'Gestion des utilisateurs',
    user_list: 'Utilisateurs',
    tasks: 'Tâches planifiées',
  },
  // home
  home: {
    title: 'Page d\'accueil',
  },
  login: {
    title: 'Se connecter',
  },
  // users
  users: {
    userName: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    email: 'E-mail',
    firstName: 'Prénom',
    lastName: 'Nom',
    role: 'Rôle',
    messages: {
      confirm_delete: (userName: string) => `Vous êtes sur le point de supprimer ${userName}. Cette action est irreversible.`,
    },
  },
  // pages users
  user: {
    title_list: 'Liste des utilisateurs',
    title_create: 'Création d\'un utilisateur',
    title_edit: 'Modification d\'un utilisateur',
    created: (date: string) => `Créé le ${date}`,
    found: (count: number) => `${count} utilisateur${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`,
    add_user: 'Ajouter un utilisateur',
    password_confirm: 'Confirmation du mot de passe',
    error_passwords_different: 'Le mot de passe et sa confirmation sont différents',
  },
  // filters
  filters: {
    title: 'Filtres',
    reset: 'Réinitialiser les filtres',
    user_creation_date: {
      title: 'Date de création',
      options: {
        less_than_15_days: 'Il y a moins de 15 jours',
        between_15_45_days: 'Entre 15 et 45 jours',
        more_than_45_days: 'Il y a plus de 45 jours',
      },
    },
    user_role: {
      title: 'Rôle',
    },
  },
  // sorts
  sorts: {
    user: {
      user_name_asc: 'Trier par nom utilisateur (A - Z)',
      user_name_desc: 'Trier par nom utilisateur (Z - A)',
      creation_date_asc: 'Trier par date de création (ancienne à récente)',
      creation_date_desc: 'Trier par date de création (récente à ancienne)',
    },
  },
  // errors
  error: {
    field: {
      required: 'Le champ est requis',
      email_wrong_format: 'L\'adresse e-mail saisie semble être incorrecte',
      password_same_value: 'Veuillez saisir deux mots de passe identiques',
      empty_field: 'Le champ entré est vide',
    },
    security: {
      fingerprint_missing: 'Le fingerprint du cookie pour sécuriser le token JWT semble absent, cela peut être ok en développement, mais en production, ce cookie devra être activé',
    },
  },
  'http-errors': {
    INTERNAL_ERROR: 'Une erreur inattendue s\'est produite',
    NETWORK_ERROR: 'Erreur réseau, votre connexion internet semble indisponible',
    TIMEOUT_ERROR: 'Erreur réseau (timeout), votre connexion internet ou le serveur distant semble indisponible',
    FORBIDDEN_ERROR: 'Il semble que vous n\'avez pas accès à cette ressource ou à cette action',
    WRONG_LOGIN_OR_PASSWORD: 'Nom d\'utilisateur ou mot de passe incorrect',
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => `Suite à des erreurs dans la saisie de vos identifiants, votre compte est verrouillé pendant ${seconds} secondes, veuillez-vous reconnecter ultérieurement`,
    FIELD_REQUIRED: (fieldName: string) => `Le champ '${fieldName}' est requis`,
    MESSAGE: (message: string) => message,
  },
  tasks: {
    pageTitle: 'Tâches planifiées',
    listPanelTitle: 'Liste des tâches planifiées',
    statsPanelTitle: 'Statistiques des threads',

    columnName: 'Nom de la tâche',
    columnFrequency: 'Fréquence',
    columnExecutions: 'Nombre d\'exécutions',
    columnNextExecution: 'Prochaine exécution',
    columnLastStart: 'Début dernière exécution',
    columnLastEnd: 'Fin dernière exécution',
    columnStatus: 'Statut',
    columnActions: 'Actions',

    runTaskButton: 'Lancer',
    deleteTaskButton: 'Supprimer',
    confirmDeleteTaskTitle: 'Confirmation de suppression',
    confirmDeleteTaskMessage: (taskName: string) => `Êtes-vous sûr de vouloir supprimer la tâche \'${taskName}\' ?`,

    neverExecuted: 'Encore jamais exécuté',
    executionDurationTooltip: (duration: number) => `Temps d'exécution : ${duration} ms`,
    dateFormat: 'DD-MM-YYYY HH:mm:ss', // kk is non-standard, HH for 24hr

    statsActiveThreads: 'Nombre de threads actives :',
    statsInactiveThreads: 'Nombre de threads inactives :',
    statsMinThreads: 'Nombre minimum de threads :',
    statsMaxThreads: 'Nombre maximum de threads :',
    statsLargestPool: 'Plus grand nombre de threads dans le pool :',

    loading: 'Chargement en cours...',
    errorFetching: 'Erreur lors de la récupération des données des tâches.',
    noTasksFound: 'Aucune tâche planifiée pour le moment.',
    taskExecutedSuccess: 'Tâche exécutée avec succès.',
    taskDeletedSuccess: 'Tâche supprimée avec succès.',
  },
  common: {
    // Assuming these might be new or need to be aligned
    yes: 'Oui',
    no: 'Non',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    delete: 'Supprimer',
    error: 'Erreur',
  },
} as const;

const frMessagesObservable: WritableObservable<Translations> = observable(frMessages);

if (viteHotContext?.hot) {
  // Hot reloading, see translations-hmr.ts
  viteHotContext.hot.accept(translationHotReload(frMessagesObservable));
}

export default frMessagesObservable.readOnly();
