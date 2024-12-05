import { isNonEmpty as isNonEmptyString } from "../basics/string_type.ts";

const _FALLBACK_LOCALE = "en";

function _resolveLocale(locale?: string | Intl.Locale): string | Intl.Locale {
  if (locale instanceof Intl.Locale) {
    return locale;
  } else if (isNonEmptyString(locale)) {
    try {
      void new Intl.Locale(locale);
      return locale;
    } catch {
      //
    }
  }
  return _FALLBACK_LOCALE;
}

let _lastSegmenter: WeakRef<Intl.Segmenter>;

export function getGraphemeSegmenter(
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
