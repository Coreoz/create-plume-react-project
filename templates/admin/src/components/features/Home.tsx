import React from 'react';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import usePlumeTheme from '../hooks/ThemeHook';
import useMessages, { Messages } from '../../i18n/hooks/messagesHook';

export default function Home() {
  const { messages }: Messages = useMessages();
  const theme: PlumeAdminTheme = usePlumeTheme();

  return (
    <theme.panel>
      <theme.panelTitle>{messages.home.title}</theme.panelTitle>
    </theme.panel>
  );
}
