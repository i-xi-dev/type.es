import {
  DECIMAL as DECIMAL_RADIX,
  integerPatternOf,
  type radix,
} from "./radix.ts";
import { isString } from "../string.ts";

export function isIntegerString(
  test: unknown,
  radix: radix = DECIMAL_RADIX,
): test is string {
  if (isString(test)) {
    const pattern = integerPatternOf(radix, { includesSign: true });
    return (new RegExp(pattern)).test(test);
  }
  return false;
}

export function assertIntegerString(
  test: unknown,
  label: string,
  radix: radix = DECIMAL_RADIX,
): void {
  if (isIntegerString(test, radix) !== true) {
    throw new TypeError(
      `\`${label}\` must be text representation of ${radix} based integer.`,
    );
  }
}
