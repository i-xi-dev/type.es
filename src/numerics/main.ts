import {
  isNegativeBigInt,
  isNegativeNumber,
  isNonNegativeBigInt,
  isNonNegativeNumber,
  isNonPositiveBigInt,
  isNonPositiveNumber,
  isPositiveBigInt,
  isPositiveNumber,
} from "../type/is.ts";
import { numeric } from "../_.ts";
import { Radix } from "../basics/radix.ts";
import { RoundingMode } from "./rounding_mode.ts";

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
  radix?: Radix;
};

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: Radix;
};
