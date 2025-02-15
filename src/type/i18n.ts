import _langs from "../../dat/i18n/lang_map.json" with { type: "json" };
import _regions from "../../dat/i18n/region_map.json" with { type: "json" };
import _scripts from "../../dat/i18n/script_map.json" with { type: "json" };
import { type lang, type region, type script } from "../type.ts";

// RFC 5646の言語サブタグは、ISO 639-1 alpha2があればそれ。ISO 639-2 alpha3があればそれ。B/Tが異なる場合Tがそれ。
// よってここでは、is("eng")はfalseとなる
export function isLanguage(test: unknown): test is lang {
  return Object.keys(_langs).includes(test as string);
}

export function assertLanguage(test: unknown, label: string): void {
  if (isLanguage(test) !== true) {
    throw new TypeError(`\`${label}\` must be a BCP47 language code.`);
  }
}

export function isRegion(test: unknown): test is region {
  return Object.keys(_regions).includes(test as string);
}

export function assertRegion(test: unknown, label: string): void {
  if (isRegion(test) !== true) {
    throw new TypeError(`\`${label}\` must be a BCP47 region code.`);
  }
}

export function isScript(test: unknown): test is script {
  return Object.keys(_scripts).includes(test as string);
}

export function assertScript(test: unknown, label: string): void {
  if (isScript(test) !== true) {
    throw new TypeError(`\`${label}\` must be a BCP47 script code.`);
  }
}
