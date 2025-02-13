import { EMPTY as EMPTY_STRING } from "../const/string.ts";
import languageMap from "../../dat/i18n/language_map.json" with {
  type: "json",
};
import { getLanguageName } from "./utils.ts";
import { type language } from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

type _lang = keyof typeof languageMap;

export type Language = {
  /** ISO 639 Set-1 Alpha-2 code. */
  alpha2: string;

  /** ISO 639 Set-2(T)/3/5 Alpha-3 code. */
  alpha3: string;

  /** ISO 639 Set-2(B) Alpha-3 code. */
  alpha3b: string;

  /** Localized name. */
  name: string;

  /** Reserved for local use */
  private: boolean;

  scope: Language.Scope;

  type: Language.Type;
};
//XXX individuals,...

const _Scope = {
  COLLECTIVE: "collective",
  INDIVIDUAL: "individual",
  LOCAL: "local",
  MACROLANGUAGE: "macrolanguage",
  SPECIAL: "special",
} as const;

function _scope(scopeCode: string): Language.Scope {
  switch (scopeCode) {
    case "c":
      return _Scope.COLLECTIVE;

    case "i":
      return _Scope.INDIVIDUAL;

    case "p":
      return _Scope.LOCAL;

    case "m":
      return _Scope.MACROLANGUAGE;

    case "s":
      return _Scope.SPECIAL;

    default:
      throw new Error("`language_map.json` is broken.");
  }
}

const _Type = {
  CONSTRUCTED: "constructed",
  EXTINCT: "extinct",
  GENETIC: "genetic",
  GENETIC_LIKE: "genetic-like",
  GEOGRAPHIC: "geographic",
  HISTORICAL: "historical",
  LIVING: "living",
  SPECIAL: "special",
  UNASSIGNED: EMPTY_STRING,
} as const;

function _type(typeCode: string): Language.Type {
  switch (typeCode) {
    case "c":
      return _Type.CONSTRUCTED;

    case "x":
      return _Type.EXTINCT;

    case "n":
      return _Type.GENETIC;

    case "k":
      return _Type.GENETIC_LIKE;

    case "r":
      return _Type.GEOGRAPHIC;

    case "h":
      return _Type.HISTORICAL;

    case "l":
      return _Type.LIVING;

    case "s":
      return _Type.SPECIAL;

    default:
      return _Type.UNASSIGNED;
  }
}

export namespace Language {
  // RFC 5646の言語サブタグであるか否か
  export function is(test: unknown): test is language {
    // RFC 5646の言語サブタグは、ISO 639-1 alpha2があればそれ。ISO 639-2 alpha3があればそれ。B/Tが異なる場合Tがそれ。
    // よってここでは、is("eng")はfalseとなる
    return Object.keys(languageMap).includes(test as string);
  }

  export function assert(test: unknown, label: string): void {
    if (is(test) !== true) {
      throw new TypeError(
        `\`${label}\` must be an ISO 639-1 language alpha-2 code or ISO 639-2 language alpha-3 code.`,
      );
    }
  }

  export type Scope = typeof _Scope[keyof typeof _Scope];

  export type Type = typeof _Type[keyof typeof _Type];

  export function of(language: language): Language | null {
    if (is(language)) {
      const info = languageMap[language as _lang];
      const alpha3 = info[1] as string;
      const alpha3b = info[2] as string;
      const scopeCode = info[3] as string;
      const typeCode = info[4] as string;

      return Object.freeze({
        alpha2: info[NUMBER_ZERO] as string,
        alpha3,
        alpha3b: (alpha3b.length > NUMBER_ZERO) ? alpha3b : alpha3,
        name: getLanguageName(language),
        private: (scopeCode === "p"),
        scope: _scope(scopeCode),
        type: _type(typeCode),
      });
    }

    return null;
  }
}
