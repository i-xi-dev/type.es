import { assert as assertCodePoint } from "./code_point.ts";
import { assertIterable as assertIterableObject } from "../basics/object_type.ts";
import { codepoint, int, rune, usvstring } from "../_.ts";
import {
  assert as assertString,
  EMPTY,
  is as isString,
} from "../basics/string_type.ts";

export function is(test: unknown): test is usvstring {
  return isString(test) && test.isWellFormed();
}

export function isNonEmpty(test: unknown): test is usvstring {
  return is(test) && (test.length > 0);
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`USVString\`.`);
  }
}

export function assertNonEmpty(test: unknown, label: string): void {
  if (isNonEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty \`USVString\`.`);
  }
}

export type AllowMalformedOptions = {
  allowMalformed?: boolean;
};

export function runeCountOf(
  value: usvstring,
  options?: AllowMalformedOptions,
): int {
  if (options?.allowMalformed === true) {
    assertString(value, "value");
  } else {
    assert(value, "value");
  }
  return [...value].length;
}

//XXX fromSubstrings
//XXX fromSubstringsAsync

//XXX fromRunes
//XXX fromRunesAsync

export function toRunes(
  value: usvstring,
  options?: AllowMalformedOptions,
): IterableIterator<rune, void, void> {
  if (options?.allowMalformed === true) {
    assertString(value, "value");
  } else {
    assert(value, "value");
  }

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune;
    }
  })(value);
}

//TODO allowMalformed
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

//TODO allowMalformed
export function toCodePoints(
  value: string,
): IterableIterator<codepoint, void, void> {
  assert(value, "value");

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune.codePointAt(0)!;
    }
  })(value);
}
