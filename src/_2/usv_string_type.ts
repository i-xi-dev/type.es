import { assertCodePoint } from "./code_point_type.ts";
import { assertIterable as assertIterableObject } from "../_0/object_type.ts";
import { codepoint, grapheme, int, rune, usvstring } from "../_.ts";
import {
  EMPTY,
  isNonEmpty as isNonEmptyString,
  isString,
} from "../_0/string_type.ts";

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

let _lastSegmenter: WeakRef<Intl.Segmenter>;

function _resolveLocale(locale?: string | Intl.Locale): string | Intl.Locale {
  if (isNonEmptyString(locale)) {
    return locale;
  } else if (locale instanceof Intl.Locale) {
    return locale;
  }
  return "en";
}

function _getGraphemeSegmenter(
  localeSource?: string | Intl.Locale,
): Intl.Segmenter {
  const locale = _resolveLocale(localeSource);
  const localeName = (locale instanceof Intl.Locale) ? locale.baseName : locale;

  const prev = _lastSegmenter?.deref();
  if (prev && (prev.resolvedOptions().locale === localeName)) {
    return prev;
  }

  const segmenter = new Intl.Segmenter(localeName, { granularity: "grapheme" });
  const resolvedLocale = segmenter.resolvedOptions().locale;

  if (localeName !== resolvedLocale) {
    //XXX 上位の構成要素がマッチしてればokにする？
    throw new RangeError("`locale` is an unsupported locale at runtime.");
  } //XXX 再現条件未調査:Intlのパーサが"jp"をregion扱いしないバグがある？ので日本語関係はエラーになる確率が高い

  _lastSegmenter = new WeakRef(segmenter);

  return segmenter;
}

export type ToGraphemesOptions = {
  locale?: string | Intl.Locale;
};

// 分割はIntl.Segmenterに依存する（実行環境によって結果が異なる可能性は排除できない）
export function toGraphemes(
  value: string,
  options?: ToGraphemesOptions,
): IterableIterator<grapheme, void, void> {
  assertUsvString(value, "value");

  const segmenter = _getGraphemeSegmenter(options?.locale);

  return (function* (seg, s) {
    const segements = seg.segment(s);
    for (const segment of segements) {
      yield segment.segment;
    }
  })(segmenter, value);
}
