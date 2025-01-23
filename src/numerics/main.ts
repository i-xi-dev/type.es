import {
  isNegative as isNegativeBigInt,
  isNonNegative as isNonNegativeBigInt,
  isNonPositive as isNonPositiveBigInt,
  isPositive as isPositiveBigInt,
} from "./bigint_type.ts";
import {
  isNegativeNumber,
  isNonNegativeNumber,
  isNonPositiveNumber,
  isPositiveNumber,
} from "../type/is.ts";
import { numeric } from "../_.ts";
import { Radix } from "./radix.ts";
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
