import React from 'react';
import useMessages from '../../i18n/hooks/messagesHook';
import { Panel } from '../theme/layout/Panel';

export default function Home() {
  const { messages } = useMessages();

  return (
    <Panel>
      <h1>{messages.home.title}</h1>
    </Panel>
  );
}
