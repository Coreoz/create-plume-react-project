import React from 'react';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import usePlumeTheme from '../theme/hooks/themeHook';
import useMessages from '../../i18n/hooks/messagesHook';

export default function Home() {
  const { messages } = useMessages();
  const theme: PlumeAdminTheme = usePlumeTheme();

  return (
    <theme.panel>
      <theme.panelTitle level="h1">
        {messages.home.title}
      </theme.panelTitle>
    </theme.panel>
  );
}
