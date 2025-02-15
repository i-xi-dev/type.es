import _scripts from "../../dat/i18n/script_map.json" with { type: "json" };
import { assertScript } from "../type/i18n.ts";
import { EMPTY as EMPTY_STRING } from "../const/string.ts";
import { isString } from "../type/string.ts";
import { type script } from "../type.ts";

export type ScriptInfo = {
  /** ISO 15924 Alpha-4 code. */
  alpha4: string;

  /** ISO 15924 Numeric code. */
  number: number;

  /** Localized name. */
  name: string;

  /** UCD alias. */
  pva: string;

  /** Reserved for private use. */
  private: boolean;
};
//XXX dir,type,...

const _NUMBER_INDEX = 0;
const _PVA_INDEX = 1;
const _PRIVATE_INDEX = 2;

export function infoFor(
  script: script,
  nameLocale?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale,
): ScriptInfo {
  assertScript(script, "script");

  const info = _scripts[script];

  return Object.freeze({
    alpha4: script,
    number: info[_NUMBER_INDEX] as number,
    name: getScriptName(script, nameLocale),
    pva: info[_PVA_INDEX] as string,
    private: info[_PRIVATE_INDEX] as boolean,
  });
}

let _scriptNamesRef: WeakRef<Intl.DisplayNames> | null = null;

export function getScriptName(
  script: script,
  nameLocale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = "en",
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
