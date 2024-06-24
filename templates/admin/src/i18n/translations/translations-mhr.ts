import { WritableObservable } from 'micro-observables';
import { ModuleNamespace } from 'vite/types/hot';
import { Translations } from './Translations';

// Development hot reloading handling, see https://vitejs.dev/guide/api-hmr.html
// Every time this file changes, the accept function is called with the new fr.ts file compiled.
// In this file, only the public exported value is available.
// After the import.meta.hot.accept() function is called, the fr.ts is completely replaced,
// So we need to put something in place to keep the reference of the original Observable translations.
// To do that, we add the `observableTmp` field in the `messages` object withing the Observable
export default function translationHotReload(messagesObservable: WritableObservable<Translations>) {
  return (newModule: ModuleNamespace | undefined) => {
    if (newModule) {
      const moduleTranslations: WritableObservable<Translations> = newModule
        .default as unknown as WritableObservable<Translations>;
      const updatedTranslations: Translations = moduleTranslations.get();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const baseObservable: WritableObservable<Translations> = (messagesObservable.get() as any)
        .observableTmp ?? messagesObservable;
      const translationsWithObservable: object = {
        ...updatedTranslations,
        observableTmp: baseObservable,
      };
      moduleTranslations.set(translationsWithObservable as Translations);
      baseObservable.set(updatedTranslations);
    }
  };
}
