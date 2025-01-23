import {
  isBoolean,
  isChar,
  isEmptyString,
  isFalse,
  isNegativeNumber,
  isNonEmptyString,
  isNonNegativeNumber,
  isNonNullObject,
  isNonPositiveNumber,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPositiveNumber,
  isString,
  isTrue,
} from "./is.ts";

export function assertString(test: unknown, label: string): void {
  if (isString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}

export function assertEmptyString(test: unknown, label: string): void {
  if (isEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be an empty string.`);
  }
}

export function assertNonEmptyString(test: unknown, label: string): void {
  if (isNonEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty string.`);
  }
}

export function assertChar(test: unknown, label: string): void {
  if (isChar(test) !== true) {
    throw new TypeError(`\`${label}\` must be an UTF-16 code unit.`);
  }
}

export function assertNumber(test: unknown, label: string): void {
  if (isNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\`.`);
  }
}

export function assertPositiveNumber(test: unknown, label: string): void {
  if (isPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`number\`.`);
  }
}

export function assertNonNegativeNumber(test: unknown, label: string): void {
  if (isNonNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`number\`.`);
  }
}

export function assertNonPositiveNumber(test: unknown, label: string): void {
  if (isNonPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`number\`.`);
  }
}

export function assertNegativeNumber(test: unknown, label: string): void {
  if (isNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`number\`.`);
  }
}

export function assertObject(test: unknown, label: string): void {
  if (isObject(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Object\`.`);
  }
}

export function assertNonNullObject(test: unknown, label: string): void {
  if (isNonNullObject(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Object\` except \`null\`.`);
  }
}

export function assertNull(test: unknown, label: string): void {
  if (isNull(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`null\`.`);
  }
}

export function assertNullOrUndefined(test: unknown, label: string): void {
  if (isNullOrUndefined(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`null\` or an \`undefined\`.`);
  }
}

export function assertBoolean(test: unknown, label: string): void {
  if (isBoolean(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`boolean\`.`);
  }
}

export function assertTrue(test: unknown, label: string): void {
  if (isTrue(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`true\`.`);
  }
}

export function assertFalse(test: unknown, label: string): void {
  if (isFalse(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`false\`.`);
  }
}
