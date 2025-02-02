import {
  isNegativeBigInt,
  isNonNegativeBigInt,
  isNonPositiveBigInt,
  isPositiveBigInt,
} from "../type/bigint.ts";
import {
  isNegativeNumber,
  isNonNegativeNumber,
  isNonPositiveNumber,
  isPositiveNumber,
} from "../type/number.ts";
import { numeric } from "../_.ts";
import { type radix } from "../type/sp/radix.ts";
import { RoundingMode } from "../utils/rounding_mode.ts";

export function isPositive(test: unknown): test is numeric {
  return isPositiveNumber(test) || isPositiveBigInt(test);
}

export function isNonNegative(test: unknown): test is numeric {
  return isNonNegativeNumber(test) || isNonNegativeBigInt(test);
}

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
