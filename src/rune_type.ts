import { isString } from "./string_type.ts";

export function isRune(test: unknown): test is string {
  return isString(test) && (test.length <= 2) && ([...test].length === 1) &&
    test.isWellFormed();
}

export function assertRune(test: unknown, label: string): void {
  if (isRune(test) !== true) {
    throw new TypeError(`\`${label}\` must be an Unicode scalar value.`);
  }
}
