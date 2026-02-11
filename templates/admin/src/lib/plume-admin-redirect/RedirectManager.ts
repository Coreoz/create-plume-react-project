const KEY: string = '__post_login_redirect__';

/**
 * Check if the given URL is a safe URL within the same origin.
 * @param url The URL to check.
 */
export function isSafeAppUrl(url: string | null | undefined): boolean {
  if (!url) {
    return false;
  }
  // allow relative path like "/dashboard"
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }
  try {
    const target: URL = new URL(url, window.location.origin);
    return target.origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Store a safe redirect URL in session storage.
 * @param url
 */
export function setRedirectUrl(url: string) {
  if (isSafeAppUrl(url)) {
    sessionStorage.setItem(KEY, url);
  }
}

/**
 * Consume (get and remove) the stored redirect URL from session storage.
 */
export function consumeRedirectUrl(): string | null {
  const url: string | null = sessionStorage.getItem(KEY);
  sessionStorage.removeItem(KEY);
  return isSafeAppUrl(url) ? url : null;
}
