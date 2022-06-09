import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import MessageService from '../../i18n/messages/MessageService';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';

export default function Home() {
  const theme = getGlobalInstance(PlumeAdminTheme);
  const messages = getGlobalInstance(MessageService).t();

  return (
    <theme.panel>
      <h1>{messages.home.title}</h1>
    </theme.panel>
  );
}
