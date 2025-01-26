import {
  isBigInt,
  isBoolean,
  isEvenBigInt,
  isFalse,
  isNegativeBigInt,
  isNonNegativeBigInt,
  isNonNullObject,
  isNonPositiveBigInt,
  isNull,
  isNullOrUndefined,
  isObject,
  isOddBigInt,
  isPositiveBigInt,
  isTrue,
} from "./is_0.ts";

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

export function assertBigInt(test: unknown, label: string): void {
  if (isBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`bigint\`.`);
  }
}

export function assertPositiveBigInt(test: unknown, label: string): void {
  if (isPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`bigint\`.`);
  }
}

export function assertNonNegativeBigInt(test: unknown, label: string): void {
  if (isNonNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`bigint\`.`);
  }
}

export function assertNonPositiveBigInt(test: unknown, label: string): void {
  if (isNonPositiveBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`bigint\`.`);
  }
}

export function assertNegativeBigInt(test: unknown, label: string): void {
  if (isNegativeBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`bigint\`.`);
  }
}

export function assertOddBigInt(test: unknown, label: string): void {
  if (isOddBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd \`bigint\`.`);
  }
}

export function assertEvenBigInt(test: unknown, label: string): void {
  if (isEvenBigInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even \`bigint\`.`);
  }
}
