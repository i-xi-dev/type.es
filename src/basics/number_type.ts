export function is(test: unknown): test is number {
  return (typeof test === "number");
}

export function isPositive(test: unknown): test is number {
  return is(test) && (test > 0);
}

export function isNonNegative(test: unknown): test is number {
  return is(test) && (test >= 0);
}

export function isNonPositive(test: unknown): test is number {
  return is(test) && (test <= 0);
}

export function isNegative(test: unknown): test is number {
  return is(test) && (test < 0);
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
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
  assert(min, "min");
  assert(max, "max");
  if (Number.isNaN(min)) {
    throw new TypeError("`min` must not be `NaN`.");
  }
  if (Number.isNaN(max)) {
    throw new TypeError("`max` must not be `NaN`.");
  }

  return is(test) && (min <= test) && (max >= test);
}

export function normalize<T extends number>(value: T): T {
  assert(value, "value");
  return ((value === 0) ? (value + 0) : value) as T; // -0を0
}

export function clamp<T extends number>(
  value: number,
  min: T,
  max: T,
): T {
  assert(value, "value");
  assert(min, "min");
  assert(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}
