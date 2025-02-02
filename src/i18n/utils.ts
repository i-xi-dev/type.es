import { EMPTY as EMPTY_STRING } from "../type/sp/string.ts";
import { language, region, script } from "../_.ts";
import { isString } from "../type/string.ts";

const _FALLBACK = "en";

let _languageNamesRef: WeakRef<Intl.DisplayNames> | null = null;

// `nameLocale`省略時は`language`で良いのでは → getScriptName,getRegionNameと整合性が取れないのでやめる
export function getLanguageName(
  language: language,
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

let _scriptNamesRef: WeakRef<Intl.DisplayNames> | null = null;

export function getScriptName(
  script: script,
  nameLocale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = _FALLBACK,
): string {
  let scriptNames = _scriptNamesRef?.deref();
  const reuse = scriptNames &&
    scriptNames.resolvedOptions().locale ===
      (isString(nameLocale) ? nameLocale : nameLocale.baseName);

  if (reuse !== true) {
    scriptNames = new Intl.DisplayNames(nameLocale, {
      fallback: "none",
      //XXX style,
      type: "script",
    });
    _scriptNamesRef = new WeakRef(scriptNames);
  }

  return scriptNames!.of(script) ?? EMPTY_STRING;
}

let _regionNamesRef: WeakRef<Intl.DisplayNames> | null = null;

export function getRegionName(
  region: region,
  nameLocale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = _FALLBACK,
): string {
  let regionNames = _regionNamesRef?.deref();
  const reuse = regionNames &&
    regionNames.resolvedOptions().locale ===
      (isString(nameLocale) ? nameLocale : nameLocale.baseName);

  if (reuse !== true) {
    regionNames = new Intl.DisplayNames(nameLocale, {
      fallback: "none",
      //XXX style,
      type: "region",
    });
    _regionNamesRef = new WeakRef(regionNames);
  }

  return regionNames!.of(region) ?? EMPTY_STRING;
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
