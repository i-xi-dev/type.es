import { assertNumberRange, assertSafeIntRange } from "./numeric_range.ts";
import {
  type intrange,
  type numberrange,
  type safeint,
} from "../_typedef/mod.ts";
import { ZERO as NUMBER_ZERO } from "../_const/number.ts";

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function assertNumber(test: unknown, label: string): void {
  if (isNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\`.`);
  }
}

// isFiniteNumber → Number.isFinite

export function assertFiniteNumber(test: unknown, label: string): void {
  if (Number.isFinite(test) !== true) {
    throw new TypeError(`\`${label}\` must be a finite \`number\`.`);
  }
}

export function isPositiveNumber(test: unknown): test is number {
  return isNumber(test) && (test > NUMBER_ZERO);
}

export function assertPositiveNumber(test: unknown, label: string): void {
  if (isPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`number\`.`);
  }
}

export function isNonNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test >= NUMBER_ZERO);
}

export function assertNonNegativeNumber(test: unknown, label: string): void {
  if (isNonNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`number\`.`);
  }
}

export function isNonPositiveNumber(test: unknown): test is number {
  return isNumber(test) && (test <= NUMBER_ZERO);
}

export function assertNonPositiveNumber(test: unknown, label: string): void {
  if (isNonPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`number\`.`);
  }
}

export function isNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test < NUMBER_ZERO);
}

export function assertNegativeNumber(test: unknown, label: string): void {
  if (isNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`number\`.`);
  }
}

//XXX isPositiveFiniteNumber, ...

export function isNumberInRange(
  test: unknown,
  range: numberrange,
): test is number {
  assertNumberRange(range, "range");

  const [min, max] = range;
  return isNumber(test) && (min <= test) && (max >= test);
}

export function assertNumberInRange(
  test: unknown,
  label: string,
  range: numberrange,
): void {
  if (isNumberInRange(test, range) !== true) {
    throw new TypeError(
      `\`${label}\` must be a \`number\` in the range ${range[0]}-${range[1]}.`,
    );
  }
}

export function isSafeInt(test: unknown): test is safeint {
  return Number.isSafeInteger(test);
}

export function assertSafeInt(test: unknown, label: string): void {
  if (isSafeInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a safe integer.`);
  }
}

export function isPositiveSafeInt(test: unknown): test is safeint {
  return isSafeInt(test) && (test > NUMBER_ZERO);
}

export function assertPositiveSafeInt(test: unknown, label: string): void {
  if (isPositiveSafeInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive safe integer.`);
  }
}

export function isNonNegativeSafeInt(test: unknown): test is safeint {
  return isSafeInt(test) && (test >= NUMBER_ZERO);
}

export function assertNonNegativeSafeInt(
  test: unknown,
  label: string,
): void {
  if (isNonNegativeSafeInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative safe integer.`);
  }
}

export function isNonPositiveSafeInt(test: unknown): test is safeint {
  return isSafeInt(test) && (test <= NUMBER_ZERO);
}

export function assertNonPositiveSafeInt(
  test: unknown,
  label: string,
): void {
  if (isNonPositiveSafeInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive safe integer.`);
  }
}

export function isNegativeSafeInt(test: unknown): test is safeint {
  return isSafeInt(test) && (test < NUMBER_ZERO);
}

export function assertNegativeSafeInt(test: unknown, label: string): void {
  if (isNegativeSafeInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative safe integer.`);
  }
}

export function isOddSafeInt(test: unknown): test is safeint {
  return isSafeInt(test) && ((test % 2) !== NUMBER_ZERO);
}

export function assertOddSafeInt(test: unknown, label: string): void {
  if (isOddSafeInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd safe integer.`);
  }
}

export function isEvenSafeInt(test: unknown): test is safeint {
  return isSafeInt(test) && ((test % 2) === NUMBER_ZERO);
}

export function assertEvenSafeInt(test: unknown, label: string): void {
  if (isEvenSafeInt(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even safe integer.`);
  }
}

export function isSafeIntInRange(
  test: unknown,
  range: intrange<safeint>,
): test is safeint {
  assertSafeIntRange(range, "range");

  const [min, max] = range;
  return isSafeInt(test) && (min <= test) && (max >= test);
}

export function assertSafeIntInRange(
  test: unknown,
  label: string,
  range: intrange<safeint>,
): void {
  if (isSafeIntInRange(test, range) !== true) {
    throw new TypeError(
      `\`${label}\` must be a safe integer in the range ${range[0]}-${
        range[1]
      }.`,
    );
  }
}
