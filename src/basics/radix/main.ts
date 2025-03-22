import * as ExString from "../string/mod.ts";
import * as Radix from "../../_const/radix.ts";
import { type radix } from "../../_typedef/mod.ts";

const { EMPTY } = ExString;

const _supportedRadixes = [
  Radix.BINARY,
  Radix.OCTAL,
  Radix.DECIMAL,
  Radix.HEXADECIMAL,
] as const;

function _isSupportedRadix(test: unknown): test is radix {
  return _supportedRadixes.includes(test as radix);
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

  let signPattern = EMPTY;
  if (options?.includesSign) {
    signPattern = "[-+]?";
  }

  // 2-36でなく2|8|10|16なので算出せずに固定値を返す
  let digitsPattern = EMPTY;
  switch (radix) {
    case Radix.BINARY:
      digitsPattern = "[01]+";
      break;
    case Radix.OCTAL:
      digitsPattern = "[0-7]+";
      break;
    case Radix.DECIMAL:
      digitsPattern = "[0-9]+";
      break;
    case Radix.HEXADECIMAL:
      digitsPattern = "[0-9a-fA-F]+";
      break;
  }

  return `^${signPattern}${digitsPattern}$`;
}

export function prefixOf(radix: radix): string {
  assertSupportedRadix(radix, "radix");

  switch (radix) {
    case Radix.BINARY:
      return "0b";
    case Radix.OCTAL:
      return "0o";
    // case Radix.DECIMAL:
    //   return EMPTY;
    case Radix.HEXADECIMAL:
      return "0x";
    default:
      return EMPTY;
  }
}
