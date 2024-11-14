import {
  DependencyList, useEffect, useMemo,
} from 'react';

/**
 * Hook to run only once some code BEFORE the component has been first rendered.
 *
 * Should be used mostly for calls that are required for Server Side Rendering.
 * Else {@link useOnComponentMounted} should be used.
 *
 * In development, the callback to be called twice: https://github.com/facebook/react/issues/17186
 * @param callback The function that will be called once before the component has not yet been rendered
 */
export function useOnBeforeComponentRendered(callback: () => void): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(callback, []);
}

/**
 * Hook to run only once some code AFTER the component has been first rendered.
 *
 * This hook will NOT be called during Server Side Rendering.
 * To run code during Server Side Rendering, use {@link useOnBeforeComponentRendered}.
 * @param callback The function that will be called once after the component has been rendered.
 * This function should return `void` and should not return another function,
 * else this function will be called during unmounting. If this behavior is needed, `useEffect` should be used instead.
 */
export function useOnComponentMounted(callback: () => void): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}

export function useOnComponentUnMounted(callback: () => void): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback, []);
}

export function useOnDependenciesChange(callback: () => void, dependencies: DependencyList): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies);
}

/**
 * Hook to run only once some code AFTER the component has been first rendered with SSR support.
 * For SSR server side execution, the code will be executed BEFORE the rendering of the component.
 *
 * SSR is detected using the condition `typeof process !== 'undefined'``. See https://stackoverflow.com/a/35813135
 *
 * If for some reason SSR works differently on a project, this hook should be copied and modified
 * according to the project needs.
 * @param callback The function that will be called once after the component has been rendered
 * @param dependencies The optional dependencies
 */
export function useEffectWithSsrSupport(callback: () => void, dependencies: DependencyList = []): void {
  if (typeof process !== 'undefined') {
    // server context
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(callback, dependencies);
  } else {
    // browser context
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(callback, dependencies);
  }
}
