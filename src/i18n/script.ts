import scriptMap from "../../dat/i18n/script_map.json" with { type: "json" };
import { script } from "../_.ts";

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
