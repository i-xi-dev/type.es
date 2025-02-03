import { isNegativeBigInt, isNonPositiveBigInt } from "../type/bigint.ts";
import { isNegativeNumber, isNonPositiveNumber } from "../type/number.ts";
import { numeric } from "../_.ts";
import { type radix } from "../type/sp/radix.ts";
import { RoundingMode } from "../type/sp/rounding_mode.ts";

export function isNonPositive(test: unknown): test is numeric {
  return isNonPositiveNumber(test) || isNonPositiveBigInt(test);
}

export function isNegative(test: unknown): test is numeric {
  return isNegativeNumber(test) || isNegativeBigInt(test);
}

//XXX Integer.FromNumberOptions or IntegerFromNumberOptions
export type FromNumberOptions = {
  roundingMode?: RoundingMode;
};

export type FromStringOptions = {
  radix?: radix;
};

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: radix;
};
