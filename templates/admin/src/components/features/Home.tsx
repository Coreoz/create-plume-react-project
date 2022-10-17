import React from 'react';
import { Panel } from '../theme/layout/Panel';
import useMessages from '../../i18n/hooks/messagesHook';

export default function Home() {
  const { messages } = useMessages();

  return (
    <Panel>
      <h1>{messages.home.title}</h1>
    </Panel>
  );
}
