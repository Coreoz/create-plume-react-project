import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import MessageService from '../../i18n/messages/MessageService';
import { Panel } from '../theme/layout/Panel';

export default function Home() {
  const messages = getGlobalInstance(MessageService).t();

  return (
    <Panel>
      <h1>{messages.home.title}</h1>
    </Panel>
  );
}
