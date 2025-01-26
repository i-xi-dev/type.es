import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isObject()", () => {
  assertStrictEquals(Type.isObject({}), true);
  assertStrictEquals(Type.isObject(null), true);
  assertStrictEquals(Type.isObject(undefined), false);
  assertStrictEquals(Type.isObject([]), true);
  assertStrictEquals(Type.isObject(new Error()), true);
  assertStrictEquals(Type.isObject(""), false);
  assertStrictEquals(Type.isObject(1), false);
  assertStrictEquals(Type.isObject(true), false);
  assertStrictEquals(Type.isObject(false), false);
});

Deno.test("Type.isNonNullObject()", () => {
  assertStrictEquals(Type.isNonNullObject({}), true);
  assertStrictEquals(Type.isNonNullObject(null), false);
  assertStrictEquals(Type.isNonNullObject(undefined), false);
  assertStrictEquals(Type.isNonNullObject([]), true);
  assertStrictEquals(Type.isNonNullObject(new Error()), true);
  assertStrictEquals(Type.isNonNullObject(""), false);
  assertStrictEquals(Type.isNonNullObject(1), false);
  assertStrictEquals(Type.isNonNullObject(true), false);
  assertStrictEquals(Type.isNonNullObject(false), false);
});

Deno.test("Type.isNull()", () => {
  assertStrictEquals(Type.isNull({}), false);
  assertStrictEquals(Type.isNull(null), true);
  assertStrictEquals(Type.isNull(undefined), false);
  assertStrictEquals(Type.isNull([]), false);
  assertStrictEquals(Type.isNull(new Error()), false);
  assertStrictEquals(Type.isNull(""), false);
  assertStrictEquals(Type.isNull(1), false);
  assertStrictEquals(Type.isNull(true), false);
  assertStrictEquals(Type.isNull(false), false);
});

Deno.test("Type.isNullOrUndefined()", () => {
  assertStrictEquals(Type.isNullOrUndefined({}), false);
  assertStrictEquals(Type.isNullOrUndefined(null), true);
  assertStrictEquals(Type.isNullOrUndefined(undefined), true);
  assertStrictEquals(Type.isNullOrUndefined([]), false);
  assertStrictEquals(Type.isNullOrUndefined(new Error()), false);
  assertStrictEquals(Type.isNullOrUndefined(""), false);
  assertStrictEquals(Type.isNullOrUndefined(1), false);
  assertStrictEquals(Type.isNullOrUndefined(true), false);
  assertStrictEquals(Type.isNullOrUndefined(false), false);
});

Deno.test("Type.isBoolean()", () => {
  assertStrictEquals(Type.isBoolean({}), false);
  assertStrictEquals(Type.isBoolean(null), false);
  assertStrictEquals(Type.isBoolean(undefined), false);
  assertStrictEquals(Type.isBoolean([]), false);
  assertStrictEquals(Type.isBoolean(new Error()), false);
  assertStrictEquals(Type.isBoolean(""), false);
  assertStrictEquals(Type.isBoolean(1), false);
  assertStrictEquals(Type.isBoolean(true), true);
  assertStrictEquals(Type.isBoolean(false), true);
});

Deno.test("Type.isTrue()", () => {
  assertStrictEquals(Type.isTrue({}), false);
  assertStrictEquals(Type.isTrue(null), false);
  assertStrictEquals(Type.isTrue(undefined), false);
  assertStrictEquals(Type.isTrue([]), false);
  assertStrictEquals(Type.isTrue(new Error()), false);
  assertStrictEquals(Type.isTrue(""), false);
  assertStrictEquals(Type.isTrue(1), false);
  assertStrictEquals(Type.isTrue(true), true);
  assertStrictEquals(Type.isTrue(false), false);
});

