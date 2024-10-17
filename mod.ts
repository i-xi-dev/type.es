import { assertBigInt, isBigInt } from "./src/bigint.ts";
import { assertNumber, assertSafeInteger, isNumber } from "./src/number.ts";
import {
  assertChar,
  assertRune,
  assertString,
  isChar,
  isRune,
  isString,
} from "./src/string.ts";

export const Type = {
  assertBigInt,
  assertChar,
  assertNumber,
  assertRune,
  assertSafeInteger,
  assertString,
  isBigInt,
  isChar,
  isNumber,
  isRune,
  isString,
};
