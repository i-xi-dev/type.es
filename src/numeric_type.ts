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
  radix: Radix;
};

const _binaryRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[01]+$/,
  label: "a binary",
  radix: Radix.BINARY,
} as const;

const _decimalRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[0-9]+$/,
  label: "a decimal",
  radix: Radix.DECIMAL,
} as const;

const _hexadecimalRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[0-9a-fA-F]+$/,
  label: "a hexadecimal",
  radix: Radix.HEXADECIMAL,
} as const;

const _octalRadixProperties: RadixProperties = {
  digitsRegex: /^[-+]?[0-7]+$/,
  label: "an octal",
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
