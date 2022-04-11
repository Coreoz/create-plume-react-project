export function createCompareSorting<T>(
  extractor: (o: T) => string,
  isAscendant: boolean,
): (a: T, b: T) => number {
  return ((a: T, b: T) => {
      let firstElement: T = a;
      let secondElement: T = b;
      if (!isAscendant) {
        firstElement = b;
        secondElement = a;
      }
      if (extractor(firstElement).localeCompare(extractor(secondElement), 'fr', { ignorePunctuation: true }) === 0) {
        return extractor(secondElement).localeCompare(extractor(firstElement), 'fr', { ignorePunctuation: true });
      }
      return extractor(firstElement).localeCompare(extractor(secondElement), 'fr', { ignorePunctuation: true });
    }
  )
}