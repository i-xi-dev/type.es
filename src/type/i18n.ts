import _regions from "../../dat/i18n/region_map.json" with { type: "json" };
import _scripts from "../../dat/i18n/script_map.json" with { type: "json" };
import { type region, type script } from "../type.ts";

export function isScript(test: unknown): test is script {
  return Object.keys(_scripts).includes(test as string);
}

export function assertScript(test: unknown, label: string): void {
  if (isScript(test) !== true) {
    throw new TypeError(`\`${label}\` must be a BCP47 script code.`);
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
