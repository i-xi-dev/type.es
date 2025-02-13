import { assertString, assertUSVString } from "../type/string.ts";
import { EMPTY as EMPTY_STRING } from "../const/string.ts";
import { type grapheme } from "../type.ts";
import { segmentGraphemes } from "../_i18n/utils.ts";

const _NormalizationForms = ["NFC", "NFD", "NFKC", "NFKD"] as const;

type _NormalizationForm = typeof _NormalizationForms[number];

export class GraphemeSequence {
  readonly #locale: Intl.Locale;
  readonly #graphemes: grapheme[];

  private constructor(locale: Intl.Locale, graphemes: Intl.Segments) {
    this.#locale = locale;
    this.#graphemes = [...graphemes].map((grapheme) => grapheme.segment);
  }

  get locale(): Intl.Locale {
    return this.#locale;
  }

  get count(): number {
    return this.#graphemes.length;
  }

  // 分割はIntl.Segmenterに依存する
  // 孤立サロゲートは1書記素クラスターあつかいになるようだ
  static fromString(
    value: string,
    options?: GraphemeSequence.FromOptions,
  ): GraphemeSequence {
    if (options?.allowMalformed === true) {
      assertString(value, "value");
    } else {
      assertUSVString(value, "value");
    }

    let normalized = value;
    if (
      _NormalizationForms.includes(options?.normalization as _NormalizationForm)
    ) {
      normalized = normalized.normalize(options?.normalization);
    }

    const { resolvedLocale, segments } = segmentGraphemes(
      normalized,
      options?.locale,
    );
    const locale = new Intl.Locale(resolvedLocale);
    return new this(locale, segments);
  }

  [Symbol.iterator](): IterableIterator<grapheme> {
    return this.toArray()[Symbol.iterator]();
  }

  toArray(): grapheme[] {
    return [...this.#graphemes];
  }

  toString(): grapheme {
    return this.toArray().join(EMPTY_STRING);
  }

  valueOf(): grapheme {
    return this.toString();
  }
}

export namespace GraphemeSequence {
  export type FromOptions = {
    allowMalformed?: boolean;
    locale?: string | Intl.Locale;
    normalization?: _NormalizationForm;
  };
}
