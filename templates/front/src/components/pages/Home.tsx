import React, { useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { Sample } from '@api/session/SampleApi';
import SampleService from '@services/sample/SampleService';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import useLoader from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import useMessages from '@i18n/hooks/messagesHook';

import scss from './home.module.scss';

export default function Home() {
  const { messages, httpError } = useMessages();
  const sampleService = getGlobalInstance(SampleService);
  const loader = useLoader();
  const [sample, setSample] = useState<Sample>();

  useOnComponentMounted(() => {
    loader.monitor(sampleService
      .sayHello('World')
      .then(setSample),
    );
  });

  return (
    <div id={scss.homeLayout}>
      <h1>{messages['home.title']}</h1>
      <div>
        <h2>API call test</h2>
        {loader.isLoading && <div>Loading...</div>}
        {loader.error && <div>Could not call API: {httpError(loader.error)}</div>}
        {sample && <div>API call success! Result: {sample.name}</div>}
      </div>
    </div>
  );
}
