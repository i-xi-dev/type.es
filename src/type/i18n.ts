import _scripts from "../../dat/i18n/script_map.json" with { type: "json" };
import { type script } from "../type.ts";

export function isScript(test: unknown): test is script {
  return Object.keys(_scripts).includes(test as string);
}

export function assertScript(test: unknown, label: string): void {
  if (isScript(test) !== true) {
    throw new TypeError(`\`${label}\` must be a BCP47 script alpha-4 code.`);
  }
}
