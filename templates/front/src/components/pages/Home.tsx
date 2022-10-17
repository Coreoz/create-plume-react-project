import React from 'react';
import useMessages from '../../i18n/hooks/messagesHook';

export default function Home() {
  const { messages } = useMessages();

  return <div id="home-layout"><h1>{messages['home.title']}</h1></div>;
}
