import * as Type from "../type/mod.ts";

const _FALLBACK = "en";

let _segmenterRef: WeakRef<Intl.Segmenter> | null = null;

export function segmentGraphemes(
  value: string,
  locale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = _FALLBACK,
): { resolvedLocale: string; segments: Intl.Segments } {
  let segmenter = _segmenterRef?.deref();
  const reuse = segmenter &&
    (segmenter.resolvedOptions().locale ===
      (Type.isString(locale) ? locale : locale.baseName));

  if (reuse !== true) {
    segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
    _segmenterRef = new WeakRef(segmenter);
  }

  return {
    resolvedLocale: segmenter!.resolvedOptions().locale,
    segments: segmenter!.segment(value),
  };
}
