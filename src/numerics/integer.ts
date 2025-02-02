import { isEvenBigInt, isOddBigInt } from "../type/bigint.ts";
import {
  isEvenSafeInteger,
  isOddSafeInteger,
} from "../type/number.ts";
import { isString } from "../type/string.ts";
import {
  DECIMAL as DECIMAL_RADIX,
  integerPatternOf,
  type radix,
} from "../utils/radix.ts";
import { xint } from "../_.ts";

// ここでは、safe integerではないnumber型は「整数」とみなさない

export function isOdd(test: unknown): test is xint {
  return isOddSafeInteger(test) || isOddBigInt(test);
}

export function isEven(test: unknown): test is xint {
  return isEvenSafeInteger(test) || isEvenBigInt(test);
}

export function isStringified(
  test: unknown,
  radix: radix = DECIMAL_RADIX,
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
  radix: radix = DECIMAL_RADIX,
): void {
  if (isStringified(test, radix) !== true) {
    throw new TypeError(
      `\`${label}\` must be text representation of ${radix} based integer.`,
    );
  }
}
