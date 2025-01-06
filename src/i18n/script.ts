import scriptMap from "../../dat/i18n/script_map.json" with { type: "json" };
import { getScriptName } from "./utils.ts";
import { isNonEmpty as isNonEmptyString } from "../basics/string_type.ts";
import { script } from "../_.ts";

type _script = keyof typeof scriptMap;

export type Script = {
  /** ISO 15924 Alpha-4 code. */
  alpha4: string;

  /** ISO 15924 Numeric code. */
  number: number;

  /** Localized name. */
  name: string;

  /** UCD alias. */
  pva: string;

  /** Reserved for private use */
  private: boolean;
};
//XXX dir,type,...

export namespace Script {
  export function is(test: unknown): test is script {
    return Object.keys(scriptMap).includes(test as string);
  }

  export function assert(test: unknown, label: string): void {
    if (is(test) !== true) {
      throw new TypeError(
        `\`${label}\` must be an ISO 15924 script alpha-4 code.`,
      );
    }
  }

  export function isUnicodePropertyValue(test: unknown): test is script {
    if (is(test)) {
      const info = scriptMap[test as _script];
      return isNonEmptyString(info[1]);
    }
    return false;
  }

  export function assertUnicodePropertyValue(
    test: unknown,
    label: string,
  ): void {
    if (isUnicodePropertyValue(test) !== true) {
      throw new TypeError(
        `\`${label}\` is not supported in Unicode property.`,
      );
    }
  }

  export function of(
    script: script,
    nameLocale?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale,
  ): Script | null {
    if (is(script)) {
      const info = scriptMap[script as _script];

      return Object.freeze({
        alpha4: script,
        number: info[0] as number,
        name: getScriptName(script, nameLocale),
        pva: info[1] as string,
        private: info[2] as boolean,
      });
    }

    return null;
  }
}
