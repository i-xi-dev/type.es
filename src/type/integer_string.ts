import { Radix } from "../numerics/mod.ts";
import { isString } from "./string.ts";
import { type radix } from "../type.ts";

export function isIntegerString(
  test: unknown,
  radix: radix = Radix.DECIMAL,
): test is string {
  if (isString(test)) {
    const pattern = Radix.integerPatternOf(radix, { includesSign: true });
    // TODO numericsを参照しない Basics/BytesとかRadixとかにして typeからはbasicsのみ参照する？
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
