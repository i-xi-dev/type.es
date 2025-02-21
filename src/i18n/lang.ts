import * as ExString from "../basics/string/mod.ts";
import * as Type from "../type/mod.ts";
import _langs from "../../dat/i18n/lang_map.json" with { type: "json" };
import { type lang } from "../type.ts";

export const LanguageScope = {
  COLLECTIVE: "collective",
  INDIVIDUAL: "individual",
  LOCAL: "local",
  MACROLANGUAGE: "macrolanguage",
  SPECIAL: "special",
} as const;

export type LanguageScope = typeof LanguageScope[keyof typeof LanguageScope];

export const LanguageType = {
  CONSTRUCTED: "constructed",
  EXTINCT: "extinct",
  GENETIC: "genetic",
  GENETIC_LIKE: "genetic-like",
  GEOGRAPHIC: "geographic",
  HISTORICAL: "historical",
  LIVING: "living",
  SPECIAL: "special",
  UNASSIGNED: ExString.EMPTY,
} as const;

export type LanguageType = typeof LanguageType[keyof typeof LanguageType];

export type LanguageInfo = {
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

  scope: LanguageScope;

  type: LanguageType;
};
//XXX individuals,...

const _ALPHA2_INDEX = 0;
const _ALPHA3_INDEX = 1;
const _ALPHA3B_INDEX = 2;
const _SCOPE_INDEX = 3;
const _TYPE_INDEX = 4;

export function infoFor(
  language: lang,
  nameLocale?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale,
): LanguageInfo {
  Type.assertLanguage(language, "language");

  const info = _langs[language];

  const alpha2 = info[_ALPHA2_INDEX] as string;
  const alpha3 = info[_ALPHA3_INDEX] as string;
  const alpha3b = info[_ALPHA3B_INDEX] as string;
  const scopeSrc = info[_SCOPE_INDEX] as string;
  const typeSrc = info[_TYPE_INDEX] as string;

  const scope = _scope(scopeSrc);
  const type = _type(typeSrc);

  return Object.freeze({
    alpha2,
    alpha3,
    alpha3b: (alpha3b.length > 0) ? alpha3b : alpha3,
    name: _getLanguageName(language, nameLocale),
    private: (scope === LanguageScope.LOCAL),
    scope,
    type,
  });
}

let _languageNamesRef: WeakRef<Intl.DisplayNames> | null = null;

// `nameLocale`省略時は`language`で良いのでは → getScriptName,getRegionNameと整合性が取れないのでやめる
export function _getLanguageName(
  language: lang,
  nameLocale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = "en",
): string {
  let languageNames = _languageNamesRef?.deref();
  const reuse = languageNames &&
    languageNames.resolvedOptions().locale ===
      (Type.isString(nameLocale) ? nameLocale : nameLocale.baseName);

  if (reuse !== true) {
    languageNames = new Intl.DisplayNames(nameLocale, {
      fallback: "none",
      //XXX languageDisplay,
      //XXX style,
      type: "language",
    });
    _languageNamesRef = new WeakRef(languageNames);
  }

  return languageNames!.of(language) ?? ExString.EMPTY;
}

function _scope(scopeSrc: string): LanguageScope {
  switch (scopeSrc) {
    case "c":
      return LanguageScope.COLLECTIVE;

    case "i":
      return LanguageScope.INDIVIDUAL;

    case "p":
      return LanguageScope.LOCAL;

    case "m":
      return LanguageScope.MACROLANGUAGE;

    case "s":
      return LanguageScope.SPECIAL;

    default:
      throw new Error("`lang_map.json` is broken.");
  }
}

function _type(typeCode: string): LanguageType {
  switch (typeCode) {
    case "c":
      return LanguageType.CONSTRUCTED;

    case "x":
      return LanguageType.EXTINCT;

    case "n":
      return LanguageType.GENETIC;

    case "k":
      return LanguageType.GENETIC_LIKE;

    case "r":
      return LanguageType.GEOGRAPHIC;

    case "h":
      return LanguageType.HISTORICAL;

    case "l":
      return LanguageType.LIVING;

    case "s":
      return LanguageType.SPECIAL;

    default:
      return LanguageType.UNASSIGNED;
  }
}
