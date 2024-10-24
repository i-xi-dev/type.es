import { isString } from "./string_type.ts";

export const Radix = {
  BINARY: 2,
  DECIMAL: 10,
  HEXADECIMAL: 16,
  OCTAL: 8,
} as const;

export type Radix = typeof Radix[keyof typeof Radix];

const _INTEGER_REGEX: Record<Radix, RegExp> = {
  [Radix.BINARY]: /^[-+]?[01]+$/,
  [Radix.DECIMAL]: /^[-+]?[0-9]+$/,
  [Radix.HEXADECIMAL]: /^[-+]?[0-9a-fA-F]+$/,
  [Radix.OCTAL]: /^[-+]?[0-7]+$/,
} as const;

function _isSupportedRadix(radix?: unknown): radix is Radix {
  return Object.values(Radix).includes(radix as Radix);
}

const _RADIX_LABEL: Record<Radix, string> = {
  [Radix.BINARY]: "a binary",
  [Radix.OCTAL]: "an octal",
  [Radix.DECIMAL]: "a decimal",
  [Radix.HEXADECIMAL]: "a hexadecimal",
} as const;

function _labelOfRadix(radix?: unknown): string {
  return _isSupportedRadix(radix)
    ? _RADIX_LABEL[radix]
    : _RADIX_LABEL[Radix.DECIMAL];
}

//TODO integerTypeに移す
export function isStringified(
  test: unknown,
  radix?: Radix,
): test is string {
  const regex = _isSupportedRadix(radix)
    ? _INTEGER_REGEX[radix]
    : _INTEGER_REGEX[Radix.DECIMAL];
  return isString(test) && regex.test(test);
}

//TODO integerTypeに移す
export function assertStringified(
  test: unknown,
  label: string,
  radix?: Radix,
): void {
  if (isStringified(test, radix) !== true) {
    throw new TypeError(
      `\`${label}\` must be a ${
        _labelOfRadix(radix)
      } representation of an integer.`,
    );
  }
}
