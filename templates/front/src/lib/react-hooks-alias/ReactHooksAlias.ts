import {
  DependencyList, useEffect, useMemo,
} from 'react';

/**
 * Hook to run only once some code BEFORE the component has been first rendered.
 *
 * Should be used mostly for calls that are required for Server Side Rendering.
 * Else {@link useOnComponentMounted} should be used.
 *
 * In development, you should except the callback to be called twice: https://github.com/facebook/react/issues/17186
 * @param callback The function that will be called once before the component has not yet been rendered
 * @param dependencies The optional dependencies
 */
export function useOnBeforeComponentRendered(callback: () => void, dependencies: DependencyList = []): void {
  useMemo(callback, dependencies);
}

/**
 * Hook to run only once some code AFTER the component has been first rendered.
 *
 * You should know that this hook will NOT be called during Server Side Rendering.
 * If you need code that will be run during Server Side Rendering, you should use {@link useOnBeforeComponentRendered}
 * @param callback The function that will be called once after the component has been rendered
 * @param dependencies The optional dependencies
 */
export function useOnComponentMounted(callback: () => void, dependencies: DependencyList = []): void {
  useEffect(
    // execute the callback manually to avoid returning a function... that will be executed when the component
    // is unmounted. This would cause strange bugs difficult to debug
    () => { callback(); },
    dependencies,
  );
}

export function useOnComponentUnMounted(callback: () => void): void {
  useEffect(() => callback, []);
}

export function useOnDependenciesChange(callback: () => void, dependencies: DependencyList): void {
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
export function useOnComponentMountedWithSsrSupport(callback: () => void, dependencies?: DependencyList): void {
  if (typeof process !== 'undefined') {
    // server context
    useOnBeforeComponentRendered(callback, dependencies);
  } else {
    // browser context
    useOnComponentMounted(callback, dependencies);
  }
}