Deno.test("Type.isFalse()", () => {
  assertStrictEquals(Type.isFalse({}), false);
  assertStrictEquals(Type.isFalse(null), false);
  assertStrictEquals(Type.isFalse(undefined), false);
  assertStrictEquals(Type.isFalse([]), false);
  assertStrictEquals(Type.isFalse(new Error()), false);
  assertStrictEquals(Type.isFalse(""), false);
  assertStrictEquals(Type.isFalse(1), false);
  assertStrictEquals(Type.isFalse(true), false);
  assertStrictEquals(Type.isFalse(false), true);
});

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("Type.isBigInt()", () => {
  assertStrictEquals(Type.isBigInt(0), false);
  assertStrictEquals(Type.isBigInt(-0), false);
  assertStrictEquals(Type.isBigInt(1), false);
  assertStrictEquals(Type.isBigInt(-1), false);

  assertStrictEquals(Type.isBigInt(-10.1), false);
  assertStrictEquals(Type.isBigInt(-9.9), false);
  assertStrictEquals(Type.isBigInt(9.9), false);
  assertStrictEquals(Type.isBigInt(10.1), false);

  assertStrictEquals(Type.isBigInt(0n), true);
  assertStrictEquals(Type.isBigInt(-0n), true);
  assertStrictEquals(Type.isBigInt(1n), true);
  assertStrictEquals(Type.isBigInt(-1n), true);

  assertStrictEquals(Type.isBigInt(Number.NaN), false);
  assertStrictEquals(Type.isBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isBigInt(SIMAX), false);
  assertStrictEquals(Type.isBigInt(SIMIN), false);
  assertStrictEquals(Type.isBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isBigInt(undefined), false);
  assertStrictEquals(Type.isBigInt(null), false);
  assertStrictEquals(Type.isBigInt(true), false);
  assertStrictEquals(Type.isBigInt(false), false);
  assertStrictEquals(Type.isBigInt(""), false);
  assertStrictEquals(Type.isBigInt("0"), false);
});

Deno.test("Type.isPositiveBigInt()", () => {
  assertStrictEquals(Type.isPositiveBigInt(0), false);
  assertStrictEquals(Type.isPositiveBigInt(-0), false);
  assertStrictEquals(Type.isPositiveBigInt(1), false);
  assertStrictEquals(Type.isPositiveBigInt(-1), false);

  assertStrictEquals(Type.isPositiveBigInt(-10.1), false);
  assertStrictEquals(Type.isPositiveBigInt(-9.9), false);
  assertStrictEquals(Type.isPositiveBigInt(9.9), false);
  assertStrictEquals(Type.isPositiveBigInt(10.1), false);

  assertStrictEquals(Type.isPositiveBigInt(0n), false);
  assertStrictEquals(Type.isPositiveBigInt(-0n), false);
  assertStrictEquals(Type.isPositiveBigInt(1n), true);
  assertStrictEquals(Type.isPositiveBigInt(-1n), false);

  assertStrictEquals(Type.isPositiveBigInt(Number.NaN), false);
  assertStrictEquals(Type.isPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isPositiveBigInt(SIMAX), false);
  assertStrictEquals(Type.isPositiveBigInt(SIMIN), false);
  assertStrictEquals(Type.isPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isPositiveBigInt(undefined), false);
  assertStrictEquals(Type.isPositiveBigInt(null), false);
  assertStrictEquals(Type.isPositiveBigInt(true), false);
  assertStrictEquals(Type.isPositiveBigInt(false), false);
  assertStrictEquals(Type.isPositiveBigInt(""), false);
  assertStrictEquals(Type.isPositiveBigInt("0"), false);
});

Deno.test("Type.isNonNegativeBigInt()", () => {
  assertStrictEquals(Type.isNonNegativeBigInt(0), false);
  assertStrictEquals(Type.isNonNegativeBigInt(-0), false);
  assertStrictEquals(Type.isNonNegativeBigInt(1), false);
  assertStrictEquals(Type.isNonNegativeBigInt(-1), false);

  assertStrictEquals(Type.isNonNegativeBigInt(-10.1), false);
  assertStrictEquals(Type.isNonNegativeBigInt(-9.9), false);
  assertStrictEquals(Type.isNonNegativeBigInt(9.9), false);
  assertStrictEquals(Type.isNonNegativeBigInt(10.1), false);

  assertStrictEquals(Type.isNonNegativeBigInt(0n), true);
  assertStrictEquals(Type.isNonNegativeBigInt(-0n), true);
  assertStrictEquals(Type.isNonNegativeBigInt(1n), true);
  assertStrictEquals(Type.isNonNegativeBigInt(-1n), false);

  assertStrictEquals(Type.isNonNegativeBigInt(Number.NaN), false);
  assertStrictEquals(Type.isNonNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNonNegativeBigInt(SIMAX), false);
  assertStrictEquals(Type.isNonNegativeBigInt(SIMIN), false);
  assertStrictEquals(Type.isNonNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNonNegativeBigInt(undefined), false);
  assertStrictEquals(Type.isNonNegativeBigInt(null), false);
  assertStrictEquals(Type.isNonNegativeBigInt(true), false);
  assertStrictEquals(Type.isNonNegativeBigInt(false), false);
  assertStrictEquals(Type.isNonNegativeBigInt(""), false);
  assertStrictEquals(Type.isNonNegativeBigInt("0"), false);
});

