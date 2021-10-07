import { useState } from 'react';
import { PlumeHttpPromiseConsumeOnly } from '../promise/PlumeHttpPromise';

export type LoaderState = {
  loadingState: boolean;
  withLoading: (plumeHttpPromise: PlumeHttpPromiseConsumeOnly<unknown>) => void;
};

export default function useLoader(): LoaderState {
  const [loadingState, setLoadingState] = useState<boolean>(false);

  return {
    loadingState,
    withLoading: (plumeHttpPromise) => {
      setLoadingState(true);
      return plumeHttpPromise
        .then(() => setLoadingState(false))
        .catch(() => setLoadingState(false));
    },
  };
}
