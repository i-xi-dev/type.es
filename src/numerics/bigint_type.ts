import { assertBigInt, assertBigIntInRange } from "../type/bigint.ts";
import {
  assertNumber,
  isPositiveSafeInteger,
  isSafeInteger,
} from "../type/number.ts";
import { assertStringified as assertStringifiedInteger } from "./integer.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
} from "./main.ts";
import { int } from "../_.ts";
import { round as roundNumber } from "./safe_integer.ts";
import { RadixProperties } from "../basics/radix.ts";

export function fromString(value: string, options?: FromStringOptions): bigint {
  assertStringifiedInteger(value, "value", options?.radix);

  const negative = value.startsWith("-");
  let adjustedValue = value;
  adjustedValue = adjustedValue.replace(/^[-+]?/, "");
  adjustedValue = RadixProperties.of(options?.radix).prefix + adjustedValue;
  let valueAsBigInt = BigInt(adjustedValue);
  if (negative === true) {
    valueAsBigInt *= -1n;
  }

  return valueAsBigInt;
}

export function toString(value: bigint, options?: ToStringOptions): string {
  assertBigInt(value, "value");

  const radix = RadixProperties.of(options?.radix).radix;
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

export function fromNumber(
  value: number,
  options?: FromNumberOptions,
): bigint {
  assertNumber(value, "value");
  //XXX Finiteでなければエラーで良いのでは

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

  let valueAsInt: int;
  if (isSafeInteger(adjustedValue)) {
    valueAsInt = adjustedValue;
  } else {
    valueAsInt = roundNumber(adjustedValue, options?.roundingMode);
  }

  return BigInt(valueAsInt);
}
