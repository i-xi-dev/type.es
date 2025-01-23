import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isString()", () => {
  assertStrictEquals(Type.isString(0), false);
  assertStrictEquals(Type.isString(0n), false);
  assertStrictEquals(Type.isString(Number.NaN), false);
  assertStrictEquals(Type.isString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isString(undefined), false);
  assertStrictEquals(Type.isString(null), false);
  assertStrictEquals(Type.isString(true), false);
  assertStrictEquals(Type.isString(false), false);
  assertStrictEquals(Type.isString(""), true);
  assertStrictEquals(Type.isString("0"), true);

  assertStrictEquals(Type.isString("\uD800\uDC00"), true);
  assertStrictEquals(Type.isString("\uDC00\uD800"), true);
});

Deno.test("Type.isEmptyString()", () => {
  assertStrictEquals(Type.isEmptyString(0), false);
  assertStrictEquals(Type.isEmptyString(0n), false);
  assertStrictEquals(Type.isEmptyString(Number.NaN), false);
  assertStrictEquals(Type.isEmptyString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isEmptyString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isEmptyString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isEmptyString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isEmptyString(undefined), false);
  assertStrictEquals(Type.isEmptyString(null), false);
  assertStrictEquals(Type.isEmptyString(true), false);
  assertStrictEquals(Type.isEmptyString(false), false);
  assertStrictEquals(Type.isEmptyString(""), true);
  assertStrictEquals(Type.isEmptyString("0"), false);
  assertStrictEquals(Type.isEmptyString("00"), false);
});

Deno.test("Type.isNonEmptyString()", () => {
  assertStrictEquals(Type.isNonEmptyString(0), false);
  assertStrictEquals(Type.isNonEmptyString(0n), false);
  assertStrictEquals(Type.isNonEmptyString(Number.NaN), false);
  assertStrictEquals(Type.isNonEmptyString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNonEmptyString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNonEmptyString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNonEmptyString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNonEmptyString(undefined), false);
  assertStrictEquals(Type.isNonEmptyString(null), false);
  assertStrictEquals(Type.isNonEmptyString(true), false);
  assertStrictEquals(Type.isNonEmptyString(false), false);
  assertStrictEquals(Type.isNonEmptyString(""), false);
  assertStrictEquals(Type.isNonEmptyString("0"), true);
  assertStrictEquals(Type.isNonEmptyString("00"), true);

  assertStrictEquals(Type.isNonEmptyString("\uD800\uDC00"), true);
  assertStrictEquals(Type.isNonEmptyString("\uDC00\uD800"), true);
});

