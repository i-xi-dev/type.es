import { char } from "./_.ts";
import { isString } from "./string_type.ts";

export function isChar(test: unknown): test is char {
  return isString(test) && (test.length === 1);
}

export function assertChar(test: unknown, label: string): void {
  if (isChar(test) !== true) {
    throw new TypeError(`\`${label}\` must be an UTF-16 code unit.`);
  }
}
