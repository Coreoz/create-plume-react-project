import { getGlobalInstance } from 'plume-ts-di';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useObservable } from 'micro-observables';
import { UserWithExpiration } from '@services/session/User';
import SessionService from '@services/session/SessionService';
import useMessages from '@i18n/hooks/messagesHook';

export default function SecurityBanner() {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const { messages } = useMessages();
  const currentUser: UserWithExpiration | undefined = useObservable(sessionService.getCurrentUser());
  const hasFingerprint: boolean = Boolean(currentUser?.hashedFingerprint);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  return (
    <>
      {!isClosed && currentUser && !hasFingerprint && (
        <Alert onClose={() => setIsClosed(true)} severity="warning">
          {messages.error.security.fingerprint_missing}
        </Alert>
      )}
    </>
  );
}
