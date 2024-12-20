import scriptMap from "../../dat/i18n/script_map.json" with { type: "json" };
import { script } from "../_.ts";

type _script = keyof typeof scriptMap;

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

export type Properties = {
  code: string;
  number: number;
  name: string;
  alias: string;
};

export function propertiesOf(script: script): Properties | null {
  if (is(script)) {
    const info = scriptMap[script as _script];
    return {
      code: script,
      number: info[0] as number,
      name: info[1] as string,
      alias: info[2] as string,
    };
  }

  return null;
}
