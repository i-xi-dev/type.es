import { int } from "../_.ts";
import { isEven as isEvenSafeInteger } from "./safe_integer.ts";
import { RoundingMode } from "./rounding_mode.ts";

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

export function round(value: number, roundingMode?: RoundingMode): int {
  if (Number.isFinite(value) !== true) {
    throw new TypeError("`value` must be a finite number.");
  }

  const integralPart = normalize(Math.trunc(value));
  const integralPartIsEven = isEvenSafeInteger(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as RoundingMode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(value)) {
    return normalize(value);
  }

  const nearestP = normalize(Math.ceil(value));
  const nearestN = normalize(Math.floor(value));
  const sourceIsNegative = value < 0;
  const nearestPH = nearestP - 0.5;
  const nearestNH = nearestN + 0.5;

  const halfUp = (): int => {
    return (value >= nearestPH) ? nearestP : nearestN;
  };

  const halfDown = (): int => {
    return (value <= nearestNH) ? nearestN : nearestP;
  };

  switch (resolvedRoundingMode) {
    case RoundingMode.UP:
      return nearestP;

    case RoundingMode.DOWN:
      return nearestN;

    case RoundingMode.TOWARD_ZERO:
      return integralPart;

    case RoundingMode.AWAY_FROM_ZERO:
      return sourceIsNegative ? nearestN : nearestP;

    case RoundingMode.HALF_UP:
      return halfUp();

    case RoundingMode.HALF_DOWN:
      return halfDown();

    case RoundingMode.HALF_TOWARD_ZERO:
      return sourceIsNegative ? halfUp() : halfDown();

    case RoundingMode.HALF_AWAY_FROM_ZERO:
      return sourceIsNegative ? halfDown() : halfUp();

    case RoundingMode.HALF_TO_EVEN:
      if (sourceIsNegative) {
        if (value === nearestPH) {
          return integralPartIsEven ? integralPart : nearestN;
        }
        return halfDown();
      }

      if (value === nearestNH) {
        return integralPartIsEven ? integralPart : nearestP;
      }
      return halfUp();

    default:
      return 0 as never;
  }
}
