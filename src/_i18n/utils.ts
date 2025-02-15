import { EMPTY as EMPTY_STRING } from "../const/string.ts";
import { type lang } from "../type.ts";
import { isString } from "../type/string.ts";

const _FALLBACK = "en";

let _languageNamesRef: WeakRef<Intl.DisplayNames> | null = null;

// `nameLocale`省略時は`language`で良いのでは → getScriptName,getRegionNameと整合性が取れないのでやめる
export function getLanguageName(
  language: lang,
  nameLocale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = _FALLBACK,
): string {
  let languageNames = _languageNamesRef?.deref();
  const reuse = languageNames &&
    languageNames.resolvedOptions().locale ===
      (isString(nameLocale) ? nameLocale : nameLocale.baseName);

  if (reuse !== true) {
    languageNames = new Intl.DisplayNames(nameLocale, {
      fallback: "none",
      //XXX languageDisplay,
      //XXX style,
      type: "language",
    });
    _languageNamesRef = new WeakRef(languageNames);
  }

  return languageNames!.of(language) ?? EMPTY_STRING;
}

let _segmenterRef: WeakRef<Intl.Segmenter> | null = null;

export function segmentGraphemes(
  value: string,
  locale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = _FALLBACK,
): { resolvedLocale: string; segments: Intl.Segments } {
  let segmenter = _segmenterRef?.deref();
  const reuse = segmenter &&
    (segmenter.resolvedOptions().locale ===
      (isString(locale) ? locale : locale.baseName));

  if (reuse !== true) {
    segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
    _segmenterRef = new WeakRef(segmenter);
  }

  return {
    resolvedLocale: segmenter!.resolvedOptions().locale,
    segments: segmenter!.segment(value),
  };
}
