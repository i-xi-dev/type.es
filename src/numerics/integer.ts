import { isString } from "../type/string.ts";
import {
  DECIMAL as DECIMAL_RADIX,
  integerPatternOf,
  type radix,
} from "../type/sp/radix.ts";

// ここでは、safe integerではないnumber型は「整数」とみなさない

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
