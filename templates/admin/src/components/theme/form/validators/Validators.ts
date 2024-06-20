// eslint-disable-next-line import/prefer-default-export

export const checkEmptyTrimmed = (value: string | undefined) => (!!value && value.trim().length > 0);

const checkRegexpMatches = (value: string, regExp: RegExp) => {
  const match: RegExpMatchArray | null = value.match(regExp);
  return !!match && match.length >= 1;
};

export const checkHasLowerChar = (value: string): boolean => checkRegexpMatches(value, /[a-z]/g);

export const checkHasUpperChar = (value: string): boolean => checkRegexpMatches(value, /[A-Z]/g);

export const checkHasNumberChar = (value: string): boolean => checkRegexpMatches(value, /[0-9]/g);

export const checkHasSpecialChar = (value: string): boolean => checkRegexpMatches(value, /[^a-zA-Z\d]/g);
