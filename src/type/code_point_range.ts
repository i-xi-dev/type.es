import { type codepoint, type intrange } from "../_typedef/mod.ts";
import { isCodePoint } from "./code_point.ts";

export function isCodePointRange(test: unknown): test is intrange<codepoint> {
  return Array.isArray(test) && (test.length === 2) &&
    test.every((i) => isCodePoint(i)) && (test[0] <= test[1]);
}

export function assertCodePointRange(test: unknown, label: string): void {
  if (isCodePointRange(test) !== true) {
    throw new TypeError(`\`${label}\` must be a range of code point.`);
  }
}
