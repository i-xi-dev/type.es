import * as ExString from "../basics/string/mod.ts";
import * as Type from "../type/mod.ts";
import _regions from "../../dat/i18n/region_map.json" with { type: "json" };
import { type region } from "../_typedef/mod.ts";

export type RegionInfo = {
  /** ISO 3166-1 Alpha-2 code. */
  alpha2: string;

  /** ISO 3166-1 Numeric code. */
  number: number;

  /** ISO 3166-1 Alpha-3 code. */
  alpha3: string;

  /** Localized name. */
  name: string;

  /** User-assigned code. */
  private: boolean;
};
//XXX Administrative languages / Local name

const _NUMBER_INDEX = 0;
const _ALPHA3_INDEX = 1;
const _PRIVATE_INDEX = 2;

export function infoFor(
  region: region,
  nameLocale?: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale,
): RegionInfo {
  Type.assertRegion(region, "region");

  const info = _regions[region];
  const num = info[_NUMBER_INDEX] as number;

  return Object.freeze({
    alpha2: region,
    number: (num <= _NUMBER_INDEX) ? Number.NaN : num,
    alpha3: info[_ALPHA3_INDEX] as string,
    name: _getRegionName(region, nameLocale),
    private: info[_PRIVATE_INDEX] as boolean,
  });
}

let _regionNamesRef: WeakRef<Intl.DisplayNames> | null = null;

export function _getRegionName(
  region: region,
  nameLocale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = "en",
): string {
  let regionNames = _regionNamesRef?.deref();
  const reuse = regionNames &&
    regionNames.resolvedOptions().locale ===
      (Type.isString(nameLocale) ? nameLocale : nameLocale.baseName);

  if (reuse !== true) {
    regionNames = new Intl.DisplayNames(nameLocale, {
      fallback: "none",
      //XXX style,
      type: "region",
    });
    _regionNamesRef = new WeakRef(regionNames);
  }

  return regionNames!.of(region) ?? ExString.EMPTY;
}
