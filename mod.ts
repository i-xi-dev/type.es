import { assertBigInt, isBigInt } from "./src/bigint.ts";
import { assertNumber, assertSafeInteger, isNumber } from "./src/number.ts";
import { assertString, isString } from "./src/string.ts";

export const Type = {
  assertBigInt,
  assertNumber,
  assertSafeInteger,
  assertString,
  isBigInt,
  isNumber,
  isString,
};
