import regionMap from "../../dat/i18n/region_map.json" with { type: "json" };
import { getRegionName } from "./utils.ts";
import { type region } from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

type _region = keyof typeof regionMap;

export type Region = {
  /** ISO 3166-1 Alpha-2 code. */
  alpha2: string;

  /** ISO 3166-1 Numeric code. */
  number: number;

  /** ISO 3166-1 Alpha-3 code. */
  alpha3: string;

  /** Localized name. */
  name: string;

  /** User-assigned code */
  private: boolean;
};
//XXX Administrative languages / Local name

export namespace Region {
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

  export function of(
    region: region,
    nameLocale?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale,
  ): Region | null {
    if (is(region)) {
      const info = regionMap[region as _region];
      const num = info[NUMBER_ZERO] as number;

      return Object.freeze({
        alpha2: region,
        number: (num <= NUMBER_ZERO) ? Number.NaN : num,
        alpha3: info[1] as string,
        name: getRegionName(region, nameLocale),
        private: info[2] as boolean,
      });
    }

    return null;
  }
}
