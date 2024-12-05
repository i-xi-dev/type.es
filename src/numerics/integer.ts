import { is as isString } from "../basics/string_type.ts";
import {
  isEven as isEvenBigInt,
  isNegative as isNegativeBigInt,
  isNonNegative as isNonNegativeBigInt,
  isNonPositive as isNonPositiveBigInt,
  isOdd as isOddBigInt,
  isPositive as isPositiveBigInt,
} from "./bigint_type.ts";
import {
  isEven as isEvenSafeInteger,
  isNegative as isNegativeSafeInteger,
  isNonNegative as isNonNegativeSafeInteger,
  isNonPositive as isNonPositiveSafeInteger,
  isOdd as isOddSafeInteger,
  isPositive as isPositiveSafeInteger,
} from "./safe_integer.ts";
import { Radix, RadixProperties } from "./radix.ts";
import { xint } from "../_.ts";

// ここでは、safe integerではないnumber型は「整数」とみなさない

export function isPositive(test: unknown): test is xint {
  return isPositiveSafeInteger(test) || isPositiveBigInt(test);
}

export function isNonNegative(test: unknown): test is xint {
  return isNonNegativeSafeInteger(test) || isNonNegativeBigInt(test);
}

export function isNonPositive(test: unknown): test is xint {
  return isNonPositiveSafeInteger(test) || isNonPositiveBigInt(test);
}

export function isNegative(test: unknown): test is xint {
  return isNegativeSafeInteger(test) || isNegativeBigInt(test);
}

export function isOdd(test: unknown): test is xint {
  return isOddSafeInteger(test) || isOddBigInt(test);
}

export function isEven(test: unknown): test is xint {
  return isEvenSafeInteger(test) || isEvenBigInt(test);
}

export function isStringified(
  test: unknown,
  radix?: Radix,
): test is string {
  const integralRegex = RadixProperties.of(radix).digitsRegex;
  return isString(test) && integralRegex.test(test);
}

export function assertStringified(
  test: unknown,
  label: string,
  radix?: Radix,
): void {
  if (isStringified(test, radix) !== true) {
    throw new TypeError(
      `\`${label}\` must be ${
        RadixProperties.of(radix).label
      } representation of an integer.`,
    );
  }
}
