import { EMPTY as EMPTY_STRING } from "../const/string.ts";

export const BINARY = 2;

export const OCTAL = 8;

export const DECIMAL = 10;

export const HEXADECIMAL = 16;

// 2,8,10,16にしているのはstringからbigintへのパースが面倒になるからというだけ
const _radix = [BINARY, OCTAL, DECIMAL, HEXADECIMAL] as const;

export type radix = typeof _radix[number];

function _isSupportedRadix(test: unknown): test is radix {
  return _radix.includes(test as radix);
}

export function assertSupportedRadix(test: unknown, label: string): void {
  if (_isSupportedRadix(test) !== true) {
    throw new TypeError(`\`${label}\` must be 2, 8, 10 or 16.`);
  }
}

export type PatternOptions = {
  //XXX allowedSigns?: Array<string>; default ["-", "+"]
  //XXX case?: "upperCase" | "lowerCase" | "ignore",
  includesSign?: boolean;
};

export function integerPatternOf(
  radix: radix,
  options?: PatternOptions,
): string {
  assertSupportedRadix(radix, "radix");

  let signPattern = EMPTY_STRING;
  if (options?.includesSign) {
    signPattern = "[-+]?";
  }

  // 2-36でなく2|8|10|16なので算出せずに固定値を返す
  let digitsPattern = EMPTY_STRING;
  switch (radix) {
    case BINARY:
      digitsPattern = "[01]+";
      break;
    case OCTAL:
      digitsPattern = "[0-7]+";
      break;
    case DECIMAL:
      digitsPattern = "[0-9]+";
      break;
    case HEXADECIMAL:
      digitsPattern = "[0-9a-fA-F]+";
      break;
  }

  return `^${signPattern}${digitsPattern}$`;
}

export function prefixOf(radix: radix): string {
  assertSupportedRadix(radix, "radix");

  switch (radix) {
    case BINARY:
      return "0b";
    case OCTAL:
      return "0o";
    // case DECIMAL:
    //   return EMPTY_STRING;
    case HEXADECIMAL:
      return "0x";
    default:
      return EMPTY_STRING;
  }
}
