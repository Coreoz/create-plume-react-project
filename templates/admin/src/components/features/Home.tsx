import React from 'react';
import usePlumeTheme, { PlumeAdminThemeComponents } from '../hooks/ThemeHook';
import useMessages, { Messages } from '../../i18n/hooks/messagesHook';

export default function Home() {
  const { messages }: Messages = useMessages();
  const { panel: Panel, panelTitle: PanelTitle }: PlumeAdminThemeComponents = usePlumeTheme();

  return (
    <Panel>
      <PanelTitle>{messages.home.title}</PanelTitle>
    </Panel>
  );
}
