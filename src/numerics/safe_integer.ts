import {
  fromString as fromStringToBigInt,
  toNumber as fromBigIntToNumber,
} from "./bigint_type.ts";
import { FromStringOptions, ToStringOptions } from "./main.ts";
import { int } from "../_.ts";
import * as NumberUtils from "../utils/number.ts";
import { isPositiveNumber } from "../type/is_0.ts";
import { RadixProperties } from "../basics/radix.ts";
import { RoundingMode } from "./rounding_mode.ts";

export function is(test: unknown): test is int {
  return Number.isSafeInteger(test);
}

export function isPositive(test: unknown): test is int {
  return is(test) && (test > 0);
}

export function isNonNegative(test: unknown): test is int {
  return is(test) && (test >= 0);
}

export function isNonPositive(test: unknown): test is int {
  return is(test) && (test <= 0);
}

export function isNegative(test: unknown): test is int {
  return is(test) && (test < 0);
}

export function isOdd(test: unknown): test is int {
  return is(test) && ((test % 2) !== 0);
}

export function isEven(test: unknown): test is int {
  return is(test) && ((test % 2) === 0);
}

export function assert(test: unknown, label: string): void {
  if (Number.isSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a safe integer.`);
  }
}

export function assertPositive(test: unknown, label: string): void {
  if (isPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a positive safe integer.`);
  }
}

export function assertNonNegative(test: unknown, label: string): void {
  if (isNonNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-negative safe integer.`);
  }
}

export function assertNonPositive(test: unknown, label: string): void {
  if (isNonPositive(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-positive safe integer.`);
  }
}

export function assertNegative(test: unknown, label: string): void {
  if (isNegative(test) !== true) {
    throw new TypeError(`\`${label}\` must be a negative safe integer.`);
  }
}

export function assertOdd(test: unknown, label: string): void {
  if (isOdd(test) !== true) {
    throw new TypeError(`\`${label}\` must be an odd safe integer.`);
  }
}

export function assertEven(test: unknown, label: string): void {
  if (isEven(test) !== true) {
    throw new TypeError(`\`${label}\` must be an even safe integer.`);
  }
}

export function isInRange<T extends int>(
  test: unknown,
  min: T,
  max: T,
): test is T {
  assert(min, "min");
  assert(max, "max");

  return is(test) && (min <= test) && (max >= test);
}

export function clamp<T extends int>(value: int, min: T, max: T): T {
  assert(value, "value");
  assert(min, "min");
  assert(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return NumberUtils.normalize(Math.min(Math.max(value, min), max)) as T;
}

export function clampToPositive<T extends int>(value: T): T {
  assert(value, "value");
  return NumberUtils.normalize(Math.max(value, 1) as T);
}

export function clampToNonNegative<T extends int>(value: T): T {
  assert(value, "value");
  return NumberUtils.normalize(Math.max(value, 0) as T);
}

export function clampToNonPositive<T extends int>(value: T): T {
  assert(value, "value");
  return NumberUtils.normalize(Math.min(value, 0) as T);
}

export function clampToNegative<T extends int>(value: T): T {
  assert(value, "value");
  return NumberUtils.normalize(Math.min(value, -1) as T);
}

export function fromBigInt(value: bigint): int {
  return fromBigIntToNumber(value);
}

export function toBigInt(value: int): bigint {
  assert(value, "value");
  return BigInt(value);
}

export function fromString(value: string, options?: FromStringOptions): int {
  const valueAsBigInt = fromStringToBigInt(value, options);
  return fromBigIntToNumber(valueAsBigInt);
}

export function toString(value: int, options?: ToStringOptions): string {
  assert(value, "value");

  const radix = RadixProperties.of(options?.radix).radix;
  let result = value.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (isPositiveNumber(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}

//TODO fromNumberの方が一貫性あるか
export function round(value: number, roundingMode?: RoundingMode): int {
  if (Number.isFinite(value) !== true) {
    throw new TypeError("`value` must be a finite number.");
  }

  const integralPart = NumberUtils.normalize(Math.trunc(value));
  const integralPartIsEven = isEven(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as RoundingMode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(value)) {
    return NumberUtils.normalize(value);
  }

  const nearestP = NumberUtils.normalize(Math.ceil(value));
  const nearestN = NumberUtils.normalize(Math.floor(value));
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
