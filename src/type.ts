import _gcs from "../dat/unicode/gc_map.ts";
import _langs from "../dat/i18n/lang_map.json" with { type: "json" };
import _regions from "../dat/i18n/region_map.json" with { type: "json" };
import _scripts from "../dat/i18n/script_map.json" with { type: "json" };

export type byteorder = "big-endian" | "little-endian";

/**
 * String matching regular expression `/^[\u0000-\uFFFF]{1}$/`.
 * including surrogates.
 */
export type char = string;

/**
 * An Unicode General_Category value.
 */
export type gc = typeof _gcs[keyof typeof _gcs];

export type int = safeint | bigint;

/**
 * A BCP47 language code.
 * (ISO 639 language alpha-2 code if alpha-2 code is exist, or alpha-3(T) code if alpha-2 code is not exist)
 */
export type lang = keyof typeof _langs;

export type numeric = number | bigint;

// 2,8,10,16にしているのはstringからbigintへのパースが面倒になるからというだけ
export type radix = 2 | 8 | 10 | 16;

/**
 * A BCP47 region code.
 * (ISO 3166-1 country alpha-2 code)
 */
export type region = keyof typeof _regions;

export type roundingmode =
  | "away-from-zero"
  | "down"
  | "half-away-from-zero"
  | "half-down"
  | "half-to-even"
  | "half-toward-zero"
  | "half-up"
  | "toward-zero"
  | "up";

/**
 * A safe-integer.
 */
export type safeint = number;

/**
 * A BCP47 script code.
 * (ISO 15924 script alpha-4 code)
 */
export type script = keyof typeof _scripts;

export type ArrayOrSet<T> = Array<T> | Set<T>;

type _closed_numeric_range<T> = [min: T, max: T];
type _closed_integer_range<T> = _closed_numeric_range<T>;

export type bigintrange<T extends bigint = bigint> = _closed_integer_range<T>;

export type numberrange<T extends number = number> = _closed_numeric_range<T>;

export type safeintrange<T extends safeint = safeint> = _closed_integer_range<
  T
>;
