export type Locale = {
  code: string;
  name: string;
};

export interface LocaleResolverFunction {
  (localeResolver: LocaleResolver): Locale | undefined;
}

export type LocaleResolverParameters = {
  fallbackLocale: Locale,
  availableLocales: Locale[],
  localeStorage?: Storage,
  localeStorageKey?: string,
  resolvers?: LocaleResolverFunction[],
};

export class LocaleResolver {
  private readonly fallbackLocale: Locale;

  private readonly localeStorageKey: string;

  private readonly indexedLocales: Map<string, Locale>;

  private readonly localeStorage?: Storage;

  private readonly resolvers: LocaleResolverFunction[];

  constructor(parameters: LocaleResolverParameters) {
    this.fallbackLocale = parameters.fallbackLocale;
    this.indexedLocales = new Map(
      parameters.availableLocales.map((locale) => [locale.code, locale]),
    );
    this.localeStorage = parameters.localeStorage;
    this.resolvers = parameters.resolvers ?? [];
    this.localeStorageKey = parameters.localeStorageKey ?? 'lang';
  }

  resolve(): Locale {
    // eslint-disable-next-line no-restricted-syntax
    for (const resolver of this.resolvers) {
      const resolvedLocale = resolver(this);
      if (resolvedLocale !== undefined) {
        return resolvedLocale;
      }
    }
    return this.fallbackLocale;
  }

  static tryResolveFromBrowser(localeResolver: LocaleResolver): Locale | undefined {
    if (typeof navigator === 'undefined') {
      throw new Error('Trying to resolve locale from browser whereas navigator is undefined');
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const language of navigator.languages) {
      const matchingLocale = localeResolver.tryFindMatchingLocale(language.substring(0, 2));
      if (matchingLocale) {
        return matchingLocale;
      }
    }
    return undefined;
  }

  static tryResolveFromStorage(localeResolver: LocaleResolver): Locale | undefined {
    if (localeResolver.localeStorage === undefined) {
      throw new Error('Trying to resolve locale from storage whereas the \'localeStorage\' parameter is undefined');
    }
    const storageLocaleCode = localeResolver.localeStorage.getItem(localeResolver.localeStorageKey);
    return storageLocaleCode ? localeResolver.tryFindMatchingLocale(storageLocaleCode) : undefined;
  }

  tryFindMatchingLocale(localeCode: string): Locale | undefined {
    return this.indexedLocales.get(localeCode);
  }

  hasLocaleStorage() {
    return this.localeStorage !== undefined;
  }

  setPreferredLocale(newLocale: Locale) {
    if (this.localeStorage === undefined) {
      throw new Error('No locale storage defined while trying to set a preferred locale');
    }

    this.localeStorage.setItem(this.localeStorageKey, newLocale.code);
  }

  getAvailableLocales(): Locale[] {
    return Array.from(this.indexedLocales.values());
  }
}
