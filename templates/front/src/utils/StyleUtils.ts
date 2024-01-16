// Types
import { isNotNullish } from './TypeUtils';

export type ClassNameByConditions = ClassNameConditional | ClassNameTernary | ClassNameOptional;

// [condition, className used if condition is true]
export type ClassNameConditional = [boolean, string];

// [condition, className uses if condition is true, className used if condition is false]
export type ClassNameTernary = [boolean, string, string];

// [ className used if condition is is defined]
export type ClassNameOptional = [string | undefined];

// Type guard
const isClassNameOptional = (
  classNameByCondition: ClassNameByConditions,
): classNameByCondition is ClassNameOptional => (
  classNameByCondition.length === 1
);

/**
 * Build class name depending conditions
 * @param classNameByConditions the array of conditional class names to add
 * @param baseClassName the base class name that will always be added if defined
 */
const classNameBuilder = (classNameByConditions: ClassNameByConditions[], baseClassName?: string): string => {
  const className: string = classNameByConditions
    .map((classNameByCondition: ClassNameByConditions): string | undefined => {
      if (isClassNameOptional(classNameByCondition)) {
        const [optionalClassName]: ClassNameOptional = classNameByCondition;
        if (optionalClassName) {
          return optionalClassName;
        }
      } else {
        const [
          condition,
          conditionClassName,
          ternaryClassName,
        ]: ClassNameTernary | ClassNameConditional = classNameByCondition;
        if (condition && isNotNullish(classNameByCondition)) {
          return conditionClassName;
        }
        return ternaryClassName;
      }
      return undefined;
    })
    .filter(isNotNullish)
    .join(' ');

  return baseClassName ? `${baseClassName} ${className}` : className;
};

export default classNameBuilder;
