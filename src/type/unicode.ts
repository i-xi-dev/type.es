import _gcs from "../../dat/unicode/gc_map.ts";
import _scripts from "../../dat/i18n/script_map.json" with { type: "json" };
import { type gc, type script } from "../_typedef/mod.ts";
import { isNonEmptyString } from "./string.ts";

export function isUnicodeGeneralCategory(test: unknown): test is gc {
  return Object.values(_gcs).includes(test as gc);
}

export function assertUnicodeGeneralCategory(
  test: unknown,
  label: string,
): void {
  if (isUnicodeGeneralCategory(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be an Unicode \`General_Category\` value.`,
    );
  }
}

const _PVA_INDEX = 1;

export function isUnicodeScript(test: unknown): test is script {
  if (isNonEmptyString(test)) {
    const info = _scripts[test as script];
    return info ? isNonEmptyString(info[_PVA_INDEX]) : false;
  }
  return false;
}

export function assertUnicodeScript(test: unknown, label: string): void {
  if (isUnicodeScript(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a supported script in Unicode property.`,
    );
  }
}
