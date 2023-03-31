import { CircularProgress } from '@mui/material';
import React, { ReactNode } from 'react';
import useMessages from '../../../i18n/hooks/messagesHook';
import { DataLoader } from '../../../lib/plume-http-react-hook-loader/observableLoaderHook';
import { ActionButton } from '../action/Actions';

export type WithLoadingDataProps = {
  dataLoader: DataLoader<unknown>,
  children: ReactNode,
  messages?: {
    errorMessage?: string,
    actionRetry?: string,
  }
};

/**
 * Affiche les composants fils dès que les données du {@link WithLoadingDataProps.dataLoader} sont disponibles.
 * Doit être utilisé uniquement pour du chargement de données.
 * Les appels API de mise à jour de données, etc. doivent utiliser de préférence le loader des boutons d'action.
 *
 * Affiche un {@link CircularProgress} pendant le chargement des données.
 *
 * En cas d'erreur, affiche un message d'erreur avec un bouton pour relancer le chargement des données.
 */
export default function WithLoadingData({
  dataLoader, messages, children,
}: WithLoadingDataProps) {
  const { httpError: httpErrorMessage, messages: basicMessages } = useMessages();

  if (dataLoader.isLoaded) {
    return <>{children}</>;
  }

  if (dataLoader.error) {
    return (
      <>
        <div className="loading-error-message">
          {messages?.errorMessage
            ?? httpErrorMessage(dataLoader.error)}
        </div>
        <ActionButton onClick={dataLoader.loader}>
          {messages?.actionRetry ?? basicMessages.action.retry}
        </ActionButton>
      </>
    );
  }

  return (
    <div className="full-space-loader">
    <CircularProgress />
  </div>
  );
}