Deno.test("Type.isChar()", () => {
  assertStrictEquals(Type.isChar(0), false);
  assertStrictEquals(Type.isChar(0n), false);
  assertStrictEquals(Type.isChar(Number.NaN), false);
  assertStrictEquals(Type.isChar(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isChar(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isChar(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isChar(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isChar(undefined), false);
  assertStrictEquals(Type.isChar(null), false);
  assertStrictEquals(Type.isChar(true), false);
  assertStrictEquals(Type.isChar(false), false);
  assertStrictEquals(Type.isChar(""), false);
  assertStrictEquals(Type.isChar("0"), true);
  assertStrictEquals(Type.isChar("\u0000"), true);
  assertStrictEquals(Type.isChar("\uFFFF"), true);
  assertStrictEquals(Type.isChar("\u{10000}"), false);
  assertStrictEquals(Type.isChar("\u0000\u0000"), false);

  assertStrictEquals(Type.isChar("\uD800"), true);
  assertStrictEquals(Type.isChar("\uDC00"), true);
  assertStrictEquals(Type.isChar("\uD800\uD800"), false);
  assertStrictEquals(Type.isChar("\uD800\uDC00"), false);
  assertStrictEquals(Type.isChar("\uDC00\uD800"), false);
  assertStrictEquals(Type.isChar("\uDC00\uDC00"), false);
  assertStrictEquals(Type.isChar("\u{10FFFF}"), false);
});

Deno.test("Type.isNumber()", () => {
  assertStrictEquals(Type.isNumber(0), true);
  assertStrictEquals(Type.isNumber(-0), true);
  assertStrictEquals(Type.isNumber(1), true);
  assertStrictEquals(Type.isNumber(-1), true);

  assertStrictEquals(Type.isNumber(-10.1), true);
  assertStrictEquals(Type.isNumber(-9.9), true);
  assertStrictEquals(Type.isNumber(9.9), true);
  assertStrictEquals(Type.isNumber(10.1), true);

  assertStrictEquals(Type.isNumber(0n), false);
  assertStrictEquals(Type.isNumber(-0n), false);
  assertStrictEquals(Type.isNumber(1n), false);
  assertStrictEquals(Type.isNumber(-1n), false);

  assertStrictEquals(Type.isNumber(Number.NaN), true);
  assertStrictEquals(Type.isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNumber(undefined), false);
  assertStrictEquals(Type.isNumber(null), false);
  assertStrictEquals(Type.isNumber(true), false);
  assertStrictEquals(Type.isNumber(false), false);
  assertStrictEquals(Type.isNumber(""), false);
  assertStrictEquals(Type.isNumber("0"), false);
});

Deno.test("Type.isPositiveNumber()", () => {
  assertStrictEquals(Type.isPositiveNumber(0), false);
  assertStrictEquals(Type.isPositiveNumber(-0), false);
  assertStrictEquals(Type.isPositiveNumber(1), true);
  assertStrictEquals(Type.isPositiveNumber(-1), false);

  assertStrictEquals(Type.isPositiveNumber(-10.1), false);
  assertStrictEquals(Type.isPositiveNumber(-9.9), false);
  assertStrictEquals(Type.isPositiveNumber(9.9), true);
  assertStrictEquals(Type.isPositiveNumber(10.1), true);

  assertStrictEquals(Type.isPositiveNumber(0n), false);
  assertStrictEquals(Type.isPositiveNumber(-0n), false);
  assertStrictEquals(Type.isPositiveNumber(1n), false);
  assertStrictEquals(Type.isPositiveNumber(-1n), false);

  assertStrictEquals(Type.isPositiveNumber(Number.NaN), false);
  assertStrictEquals(Type.isPositiveNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isPositiveNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isPositiveNumber(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isPositiveNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isPositiveNumber(undefined), false);
  assertStrictEquals(Type.isPositiveNumber(null), false);
  assertStrictEquals(Type.isPositiveNumber(true), false);
  assertStrictEquals(Type.isPositiveNumber(false), false);
  assertStrictEquals(Type.isPositiveNumber(""), false);
  assertStrictEquals(Type.isPositiveNumber("0"), false);
});

Deno.test("Type.isNonNegativeNumber()", () => {
  assertStrictEquals(Type.isNonNegativeNumber(0), true);
  assertStrictEquals(Type.isNonNegativeNumber(-0), true);
  assertStrictEquals(Type.isNonNegativeNumber(1), true);
  assertStrictEquals(Type.isNonNegativeNumber(-1), false);

  assertStrictEquals(Type.isNonNegativeNumber(-10.1), false);
  assertStrictEquals(Type.isNonNegativeNumber(-9.9), false);
  assertStrictEquals(Type.isNonNegativeNumber(9.9), true);
  assertStrictEquals(Type.isNonNegativeNumber(10.1), true);

  assertStrictEquals(Type.isNonNegativeNumber(0n), false);
  assertStrictEquals(Type.isNonNegativeNumber(-0n), false);
  assertStrictEquals(Type.isNonNegativeNumber(1n), false);
  assertStrictEquals(Type.isNonNegativeNumber(-1n), false);

  assertStrictEquals(Type.isNonNegativeNumber(Number.NaN), false);
  assertStrictEquals(Type.isNonNegativeNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Type.isNonNegativeNumber(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNonNegativeNumber(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNonNegativeNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isNonNegativeNumber(undefined), false);
  assertStrictEquals(Type.isNonNegativeNumber(null), false);
  assertStrictEquals(Type.isNonNegativeNumber(true), false);
  assertStrictEquals(Type.isNonNegativeNumber(false), false);
  assertStrictEquals(Type.isNonNegativeNumber(""), false);
  assertStrictEquals(Type.isNonNegativeNumber("0"), false);
});

Deno.test("Type.isNonPositiveNumber()", () => {
  assertStrictEquals(Type.isNonPositiveNumber(0), true);
  assertStrictEquals(Type.isNonPositiveNumber(-0), true);
  assertStrictEquals(Type.isNonPositiveNumber(1), false);
  assertStrictEquals(Type.isNonPositiveNumber(-1), true);

  assertStrictEquals(Type.isNonPositiveNumber(-10.1), true);
  assertStrictEquals(Type.isNonPositiveNumber(-9.9), true);
  assertStrictEquals(Type.isNonPositiveNumber(9.9), false);
  assertStrictEquals(Type.isNonPositiveNumber(10.1), false);

  assertStrictEquals(Type.isNonPositiveNumber(0n), false);
  assertStrictEquals(Type.isNonPositiveNumber(-0n), false);
  assertStrictEquals(Type.isNonPositiveNumber(1n), false);
  assertStrictEquals(Type.isNonPositiveNumber(-1n), false);

  assertStrictEquals(Type.isNonPositiveNumber(Number.NaN), false);
  assertStrictEquals(Type.isNonPositiveNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNonPositiveNumber(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNonPositiveNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNonPositiveNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNonPositiveNumber(undefined), false);
  assertStrictEquals(Type.isNonPositiveNumber(null), false);
  assertStrictEquals(Type.isNonPositiveNumber(true), false);
  assertStrictEquals(Type.isNonPositiveNumber(false), false);
  assertStrictEquals(Type.isNonPositiveNumber(""), false);
  assertStrictEquals(Type.isNonPositiveNumber("0"), false);
});

Deno.test("Type.isNegativeNumber()", () => {
  assertStrictEquals(Type.isNegativeNumber(0), false);
  assertStrictEquals(Type.isNegativeNumber(-0), false);
  assertStrictEquals(Type.isNegativeNumber(1), false);
  assertStrictEquals(Type.isNegativeNumber(-1), true);

  assertStrictEquals(Type.isNegativeNumber(-10.1), true);
  assertStrictEquals(Type.isNegativeNumber(-9.9), true);
  assertStrictEquals(Type.isNegativeNumber(9.9), false);
  assertStrictEquals(Type.isNegativeNumber(10.1), false);

  assertStrictEquals(Type.isNegativeNumber(0n), false);
  assertStrictEquals(Type.isNegativeNumber(-0n), false);
  assertStrictEquals(Type.isNegativeNumber(1n), false);
  assertStrictEquals(Type.isNegativeNumber(-1n), false);

  assertStrictEquals(Type.isNegativeNumber(Number.NaN), false);
  assertStrictEquals(Type.isNegativeNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isNegativeNumber(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isNegativeNumber(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Type.isNegativeNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Type.isNegativeNumber(undefined), false);
  assertStrictEquals(Type.isNegativeNumber(null), false);
  assertStrictEquals(Type.isNegativeNumber(true), false);
  assertStrictEquals(Type.isNegativeNumber(false), false);
  assertStrictEquals(Type.isNegativeNumber(""), false);
  assertStrictEquals(Type.isNegativeNumber("0"), false);
});

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
