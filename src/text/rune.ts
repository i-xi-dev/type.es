import { is as isString } from "../basics/string_type.ts";
import { rune } from "../_.ts";

export function isRune(test: unknown): test is rune {
  return isString(test) && (test.length <= 2) && ([...test].length === 1) &&
    test.isWellFormed();
}

export function assertRune(test: unknown, label: string): void {
  if (isRune(test) !== true) {
    throw new TypeError(`\`${label}\` must be an Unicode scalar value.`);
  }
}
