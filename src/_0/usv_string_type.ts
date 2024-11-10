import { int, rune, usvstring } from "../_.ts";
import { isString } from "./string_type.ts";

export function isUsvString(test: unknown): test is usvstring {
  return isString(test) && test.isWellFormed();
}

export function isNonEmpty(test: unknown): test is usvstring {
  return isUsvString(test) && (test.length > 0);
}

export function assertUsvString(test: unknown, label: string): void {
  if (isUsvString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`USVString\`.`);
  }
}

export function assertNonEmpty(test: unknown, label: string): void {
  if (isNonEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty \`USVString\`.`);
  }
}

export function runeCountOf(value: usvstring): int {
  assertUsvString(value, "value");
  return [...value].length;
}

//XXX fromSubstrings
//XXX fromSubstringsAsync

//XXX fromRunes
//XXX fromRunesAsync

export function toRunes(value: usvstring): IterableIterator<rune, void, void> {
  assertUsvString(value, "value");

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune;
    }
  })(value);
}
