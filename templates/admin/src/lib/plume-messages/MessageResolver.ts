import { HttpPlumeError } from '../plume-http/client/PlumeHttpResponse';

export interface MessageResolver {
  (messageKey: string, ...messageArgs: string[]): string;
}

/**
 * Interface utilisée pour les écrans d'administration Plume.
 *
 * Seule cette dépendance est utilisée pour la partie i18n dans les écrans Plume.
 * Les projets peuvent ainsi utilisé n'importe quelle implémentation i18n : manuelle, Polyglot, etc.
 */
export default abstract class PlumeMessageResolver {
  abstract t: MessageResolver;

  abstract httpError(error: HttpPlumeError): string;
}
