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
 * A closed range of the `bigint`s.
 */
export type bigintrange = [min: bigint, max: bigint];

/**
 * A closed range of the `number`s.
 */
export type numberrange = [min: number, max: number];

/**
 * A closed range of the safe integers.
 */
export type safeintrange = [min: safeint, max: safeint];
