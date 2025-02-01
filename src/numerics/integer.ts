import {
  isEvenBigInt,
  isNegativeBigInt,
  isNonNegativeBigInt,
  isNonPositiveBigInt,
  isOddBigInt,
  isPositiveBigInt,
} from "../type/bigint.ts";
import {
  isEvenSafeInteger,
  isNegativeSafeInteger,
  isNonNegativeSafeInteger,
  isNonPositiveSafeInteger,
  isOddSafeInteger,
  isPositiveSafeInteger,
} from "../type/number.ts";
import { isString } from "../type/string.ts";
import { integerPatternOf, type radix } from "../utils/radix.ts";
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
  radix: radix = 10,
): test is string {
  if (isString(test)) {
    return (new RegExp(integerPatternOf(radix, { includesSign: true }))).test(
      test,
    );
  }
  return false;
}

export function assertStringified(
  test: unknown,
  label: string,
  radix: radix = 10,
): void {
  if (isStringified(test, radix) !== true) {
    throw new TypeError(
      `\`${label}\` must be text representation of ${radix} based integer.`,
    );
  }
}
