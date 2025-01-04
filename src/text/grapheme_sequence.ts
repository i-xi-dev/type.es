import {
  assert as assertRuneSequence,
  is as isRuneString,
} from "./rune_string.ts";
import {
  assert as assertString,
  EMPTY as EMPTY_STRING,
} from "../basics/string_type.ts";
import { grapheme, script, usvstring } from "../_.ts";
import { Script } from "../i18n/script.ts";
import { segmentGraphemes } from "../i18n/utils.ts";

const _NormalizationForms = ["NFC", "NFD", "NFKC", "NFKD"] as const;

type _NormalizationForm = typeof _NormalizationForms[number];

function _scriptsToPattern(
  scripts: Set<script>,
  options?: GraphemeSequence.ScriptOptions,
): string {
  const or = [];
  for (const script of scripts) {
    or.push(`\\p{sc=${script}}`);
    if (options?.excludeScx !== true) {
      or.push(`\\p{scx=${script}}`);
    }
  }
  return or.join("|");
}

function _includesRuneString(
  runeString: usvstring,
  scripts: Set<script>,
  options?: GraphemeSequence.ScriptOptions,
): boolean {
  if (isRuneString(runeString) !== true) {
    return false;
  }

  const pattern = _scriptsToPattern(scripts, options);

  try {
    return (new RegExp(`^(?:${pattern})*$`, "v")).test(runeString);
  } catch {
    throw new RangeError(
      `At least one of \`scripts\` is not supported in Unicode property.`,
    );
  }
}

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
      assertRuneSequence(value, "value");
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

  toString(): string {
    return this.toArray().join(EMPTY_STRING);
  }

  valueOf(): string {
    return this.toString();
  }

  isBelongToScripts(
    scripts: script[] | script,
    options?: GraphemeSequence.ScriptOptions,
  ): boolean {
    const scriptSet = new Set<script>();
    if (
      Array.isArray(scripts) && scripts.every((script) => Script.is(script))
    ) {
      scripts.forEach((script) => scriptSet.add(script));
    } else if (Script.is(scripts)) {
      scriptSet.add(scripts);
    }

    if (scriptSet.size <= 0) {
      return false;
    }

    if (this.#graphemes.length <= 0) {
      // Array#everyなどにあわせた
      return true;
    }

    for (const grapheme of this) {
      if (_includesRuneString(grapheme, scriptSet, options) !== true) {
        return false;
      }
    }

    return true;
  }

  //TODO isBelongToScriptsXxxx
}

export namespace GraphemeSequence {
  export type FromOptions = {
    allowMalformed?: boolean;
    locale?: string | Intl.Locale;
    normalization?: _NormalizationForm;
  };

  export type ScriptOptions = {
    excludeScx?: boolean;
  };
}
