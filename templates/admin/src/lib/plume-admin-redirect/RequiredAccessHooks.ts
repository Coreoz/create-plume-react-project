import {
  Ref, useCallback, useEffect, useRef,
} from 'react';
import {
  consumeRedirectUrl,
  isSafeAppUrl,
  setRedirectUrl,
} from './RedirectManager';

const REDIRECT_PARAM: string = 'redirect';

/**
 * Append a redirect param to the given login URL.
 * @param loginUrl
 * @param targetUrl
 * @param paramName
 */
export function appendRedirectParam(
  loginUrl: string,
  targetUrl: string,
  paramName: string = REDIRECT_PARAM,
): string {
  const u: URL = new URL(loginUrl, window.location.origin);
  u.searchParams.set(paramName, targetUrl);
  return u.pathname + u.search + u.hash; // always relative
}

type RequireAccessOpts = {
  hasAccess: boolean,
  currentUrl: string, // the router provides this
  fallbackUrl: string,
  navigate: (url: string) => void, // the router's navigate/push fn
  useQueryParam?: boolean,
  paramName?: string,
  shouldRedirect?: boolean, // skipping redirect on login page to avoid loop
};

/**
 * A hook to require access to a page, otherwise redirect to a fallback URL (e.g. login page).
 * @param hasAccess
 * @param currentUrl
 * @param loginUrl
 * @param navigate
 * @param useQueryParam
 * @param paramName
 */
export function useRequireAccess(
  {
    hasAccess,
    currentUrl,
    fallbackUrl,
    navigate,
    useQueryParam = true,
    paramName = REDIRECT_PARAM,
    shouldRedirect = true,
  }: Readonly<RequireAccessOpts>,
) {
  useEffect(() => {
    if (!hasAccess && shouldRedirect) {
      setRedirectUrl(currentUrl);
      const next: string = useQueryParam
        ? appendRedirectParam(fallbackUrl, currentUrl, paramName)
        : fallbackUrl;
      navigate(next);
    }
  }, [hasAccess, currentUrl, fallbackUrl, navigate, useQueryParam, paramName, shouldRedirect]);

  return { allowed: hasAccess };
}

type ReturnAfterAccessOpts = {
  hasAccess: boolean,
  navigate: (url: string) => void,
  defaultRedirect?: string,
  paramName?: string,
};

/**
 * A hook to redirect the user after login/access to the intended page.
 * @param hasAccess
 * @param navigate
 * @param defaultRedirect
 * @param paramName
 */
export function useReturnAfterAccess(
  {
    hasAccess,
    navigate,
    defaultRedirect = '/',
    paramName = REDIRECT_PARAM,
  }: Readonly<ReturnAfterAccessOpts>,
): void {
  const redirectRef: Ref<string | null> = useRef<string | null>(null);
  const returnToRedirection: () => void = useCallback(() => {
    if (redirectRef.current === null) {
      // 1. check session storage
      let target: string | null = consumeRedirectUrl();

      // 2. fallback to query param
      if (!target) {
        const qp: string | null = new URLSearchParams(window.location.search).get(paramName!);
        if (qp) {
          target = qp;
        }
      }

      // 3. validate or fallback
      if (!isSafeAppUrl(target)) {
        target = defaultRedirect!;
      }
      redirectRef.current = target;
    }

    navigate(`${redirectRef.current ?? defaultRedirect}`);
  }, [defaultRedirect, navigate, paramName]);

  useEffect(() => {
    if (hasAccess) {
      returnToRedirection();
    }
  }, [hasAccess, returnToRedirection]);
}
