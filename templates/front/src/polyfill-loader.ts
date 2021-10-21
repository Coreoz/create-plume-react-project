// Ce fichier contient des polyfill très légers qu'on peut se permettre de charger pour tous les navigateurs.
// Si jamais on doit inclure des polyfill de plus de quelques lignes,
// il faut se poser la question de charger ces polyfill dynamiquement.

// c'est pas vraiment un polyfill mais ça permet de lancer l'application sans planter
// => la conséquence c'est qu'il n'y a pas de gestion de timeout sur les appels HTTP
if (!window.AbortController) {
  /* eslint-disable-next-line func-names,@typescript-eslint/no-explicit-any */
  const polyfill: any = function () {
    return {
      abort: () => {},
      signal: {},
    };
  };
  window.AbortController = polyfill;
}

// to make typescript happy
export {};
