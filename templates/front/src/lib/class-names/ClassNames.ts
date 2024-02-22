// eslint-disable-next-line no-restricted-imports
import clsx from 'clsx';

type ClassValue = string | undefined | null | Record<string, boolean>;

const classNames = (...inputs: ClassValue[]): string => clsx(...inputs);

export default classNames;
