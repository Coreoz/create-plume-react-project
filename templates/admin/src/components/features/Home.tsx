import React from 'react';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import usePlumeTheme from '../hooks/ThemeHook';
import useMessages, { Messages } from '../../i18n/hooks/messagesHook';

export default function Home() {
  const { messages }: Messages = useMessages();
  const { panel: Panel, panelTitle: PanelTitle }: PlumeAdminTheme = usePlumeTheme();

  return (
    <Panel>
      <PanelTitle>{messages.home.title}</PanelTitle>
    </Panel>
  );
}
