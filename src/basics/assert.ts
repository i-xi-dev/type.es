import {
  isChar,
  isEmptyString,
  isNegativeNumber,
  isNonEmptyString,
  isNonNegativeNumber,
  isNonPositiveNumber,
  isNumber,
  isPositiveNumber,
  isString,
} from "./type.ts";

export function string(test: unknown, label: string): void {
  if (isString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}

export function emptyString(test: unknown, label: string): void {
  if (isEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be an empty string.`);
  }
}

export function nonEmptyString(test: unknown, label: string): void {
  if (isNonEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty string.`);
  }
}

export function char(test: unknown, label: string): void {
  if (isChar(test) !== true) {
    throw new TypeError(`\`${label}\` must be an UTF-16 code unit.`);
  }
}

export function number(test: unknown, label: string): void {
  if (isNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\`.`);
  }
}

export function positiveNumber(test: unknown, label: string): void {
  if (isPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`number\`.`);
  }
}

export function nonNegativeNumber(test: unknown, label: string): void {
  if (isNonNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`number\`.`);
  }
}

export function nonPositiveNumber(test: unknown, label: string): void {
  if (isNonPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`number\`.`);
  }
}

export function negativeNumber(test: unknown, label: string): void {
  if (isNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`number\`.`);
  }
}
