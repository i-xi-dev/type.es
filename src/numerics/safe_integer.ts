import * as ExtNumber from "../utils/number.ts";
import { ToStringOptions } from "./main.ts";
import { int } from "../_.ts";
import {
  assertSafeInteger,
  isEvenSafeInteger,
  isPositiveNumber,
} from "../type/number.ts";
import {
  assertSupportedRadix,
  DECIMAL as DECIMAL_RADIX,
} from "../utils/radix.ts";
import { RoundingMode } from "./rounding_mode.ts";

export function clampToPositive<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.max(value, 1) as T);
}

export function clampToNonNegative<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.max(value, 0) as T);
}

export function clampToNonPositive<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.min(value, 0) as T);
}

export function clampToNegative<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.min(value, -1) as T);
}

export function toString(value: int, options?: ToStringOptions): string {
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

//TODO fromNumberの方が一貫性あるか
export function round(value: number, roundingMode?: RoundingMode): int {
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
