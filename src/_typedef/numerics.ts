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

/**
 * A closed range of the `number`s.
 */
export type numberrange<T extends number = number> = [min: T, max: T];

/**
 * A closed range of the integers.
 */
export type intrange<T extends int = int> = [min: T, max: T];
