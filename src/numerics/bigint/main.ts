import * as ExString from "../../basics/string/mod.ts";
import * as Radix from "../../basics/radix/mod.ts";
import * as SafeInt from "../safeint/mod.ts";
import * as Type from "../../type/mod.ts";
import {
  type bigintrange,
  type radix,
  type roundingmode,
  type safeint,
} from "../../_typedef/mod.ts";

export function min(value0: bigint, ...values: bigint[]): bigint {
  Type.assertBigInt(value0, `value0`);

  let provMin = value0;
  let value: bigint;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    Type.assertBigInt(value, `values[${i}]`);

    if (value < provMin) {
      provMin = value;
    }
  }
  return provMin;
}

export function max(value0: bigint, ...values: bigint[]): bigint {
  Type.assertBigInt(value0, `value0`);

  let provMax = value0;
  let value: bigint;
  for (let i = 0; i < values.length; i++) {
    value = values[i];
    Type.assertBigInt(value, `values[${i}]`);

    if (value > provMax) {
      provMax = value;
    }
  }
  return provMax;
}

const _min = min;
const _max = max;

//TODO 命名 toか？
export function clampToRange(value: bigint, range: bigintrange): bigint {
  Type.assertBigInt(value, "value");
  Type.assertBigIntRange(range, "range");

  const [min, max] = range;
  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return _min(_max(value, min), max);
}

export type FromStringOptions = {
  radix?: radix;
};

export function fromString(value: string, options?: FromStringOptions): bigint {
  const radix = options?.radix ?? Radix.DECIMAL;
  Type.assertIntegerString(value, "value", radix);

  const negative = value.startsWith("-");
  let adjustedValue = value;
  adjustedValue = adjustedValue.replace(/^[-+]?/, ExString.EMPTY);
  adjustedValue = Radix.prefixOf(radix) + adjustedValue;
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
  Type.assertBigInt(value, "value");
  const radix = options?.radix ?? Radix.DECIMAL;
  Radix.assertSupportedRadix(radix, "radix");

  let result = value.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (Type.isPositiveSafeInt(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}

export type FromNumberOptions = {
  roundingMode?: roundingmode;
};

export function fromNumber(
  value: number,
  options?: FromNumberOptions,
): bigint {
  Type.assertFiniteNumber(value, "value");

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
  if (Type.isSafeInt(adjustedValue)) {
    valueAsInt = adjustedValue;
  } else {
    valueAsInt = SafeInt.round(adjustedValue, options?.roundingMode);
  }

  return BigInt(valueAsInt);
}

export function toNumber(value: bigint): safeint {
  Type.assertBigIntInSafeIntRange(value, "value");
  return Number(value);
}
