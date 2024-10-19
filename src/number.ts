export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isPositiveNumber(test: unknown): test is number {
  return isNumber(test) && (test > 0);
}

export function isNonNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test >= 0);
}

export function isNonPositiveNumber(test: unknown): test is number {
  return isNumber(test) && (test <= 0);
}

export function isNegativeNumber(test: unknown): test is number {
  return isNumber(test) && (test < 0);
}

export function isSafeInteger(test: unknown): test is number {
  return Number.isSafeInteger(test);
}

export function isPositiveSafeInteger(test: unknown): test is number {
  return isSafeInteger(test) && (test > 0);
}

export function isNonNegativeSafeInteger(test: unknown): test is number {
  return isSafeInteger(test) && (test >= 0);
}

export function isNonPositiveSafeInteger(test: unknown): test is number {
  return isSafeInteger(test) && (test <= 0);
}

export function isNegativeSafeInteger(test: unknown): test is number {
  return isSafeInteger(test) && (test < 0);
}

export function isOddSafeInteger(test: unknown): test is number {
  return isSafeInteger(test) && ((test % 2) !== 0);
}

export function isEvenSafeInteger(test: unknown): test is number {
  return isSafeInteger(test) && ((test % 2) === 0);
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

export function assertSafeInteger(test: unknown, label: string): void {
  if (Number.isSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a safe integer.`);
  }
}

export function assertPositiveSafeInteger(test: unknown, label: string): void {
  if (isPositiveSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive safe integer.`);
  }
}

export function assertNonNegativeSafeInteger(
  test: unknown,
  label: string,
): void {
  if (isNonNegativeSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative safe integer.`);
  }
}

export function assertNonPositiveSafeInteger(
  test: unknown,
  label: string,
): void {
  if (isNonPositiveSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive safe integer.`);
  }
}

export function assertNegativeSafeInteger(test: unknown, label: string): void {
  if (isNegativeSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative safe integer.`);
  }
}

export function assertOddSafeInteger(test: unknown, label: string): void {
  if (isOddSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd safe integer.`);
  }
}

export function assertEvenSafeInteger(test: unknown, label: string): void {
  if (isEvenSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even safe integer.`);
  }
}

export function isNumberInRange<T extends number>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  return isNumber(test) && (min <= test) && (max >= test);
}

export function isSafeIntegerInRange<T extends number>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  return isSafeInteger(test) && (min <= test) && (max >= test);
}
