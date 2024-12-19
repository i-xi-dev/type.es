import { assert as assertCodePoint } from "./code_point.ts";
import { assert as assertScript } from "../i18n/script.ts";
import { assertIterable as assertIterableObject } from "../basics/object_type.ts";
import { codepoint, grapheme, int, rune, script, usvstring } from "../_.ts";
import { EMPTY, is as isString } from "../basics/string_type.ts";
import { getGraphemeSegmenter } from "../i18n/main.ts";

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

//TODO allowMalformed
export function runeCountOf(value: usvstring): int {
  assert(value, "value");
  return [...value].length;
}

//XXX fromSubstrings
//XXX fromSubstringsAsync

//XXX fromRunes
//XXX fromRunesAsync

//TODO allowMalformed
export function toRunes(value: usvstring): IterableIterator<rune, void, void> {
  assert(value, "value");

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

export type ToGraphemesOptions = {
  locale?: string | Intl.Locale;
};

// 分割はIntl.Segmenterに依存する（実行環境によって結果が異なる可能性は排除できない）
//TODO allowMalformed
export function toGraphemes(
  value: string,
  options?: ToGraphemesOptions,
): IterableIterator<grapheme, void, void> {
  assert(value, "value");

  const segmenter = getGraphemeSegmenter(options?.locale);

  return (function* (seg, s) {
    const segements = seg.segment(s);
    for (const segment of segements) {
      yield segment.segment;
    }
  })(segmenter, value);
}

export type ScriptMatchingOptions = {
  excludeScx?: boolean;
  // excludeCommon?: boolean;
  // excludeInherited?: boolean;
};

function _matchingPatternFrom(
  scripts: script[],
  options?: ScriptMatchingOptions,
): string {
  const or = [];
  for (const script of scripts) {
    or.push(`\\p{sc=${script}}`);

    if (options?.excludeScx !== true) {
      or.push(`\\p{scx=${script}}`);
    }

    // Zyyy, Zinh
  }

  return or.join("|");
}

export function isBelongToScripts(
  test: unknown,
  scripts: script[],
  options?: ScriptMatchingOptions,
): test is usvstring {
  for (const script of scripts) {
    assertScript(script, "script");
  }
  if (is(test) !== true) {
    return false;
  }

  const pattern = _matchingPatternFrom(scripts, options);
  try {
    return (new RegExp(`^(?:${pattern})*$`, "v")).test(test);
  } catch {
    //
    throw new RangeError(
      `At least one of \`[${
        scripts.join(", ")
      }]\` is not supported in Unicode property.`,
    );
  }
}
