import {
  assertSafeInteger,
  isEvenSafeInteger,
  isPositiveNumber,
} from "../type/number.ts";
import {
  assertSupportedRadix,
  DECIMAL as DECIMAL_RADIX,
  type radix,
} from "../numerics/radix.ts";
import {
  fromString as bigintFromString,
  toNumber as bigintToNumber,
} from "../bigint/basics.ts";
import { normalize as normalizeNumber } from "../number/basics.ts";
import { RoundingMode } from "../numerics/rounding_mode.ts";
import { type safeint } from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function clamp<T extends safeint>(value: safeint, min: T, max: T): T {
  assertSafeInteger(value, "value");
  assertSafeInteger(min, "min");
  assertSafeInteger(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalizeNumber(Math.min(Math.max(value, min), max)) as T;
}

export function clampToPositive<T extends safeint>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.max(value, 1) as T);
}

export function clampToNonNegative<T extends safeint>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.max(value, NUMBER_ZERO) as T);
}

export function clampToNonPositive<T extends safeint>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, NUMBER_ZERO) as T);
}

export function clampToNegative<T extends safeint>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, -1) as T);
}

export type FromStringOptions = {
  radix?: radix;
};

export function fromString(
  value: string,
  options?: FromStringOptions,
): safeint {
  const valueAsBigInt = bigintFromString(value, options);
  return bigintToNumber(valueAsBigInt);
}

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: radix;
};

export function toString(value: safeint, options?: ToStringOptions): string {
  assertSafeInteger(value, "value");
  const radix = options?.radix ?? DECIMAL_RADIX;
  assertSupportedRadix(radix, "radix");

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

export function fromBigInt(value: bigint): safeint {
  return bigintToNumber(value);
}

export function toBigInt(value: safeint): bigint {
  assertSafeInteger(value, "value");
  return BigInt(value);
}

//XXX fromNumberか？
export function round(value: number, roundingMode?: RoundingMode): safeint {
  if (Number.isFinite(value) !== true) {
    throw new TypeError("`value` must be a finite number.");
  }

  const integralPart = normalizeNumber(Math.trunc(value));
  const integralPartIsEven = isEvenSafeInteger(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as RoundingMode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(value)) {
    return normalizeNumber(value);
  }

  const nearestP = normalizeNumber(Math.ceil(value));
  const nearestN = normalizeNumber(Math.floor(value));
  const sourceIsNegative = value < NUMBER_ZERO;
  const nearestPH = nearestP - 0.5;
  const nearestNH = nearestN + 0.5;

  const halfUp = (): safeint => {
    return (value >= nearestPH) ? nearestP : nearestN;
  };

  const halfDown = (): safeint => {
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
      return NUMBER_ZERO as never;
  }
}
