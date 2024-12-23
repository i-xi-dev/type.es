import regionMap from "../../dat/i18n/region_map.json" with { type: "json" };
import { region } from "../_.ts";

type _region = keyof typeof regionMap;

export function is(test: unknown): test is region {
  return Object.keys(regionMap).includes(test as string);
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be an ISO 3166-1 country alpha-2 code.`,
    );
  }
}

export type Properties = {
  /** ISO 3166-1 Alpha-2 code. */
  alpha2: string;

  /** ISO 3166-1 Numeric code. */
  number: number;

  /** ISO 3166-1 Alpha-3 code. */
  alpha3: string;

  /** ISO 3166-1 English name. */
  name: string;
};

export function propertiesOf(region: region): Properties | null {
  if (is(region)) {
    const info = regionMap[region as _region];
    return {
      alpha2: region,
      number: info[0] as number,
      alpha3: info[1] as string,
      name: info[2] as string,
    };
  }

  return null;
}
