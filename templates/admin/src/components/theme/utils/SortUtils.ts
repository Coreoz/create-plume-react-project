export function createCustomCompareSorting<T>(
  extractor: (o: T) => string,
  isAscendant: boolean,
  sortFunction: (a: string, b: string) => number,
) {
  return ((a: T, b: T) => {
    let firstElement: T = a;
    let secondElement: T = b;
    if (!isAscendant) {
      firstElement = b;
      secondElement = a;
    }
    if (sortFunction(extractor(firstElement), extractor(secondElement)) === 0) {
      return sortFunction(extractor(secondElement), extractor(firstElement));
    }
    return sortFunction(extractor(firstElement), extractor(secondElement));
  });
}

export function createLocaleCompareSorting<T>(
  extractor: (o: T) => string,
  isAscendant: boolean,
): (a: T, b: T) => number {
  return createCustomCompareSorting(
    extractor,
    isAscendant,
    (a: string, b: string) => a.localeCompare(b, 'fr', { ignorePunctuation: true }),
  );
}
