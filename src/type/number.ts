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
  return isNumber(test) && (test > 0);
}

export function assertPositiveNumber(test: unknown, label: string): void {
  if (isPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`number\`.`);
  }
}

export function isNonNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test >= 0);
}

export function assertNonNegativeNumber(test: unknown, label: string): void {
  if (isNonNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`number\`.`);
  }
}

export function isNonPositiveNumber(test: unknown): test is number {
  return isNumber(test) && (test <= 0);
}

export function assertNonPositiveNumber(test: unknown, label: string): void {
  if (isNonPositiveNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`number\`.`);
  }
}

export function isNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test < 0);
}

export function assertNegativeNumber(test: unknown, label: string): void {
  if (isNegativeNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`number\`.`);
  }
}

//XXX isPositiveFiniteNumber, ...

export function isNumberInRange(
  test: unknown,
  min: number,
  max: number,
): test is number {
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");

  return isNumber(test) && (min <= test) && (max >= test);
}

export function assertNumberInRange(
  test: unknown,
  label: string,
  min: number,
  max: number,
): void {
  if (isNumberInRange(test, min, max) !== true) {
    throw new TypeError(
      `\`${label}\` must be a \`number\` in the range ${min}-${max}.`,
    );
  }
}

export type safeint = number;

export function isSafeInteger(test: unknown): test is safeint {
  return Number.isSafeInteger(test);
}

export function assertSafeInteger(test: unknown, label: string): void {
  if (isSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a safe integer.`);
  }
}

export function isPositiveSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test > 0);
}

export function assertPositiveSafeInteger(test: unknown, label: string): void {
  if (isPositiveSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive safe integer.`);
  }
}

export function isNonNegativeSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test >= 0);
}

export function assertNonNegativeSafeInteger(
  test: unknown,
  label: string,
): void {
  if (isNonNegativeSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative safe integer.`);
  }
}

export function isNonPositiveSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test <= 0);
}

export function assertNonPositiveSafeInteger(
  test: unknown,
  label: string,
): void {
  if (isNonPositiveSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive safe integer.`);
  }
}

export function isNegativeSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && (test < 0);
}

export function assertNegativeSafeInteger(test: unknown, label: string): void {
  if (isNegativeSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative safe integer.`);
  }
}

export function isOddSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && ((test % 2) !== 0);
}

export function assertOddSafeInteger(test: unknown, label: string): void {
  if (isOddSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd safe integer.`);
  }
}

export function isEvenSafeInteger(test: unknown): test is safeint {
  return isSafeInteger(test) && ((test % 2) === 0);
}

export function assertEvenSafeInteger(test: unknown, label: string): void {
  if (isEvenSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even safe integer.`);
  }
}

export function isSafeIntegerInRange(
  test: unknown,
  min: safeint,
  max: safeint,
): test is safeint {
  assertSafeInteger(min, "min");
  assertSafeInteger(max, "max");

  return isSafeInteger(test) && (min <= test) && (max >= test);
}

export function assertSafeIntegerInRange(
  test: unknown,
  label: string,
  min: safeint,
  max: safeint,
): void {
  if (isSafeIntegerInRange(test, min, max) !== true) {
    throw new TypeError(
      `\`${label}\` must be a safe integer in the range ${min}-${max}.`,
    );
  }
}
