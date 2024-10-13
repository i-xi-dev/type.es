import { assertStrictEquals } from "./deps.ts";
import { Type } from "../mod.ts";

const { isBigInt, isNumber, isString } = Type;

Deno.test("isNumber()", () => {
  assertStrictEquals(isNumber(0), true);
  assertStrictEquals(isNumber(-0), true);
  assertStrictEquals(isNumber(1), true);
  assertStrictEquals(isNumber(-1), true);

  assertStrictEquals(isNumber(-10.1), true);
  assertStrictEquals(isNumber(-9.9), true);
  assertStrictEquals(isNumber(9.9), true);
  assertStrictEquals(isNumber(10.1), true);

  assertStrictEquals(isNumber(0n), false);
  assertStrictEquals(isNumber(-0n), false);
  assertStrictEquals(isNumber(1n), false);
  assertStrictEquals(isNumber(-1n), false);

  assertStrictEquals(isNumber(Number.NaN), true);
  assertStrictEquals(isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(isNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNumber(undefined), false);
  assertStrictEquals(isNumber(null), false);
  assertStrictEquals(isNumber(true), false);
  assertStrictEquals(isNumber(false), false);
  assertStrictEquals(isNumber(""), false);
  assertStrictEquals(isNumber("0"), false);
});

Deno.test("isBigInt()", () => {
  assertStrictEquals(isBigInt(0), false);
  assertStrictEquals(isBigInt(-0), false);
  assertStrictEquals(isBigInt(1), false);
  assertStrictEquals(isBigInt(-1), false);

  assertStrictEquals(isBigInt(-10.1), false);
  assertStrictEquals(isBigInt(-9.9), false);
  assertStrictEquals(isBigInt(9.9), false);
  assertStrictEquals(isBigInt(10.1), false);

  assertStrictEquals(isBigInt(0n), true);
  assertStrictEquals(isBigInt(-0n), true);
  assertStrictEquals(isBigInt(1n), true);
  assertStrictEquals(isBigInt(-1n), true);

  assertStrictEquals(isBigInt(Number.NaN), false);
  assertStrictEquals(isBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isBigInt(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isBigInt(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isBigInt(undefined), false);
  assertStrictEquals(isBigInt(null), false);
  assertStrictEquals(isBigInt(true), false);
  assertStrictEquals(isBigInt(false), false);
  assertStrictEquals(isBigInt(""), false);
  assertStrictEquals(isBigInt("0"), false);
});

Deno.test("isString()", () => {
  assertStrictEquals(isString(0), false);
  assertStrictEquals(isString(0n), false);
  assertStrictEquals(isString(Number.NaN), false);
  assertStrictEquals(isString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isString(undefined), false);
  assertStrictEquals(isString(null), false);
  assertStrictEquals(isString(true), false);
  assertStrictEquals(isString(false), false);
  assertStrictEquals(isString(""), true);
  assertStrictEquals(isString("0"), true);
});
