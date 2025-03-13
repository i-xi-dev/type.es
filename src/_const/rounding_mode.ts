/* : roundingmode */

//XXX TemporalのroundingModeによせる？

export const UP = "up"; // TOWARD_POSITIVE_INFINITY

export const DOWN = "down"; // TOWARD_NEGATIVE_INFINITY

export const TOWARD_ZERO = "toward-zero";

export const AWAY_FROM_ZERO = "away-from-zero";

export const HALF_UP = "half-up";

export const HALF_DOWN = "half-down";

export const HALF_TOWARD_ZERO = "half-toward-zero";

export const HALF_AWAY_FROM_ZERO = "half-away-from-zero";

export const HALF_TO_EVEN = "half-to-even";

/** Alias for `UP`. */
export const CEILING = UP;

/** Alias for `DOWN`. */
export const FLOOR = DOWN;

/** Alias for `TOWARD_ZERO`. */
export const TRUNCATE = TOWARD_ZERO;

/** Alias for `HALF_AWAY_FROM_ZERO`. */
export const ROUND = HALF_AWAY_FROM_ZERO; // Math.roundとは違うので注意（Math.roundは.5の場合切り捨て）

/** Alias for `HALF_TO_EVEN`. */
export const CONVERGENT = HALF_TO_EVEN;
