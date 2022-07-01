import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import MessageService from '../../i18n/messages/MessageService';

export default function Home() {
  const messages = getGlobalInstance(MessageService).t();

  return <div id="home-layout"><h1>{messages['home.title']}</h1></div>;
}
