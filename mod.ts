import { assertBigInt, isBigInt } from "./src/bigint.ts";
import { assertNumber, assertSafeInteger, isNumber } from "./src/number.ts";
import { assertChar, assertString, isChar, isString } from "./src/string.ts";

export const Type = {
  assertBigInt,
  assertChar,
  assertNumber,
  assertSafeInteger,
  assertString,
  isBigInt,
  isChar,
  isNumber,
  isString,
};
