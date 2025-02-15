import scriptMap from "../../dat/i18n/script_map.json" with { type: "json" };
import { isNonEmptyString } from "../type/string.ts";
import { isScript } from "../type/i18n.ts";
import { type script } from "../type.ts";

type _script = keyof typeof scriptMap;

export namespace Script {
  export function isUnicodePropertyValue(test: unknown): test is script {
    if (isScript(test)) {
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
}
