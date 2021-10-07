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
 */
export function useOnBeforeComponentRendered(callback: () => void): void {
  useMemo(callback, []);
}

/**
 * Hook to run only once some code AFTER the component has been first rendered.
 *
 * You should know that this hook will NOT be called during Server Side Rendering.
 * If you need code that will be run during Server Side Rendering, you should use {@link useOnBeforeComponentRendered}
 * @param callback The function that will be called once after the component has been rendered
 */
export function useOnComponentMounted(callback: () => void): void {
  useEffect(callback, []);
}

export function useOnComponentUnMounted(callback: () => void): void {
  useEffect(() => callback, []);
}

export function useOnDependenciesChange(callback: () => void, dependencies: DependencyList): void {
  useEffect(callback, dependencies);
}
