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
