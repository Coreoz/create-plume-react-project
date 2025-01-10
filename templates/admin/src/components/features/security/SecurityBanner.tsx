import { getGlobalInstance } from 'plume-ts-di';
import { Alert } from '@mui/material';
import React, { useState } from 'react';
import { useObservable } from 'micro-observables';
import SessionService from '../../../services/session/SessionService';
import useMessages from '../../../i18n/hooks/messagesHook';

export default function SecurityBanner() {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const { messages } = useMessages();
  const hasFingerprint: boolean = useObservable(sessionService.hasFingerprint());

  const [isClosed, setIsClosed] = useState<boolean>(false);

  return (
    <>
      {!isClosed && !hasFingerprint && (
        <Alert onClose={() => setIsClosed(true)} severity="warning">
          {messages.error.security.fingerprint_missing}
        </Alert>
      )}
    </>
  );
}