Deno.test("Type.isNonPositiveBigInt()", () => {
  assertStrictEquals(Type.isNonPositiveBigInt(0), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-0), false);
  assertStrictEquals(Type.isNonPositiveBigInt(1), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-1), false);

  assertStrictEquals(Type.isNonPositiveBigInt(-10.1), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-9.9), false);
  assertStrictEquals(Type.isNonPositiveBigInt(9.9), false);
  assertStrictEquals(Type.isNonPositiveBigInt(10.1), false);

  assertStrictEquals(Type.isNonPositiveBigInt(0n), true);
  assertStrictEquals(Type.isNonPositiveBigInt(-0n), true);
  assertStrictEquals(Type.isNonPositiveBigInt(1n), false);
  assertStrictEquals(Type.isNonPositiveBigInt(-1n), true);

  assertStrictEquals(Type.isNonPositiveBigInt(Number.NaN), false);
  assertStrictEquals(Type.isNonPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNonPositiveBigInt(SIMAX), false);
  assertStrictEquals(Type.isNonPositiveBigInt(SIMIN), false);
  assertStrictEquals(Type.isNonPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNonPositiveBigInt(undefined), false);
  assertStrictEquals(Type.isNonPositiveBigInt(null), false);
  assertStrictEquals(Type.isNonPositiveBigInt(true), false);
  assertStrictEquals(Type.isNonPositiveBigInt(false), false);
  assertStrictEquals(Type.isNonPositiveBigInt(""), false);
  assertStrictEquals(Type.isNonPositiveBigInt("0"), false);
});

Deno.test("Type.isNegativeBigInt()", () => {
  assertStrictEquals(Type.isNegativeBigInt(0), false);
  assertStrictEquals(Type.isNegativeBigInt(-0), false);
  assertStrictEquals(Type.isNegativeBigInt(1), false);
  assertStrictEquals(Type.isNegativeBigInt(-1), false);

  assertStrictEquals(Type.isNegativeBigInt(-10.1), false);
  assertStrictEquals(Type.isNegativeBigInt(-9.9), false);
  assertStrictEquals(Type.isNegativeBigInt(9.9), false);
  assertStrictEquals(Type.isNegativeBigInt(10.1), false);

  assertStrictEquals(Type.isNegativeBigInt(0n), false);
  assertStrictEquals(Type.isNegativeBigInt(-0n), false);
  assertStrictEquals(Type.isNegativeBigInt(1n), false);
  assertStrictEquals(Type.isNegativeBigInt(-1n), true);

  assertStrictEquals(Type.isNegativeBigInt(Number.NaN), false);
  assertStrictEquals(Type.isNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNegativeBigInt(SIMAX), false);
  assertStrictEquals(Type.isNegativeBigInt(SIMIN), false);
  assertStrictEquals(Type.isNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNegativeBigInt(undefined), false);
  assertStrictEquals(Type.isNegativeBigInt(null), false);
  assertStrictEquals(Type.isNegativeBigInt(true), false);
  assertStrictEquals(Type.isNegativeBigInt(false), false);
  assertStrictEquals(Type.isNegativeBigInt(""), false);
  assertStrictEquals(Type.isNegativeBigInt("0"), false);
});

Deno.test("Type.isOddBigInt()", () => {
  assertStrictEquals(Type.isOddBigInt(0n), false);
  assertStrictEquals(Type.isOddBigInt(-0n), false);
  assertStrictEquals(Type.isOddBigInt(1n), true);
  assertStrictEquals(Type.isOddBigInt(-1n), true);
  assertStrictEquals(Type.isOddBigInt(2n), false);
  assertStrictEquals(Type.isOddBigInt(-2n), false);
  assertStrictEquals(Type.isOddBigInt(3n), true);
  assertStrictEquals(Type.isOddBigInt(-3n), true);
  assertStrictEquals(Type.isOddBigInt(4n), false);
  assertStrictEquals(Type.isOddBigInt(-4n), false);
});

Deno.test("Type.isEvenBigInt()", () => {
  assertStrictEquals(Type.isEvenBigInt(0n), true);
  assertStrictEquals(Type.isEvenBigInt(-0n), true);
  assertStrictEquals(Type.isEvenBigInt(1n), false);
  assertStrictEquals(Type.isEvenBigInt(-1n), false);
  assertStrictEquals(Type.isEvenBigInt(2n), true);
  assertStrictEquals(Type.isEvenBigInt(-2n), true);
  assertStrictEquals(Type.isEvenBigInt(3n), false);
  assertStrictEquals(Type.isEvenBigInt(-3n), false);
  assertStrictEquals(Type.isEvenBigInt(4n), true);
  assertStrictEquals(Type.isEvenBigInt(-4n), true);
});
