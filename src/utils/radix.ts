import { EMPTY as EMPTY_STRING } from "./string.ts";

// 2,8,10,16にしているのはstringからbigintへのパースが面倒になるからというだけ
const _radix = [2, 8, 10, 16] as const;

export type radix = typeof _radix[number];

function _isSupportedRadix(test: unknown): test is radix {
  return _radix.includes(test as radix);
}

function _assertSupportedRadix(test: unknown, label: string): void {
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
  _assertSupportedRadix(radix, "radix");

  let signPattern = EMPTY_STRING;
  if (options?.includesSign) {
    signPattern = "[-+]?";
  }

  // 2-36でなく2|8|10|16なので算出せずに固定値を返す
  let digitsPattern = EMPTY_STRING;
  switch (radix) {
    case 2:
      digitsPattern = "[01]+";
      break;
    case 8:
      digitsPattern = "[0-7]+";
      break;
    case 10:
      digitsPattern = "[0-9]+";
      break;
    case 16:
      digitsPattern = "[0-9a-fA-F]+";
      break;
  }

  return `^${signPattern}${digitsPattern}$`;
}

/*
TODO


*/

export type Radix = {
  prefix: string;
  radix: radix;
};

export namespace Radix {
  export const BINARY: Radix = {
    prefix: "0b",
    radix: 2,
  } as const;

  export const OCTAL: Radix = {
    prefix: "0o",
    radix: 8,
  } as const;

  export const DECIMAL: Radix = {
    prefix: EMPTY_STRING,
    radix: 10,
  } as const;

  export const HEXADECIMAL: Radix = {
    prefix: "0x",
    radix: 16,
  } as const;

  export function from(radix?: radix): Radix {
    switch (radix) {
      // case 10:
      //   return DECIMAL;
      case 16:
        return HEXADECIMAL;
      case 2:
        return BINARY;
      case 8:
        return OCTAL;
      default:
        // throw new TypeError("");
        return DECIMAL;
    }
  }
}
