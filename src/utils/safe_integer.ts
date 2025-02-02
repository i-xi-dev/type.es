import * as BigInteger from "./big_integer.ts";
import * as ExtNumber from "../utils/number.ts";
import {
  assertSafeInteger,
  isEvenSafeInteger,
  isPositiveNumber,
  type safeint,
} from "../type/number.ts";
import {
  assertSupportedRadix,
  DECIMAL as DECIMAL_RADIX,
  type radix,
} from "./radix.ts";
import { normalize } from "./number.ts";
import { RoundingMode } from "./rounding_mode.ts";

export function clamp<T extends safeint>(value: safeint, min: T, max: T): T {
  assertSafeInteger(value, "value");
  assertSafeInteger(min, "min");
  assertSafeInteger(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}

export type FromStringOptions = {
  radix?: radix;
};

export function fromString(
  value: string,
  options?: FromStringOptions,
): safeint {
  const valueAsBigInt = BigInteger.fromString(value, options);
  return BigInteger.toNumber(valueAsBigInt);
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
  return BigInteger.toNumber(value);
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

  const integralPart = ExtNumber.normalize(Math.trunc(value));
  const integralPartIsEven = isEvenSafeInteger(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as RoundingMode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(value)) {
    return ExtNumber.normalize(value);
  }

  const nearestP = ExtNumber.normalize(Math.ceil(value));
  const nearestN = ExtNumber.normalize(Math.floor(value));
  const sourceIsNegative = value < 0;
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
      return 0 as never;
  }
}
