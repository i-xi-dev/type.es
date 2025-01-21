import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Basics } from "../../mod.ts";

const { Type } = Basics;

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
