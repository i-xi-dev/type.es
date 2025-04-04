import * as ExBigInt from "../bigint/mod.ts";
import * as ExNumber from "../number/mod.ts";
import * as RoundingMode from "../rounding_mode/mod.ts";
import * as Type from "../../type/mod.ts";
import {
  type intrange,
  type radix,
  type roundingmode,
  type safeint,
} from "../../_typedef/mod.ts";
import { Radix } from "../../basics/mod.ts";

export function clampToRange(
  value: safeint,
  range: intrange<safeint>,
): safeint {
  Type.assertSafeInt(value, "value");
  Type.assertSafeIntRange(range, "range");

  const [min, max] = range;
  return ExNumber.normalize(Math.min(Math.max(value, min), max));
}

export function clampToPositive(value: safeint): safeint {
  Type.assertSafeInt(value, "value");
  return ExNumber.normalize(Math.max(value, 1));
}

export function clampToNonNegative(value: safeint): safeint {
  Type.assertSafeInt(value, "value");
  return ExNumber.normalize(Math.max(value, 0));
}

export function clampToNonPositive(value: safeint): safeint {
  Type.assertSafeInt(value, "value");
  return ExNumber.normalize(Math.min(value, 0));
}

export function clampToNegative(value: safeint): safeint {
  Type.assertSafeInt(value, "value");
  return ExNumber.normalize(Math.min(value, -1));
}

export type FromStringOptions = {
  radix?: radix;
};

export function fromString(
  value: string,
  options?: FromStringOptions,
): safeint {
  const valueAsBigInt = ExBigInt.fromString(value, options);
  return ExBigInt.toNumber(valueAsBigInt);
}

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegerDigits?: number;
  radix?: radix;
};

export function toString(value: safeint, options?: ToStringOptions): string {
  Type.assertSafeInt(value, "value");
  const radix = options?.radix ?? Radix.DECIMAL;
  Radix.assertSupportedRadix(radix, "radix");

  let result = value.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegerDigits = options?.minIntegerDigits;
  if (Type.isPositiveNumber(minIntegerDigits)) {
    result = result.padStart(minIntegerDigits, "0");
  }

  return result;
}

export function fromBigInt(value: bigint): safeint {
  return ExBigInt.toNumber(value);
}

export function toBigInt(value: safeint): bigint {
  Type.assertSafeInt(value, "value");
  return BigInt(value);
}

//XXX fromNumberか？
export function round(value: number, roundingMode?: roundingmode): safeint {
  if (Number.isFinite(value) !== true) {
    throw new TypeError("`value` must be a finite number.");
  }

  const integralPart = ExNumber.normalize(Math.trunc(value));
  const integralPartIsEven = Type.isEvenSafeInt(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as roundingmode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(value)) {
    return ExNumber.normalize(value);
  }

  const nearestP = ExNumber.normalize(Math.ceil(value));
  const nearestN = ExNumber.normalize(Math.floor(value));
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
