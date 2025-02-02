import { assertNumber, isSafeInteger } from "../type/number.ts";
import { FromNumberOptions } from "./main.ts";
import { int } from "../_.ts";
import { round as roundNumber } from "../utils/safe_integer.ts";

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
