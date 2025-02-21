export type byteorder = "big-endian" | "little-endian";

/**
 * String matching regular expression `/^[\u0000-\uFFFF]{1}$/`.
 * including surrogates.
 */
export type char = string;

export type int = safeint | bigint;

export type numeric = number | bigint;

// 2,8,10,16にしているのはstringからbigintへのパースが面倒になるからというだけ
export type radix = 2 | 8 | 10 | 16;

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

export type ArrayOrSet<T> = Array<T> | Set<T>;

type _closed_numeric_range<T> = [min: T, max: T];
type _closed_integer_range<T> = _closed_numeric_range<T>;

export type bigintrange<T extends bigint = bigint> = _closed_integer_range<T>;

export type numberrange<T extends number = number> = _closed_numeric_range<T>;

export type safeintrange<T extends safeint = safeint> = _closed_integer_range<
  T
>;
