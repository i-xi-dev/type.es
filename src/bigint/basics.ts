import {
  assertBigInt,
  assertBigIntInSafeIntegerRange,
} from "../type/bigint.ts";
import {
  assertFiniteNumber,
  isPositiveSafeInteger,
  isSafeInteger,
} from "../type/number.ts";
import { assertIntegerString } from "../type/integer_string.ts";
import {
  assertSupportedRadix,
  DECIMAL as DECIMAL_RADIX,
  prefixOf,
  type radix,
} from "../numerics/radix.ts";
import { EMPTY as EMPTY_STRING } from "../const/string.ts";
import { round as roundFromNumber } from "../safe_integer/basics.ts";
import { RoundingMode } from "../numerics/rounding_mode.ts";
import { type safeint } from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function min<T extends bigint>(value0: T, ...values: T[]): T {
  assertBigInt(value0, `value0`);

  let provMin = value0;
  let value: T;
  for (let i = NUMBER_ZERO; i < values.length; i++) {
    value = values[i];
    assertBigInt(value, `values[${i}]`);

    if (value < provMin) {
      provMin = value;
    }
  }
  return provMin;
}

export function max<T extends bigint>(value0: T, ...values: T[]): T {
  assertBigInt(value0, `value0`);

  let provMax = value0;
  let value: T;
  for (let i = NUMBER_ZERO; i < values.length; i++) {
    value = values[i];
    assertBigInt(value, `values[${i}]`);

    if (value > provMax) {
      provMax = value;
    }
  }
  return provMax;
}

const _min = min;
const _max = max;

export function clamp<T extends bigint>(value: bigint, min: T, max: T): T {
  assertBigInt(value, "value");
  assertBigInt(min, "min");
  assertBigInt(max, "max");

  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return _min(_max(value, min), max) as T;
}

export type FromStringOptions = {
  radix?: radix;
};

export function fromString(value: string, options?: FromStringOptions): bigint {
  const radix = options?.radix ?? DECIMAL_RADIX;
  assertIntegerString(value, "value", radix);

  const negative = value.startsWith("-");
  let adjustedValue = value;
  adjustedValue = adjustedValue.replace(/^[-+]?/, EMPTY_STRING);
  adjustedValue = prefixOf(radix) + adjustedValue;
  let valueAsBigInt = BigInt(adjustedValue);
  if (negative === true) {
    valueAsBigInt *= -1n;
  }

  return valueAsBigInt;
}

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: radix;
};

export function toString(value: bigint, options?: ToStringOptions): string {
  assertBigInt(value, "value");
  const radix = options?.radix ?? DECIMAL_RADIX;
  assertSupportedRadix(radix, "radix");

  let result = value.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (isPositiveSafeInteger(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}

export type FromNumberOptions = {
  roundingMode?: RoundingMode;
};

export function fromNumber(
  value: number,
  options?: FromNumberOptions,
): bigint {
  assertFiniteNumber(value, "value");

  if (Number.isNaN(value)) {
    throw new TypeError("`value` must not be `NaN`.");
  }

  let adjustedValue: number;
  if (value > Number.MAX_SAFE_INTEGER) {
    adjustedValue = Number.MAX_SAFE_INTEGER;
  } else if (value < Number.MIN_SAFE_INTEGER) {
    adjustedValue = Number.MIN_SAFE_INTEGER;
  } else {
    adjustedValue = value;
  }

  let valueAsInt: safeint;
  if (isSafeInteger(adjustedValue)) {
    valueAsInt = adjustedValue;
  } else {
    valueAsInt = roundFromNumber(adjustedValue, options?.roundingMode);
  }

  return BigInt(valueAsInt);
}

export function toNumber(value: bigint): safeint {
  assertBigIntInSafeIntegerRange(value, "value");
  return Number(value);
}
