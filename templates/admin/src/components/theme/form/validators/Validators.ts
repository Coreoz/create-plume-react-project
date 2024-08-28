// eslint-disable-next-line import/prefer-default-export
export const checkEmptyTrimmed = (value: string | undefined) => (!!value && value.trim().length > 0);
