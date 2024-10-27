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
} from "./safe_integer_type.ts";
import { isString } from "./string_type.ts";
import { Radix, radixPropertiesOf } from "./numerics.ts";

// ここでは、safe integerではないnumber型は「整数」とみなさない

type int = number | bigint;

export function isPositive(test: unknown): test is int {
  return isPositiveSafeInteger(test) || isPositiveBigInt(test);
}

export function isNonNegative(test: unknown): test is int {
  return isNonNegativeSafeInteger(test) || isNonNegativeBigInt(test);
}

export function isNonPositive(test: unknown): test is int {
  return isNonPositiveSafeInteger(test) || isNonPositiveBigInt(test);
}

export function isNegative(test: unknown): test is int {
  return isNegativeSafeInteger(test) || isNegativeBigInt(test);
}

export function isOdd(test: unknown): test is int {
  return isOddSafeInteger(test) || isOddBigInt(test);
}

export function isEven(test: unknown): test is int {
  return isEvenSafeInteger(test) || isEvenBigInt(test);
}

//

export function isStringified(
  test: unknown,
  radix?: Radix,
): test is string {
  const integralRegex = radixPropertiesOf(radix).digitsRegex;
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
        radixPropertiesOf(radix).label
      } representation of an integer.`,
    );
  }
}
