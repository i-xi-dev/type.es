export const Radix = {
  BINARY: 2,
  DECIMAL: 10,
  HEXADECIMAL: 16,
  OCTAL: 8,
} as const;

export type Radix = typeof Radix[keyof typeof Radix];

// function _isSupportedRadix(radix?: unknown): radix is Radix {
//   return Object.values(Radix).includes(radix as Radix);
// }

type RadixProperties = {
  digitsRegex: RegExp;
  label: string;
  prefix: string;
  radix: Radix;
};

const _binaryRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[01]+$/,
  label: "a binary",
  prefix: "0b",
  radix: Radix.BINARY,
} as const;

const _decimalRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[0-9]+$/,
  label: "a decimal",
  prefix: "",
  radix: Radix.DECIMAL,
} as const;

const _hexadecimalRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[0-9a-fA-F]+$/,
  label: "a hexadecimal",
  prefix: "0x",
  radix: Radix.HEXADECIMAL,
} as const;

const _octalRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[0-7]+$/,
  label: "an octal",
  prefix: "0o",
  radix: Radix.OCTAL,
} as const;

export function radixPropertiesOf(radix?: Radix): RadixProperties {
  switch (radix) {
    case Radix.BINARY:
      return _binaryRadixProperties;

    case Radix.HEXADECIMAL:
      return _hexadecimalRadixProperties;

    case Radix.OCTAL:
      return _octalRadixProperties;

    default: // case Radix.DECIMAL:
      return _decimalRadixProperties;
  }
}

const UP = "up"; // TOWARD_POSITIVE_INFINITY
const DOWN = "down"; // TOWARD_NEGATIVE_INFINITY
const TOWARD_ZERO = "toward-zero";
const HALF_AWAY_FROM_ZERO = "half-away-from-zero";
const HALF_TO_EVEN = "half-to-even";

export const RoundingMode = {
  UP,
  DOWN,
  TOWARD_ZERO,
  AWAY_FROM_ZERO: "away-from-zero",
  HALF_UP: "half-up",
  HALF_DOWN: "half-down",
  HALF_TOWARD_ZERO: "half-toward-zero",
  HALF_AWAY_FROM_ZERO,
  HALF_TO_EVEN,

  /** Alias for `UP`. */
  CEILING: UP,

  /** Alias for `DOWN`. */
  FLOOR: DOWN,

  /** Alias for `TOWARD_ZERO`. */
  TRUNCATE: TOWARD_ZERO,

  /** Alias for `HALF_AWAY_FROM_ZERO`. */
  ROUND: HALF_AWAY_FROM_ZERO, // Math.roundとは違うので注意（Math.roundは.5の場合切り捨て）

  /** Alias for `HALF_TO_EVEN`. */
  CONVERGENT: HALF_TO_EVEN,
} as const;

export type RoundingMode = typeof RoundingMode[keyof typeof RoundingMode];

export const OverflowMode = {
  EXCEPTION: "exception",
  TRUNCATE: "truncate",
  SATURATE: "saturate",
} as const;

export type OverflowMode = typeof OverflowMode[keyof typeof OverflowMode];

export type FromStringOptions = {
  radix?: Radix;
};

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: Radix;
};

//XXX Integer.FromNumberOptions or IntegerFromNumberOptions
export type FromNumberOptions = {
  roundingMode?: RoundingMode;
};
