export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isPositive(test: unknown): test is number {
  return isNumber(test) && (test > 0);
}

export function isNonNegative(test: unknown): test is number {
  return isNumber(test) && (test >= 0);
}

export function isNonPositive(test: unknown): test is number {
  return isNumber(test) && (test <= 0);
}

export function isNegative(test: unknown): test is number {
  return isNumber(test) && (test < 0);
}

export function assertNumber(test: unknown, label: string): void {
  if (isNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\`.`);
  }
}

export function assertPositive(test: unknown, label: string): void {
  if (isPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive \`number\`.`);
  }
}

export function assertNonNegative(test: unknown, label: string): void {
  if (isNonNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative \`number\`.`);
  }
}

export function assertNonPositive(test: unknown, label: string): void {
  if (isNonPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive \`number\`.`);
  }
}

export function assertNegative(test: unknown, label: string): void {
  if (isNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative \`number\`.`);
  }
}

export function isInRange<T extends number>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  return isNumber(test) && (min <= test) && (max >= test);
}

export function toNormalized<T extends number>(value: T): T {
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

export function toClamped<T extends number>(
  value: number,
  min: T,
  max: T,
): T {
  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return toNormalized(Math.min(Math.max(value, min), max)) as T;
}
