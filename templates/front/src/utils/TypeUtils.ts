export type Nullish<T> = T | null | undefined;

export const isNotNullish = <T>(value: Nullish<T>): value is NonNullable<T> => (
  value !== null && value !== undefined
);
