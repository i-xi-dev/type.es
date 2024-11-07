import {
  isNegative as isNegativeBigInt,
  isNonNegative as isNonNegativeBigInt,
  isNonPositive as isNonPositiveBigInt,
  isPositive as isPositiveBigInt,
} from "./bigint_type.ts";
import {
  isNegative as isNegativeNumber,
  isNonNegative as isNonNegativeNumber,
  isNonPositive as isNonPositiveNumber,
  isPositive as isPositiveNumber,
} from "./number_type.ts";
import { numeric } from "./_.ts";

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
