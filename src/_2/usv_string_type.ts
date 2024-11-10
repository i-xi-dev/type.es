import { assertCodePoint } from "./code_point_type.ts";
import { assertIterable as assertIterableObject } from "../_0/object_type.ts";
import { codepoint, int, rune, usvstring } from "../_.ts";
import { EMPTY, isString } from "../_0/string_type.ts";

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

export function fromCodePoints(value: Iterable<codepoint>): string {
  assertIterableObject(value, "value");

  let runes = EMPTY;
  let rune: rune;
  let i = 0;
  for (const codePoint of value) {
    assertCodePoint(codePoint, `value[${i}]`);
    rune = String.fromCodePoint(codePoint);
    if (rune.isWellFormed() !== true) {
      throw new RangeError(
        "`value` must not contain lone surrogate code points.",
      );
    }
    runes += rune;
    i++;
  }

  return runes;
}

//XXX fromCodePointsAsync(value: AsyncIterable<codepoint>): Promise<string>

export function toCodePoints(
  value: string,
): IterableIterator<codepoint, void, void> {
  assertUsvString(value, "value");

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune.codePointAt(0)!;
    }
  })(value);
}
