import * as Radix from "../basics/radix/mod.ts";
import { isString } from "./string.ts";
import { type radix } from "../type.ts";

export function isIntegerString(
  test: unknown,
  radix: radix = Radix.DECIMAL,
): test is string {
  if (isString(test)) {
    const pattern = Radix.integerPatternOf(radix, { includesSign: true });
    return (new RegExp(pattern)).test(test);
  }
  return false;
}

export function assertIntegerString(
  test: unknown,
  label: string,
  radix: radix = Radix.DECIMAL,
): void {
  if (isIntegerString(test, radix) !== true) {
    throw new TypeError(
      `\`${label}\` must be text representation of ${radix} based integer.`,
    );
  }
}
