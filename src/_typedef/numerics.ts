/**
 * A safe-integer.
 */
export type safeint = number;

export type numeric = number | bigint;

export type int = safeint | bigint;

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

type _closed_numeric_range<T> = [min: T, max: T];
type _closed_integer_range<T> = _closed_numeric_range<T>;

export type bigintrange<T extends bigint = bigint> = _closed_integer_range<T>;

export type numberrange<T extends number = number> = _closed_numeric_range<T>;

export type safeintrange<T extends safeint = safeint> = _closed_integer_range<
  T
>;
