import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { CharType } from "../mod.ts";

Deno.test("CharType.isChar()", () => {
  assertStrictEquals(CharType.isChar(0), false);
  assertStrictEquals(CharType.isChar(0n), false);
  assertStrictEquals(CharType.isChar(Number.NaN), false);
  assertStrictEquals(CharType.isChar(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(CharType.isChar(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(CharType.isChar(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(CharType.isChar(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(CharType.isChar(undefined), false);
  assertStrictEquals(CharType.isChar(null), false);
  assertStrictEquals(CharType.isChar(true), false);
  assertStrictEquals(CharType.isChar(false), false);
  assertStrictEquals(CharType.isChar(""), false);
  assertStrictEquals(CharType.isChar("0"), true);
  assertStrictEquals(CharType.isChar("\u0000"), true);
  assertStrictEquals(CharType.isChar("\uFFFF"), true);
  assertStrictEquals(CharType.isChar("\u{10000}"), false);
  assertStrictEquals(CharType.isChar("\u0000\u0000"), false);

  assertStrictEquals(CharType.isChar("\uD800"), true);
  assertStrictEquals(CharType.isChar("\uDC00"), true);
  assertStrictEquals(CharType.isChar("\uD800\uD800"), false);
  assertStrictEquals(CharType.isChar("\uD800\uDC00"), false);
  assertStrictEquals(CharType.isChar("\uDC00\uD800"), false);
  assertStrictEquals(CharType.isChar("\uDC00\uDC00"), false);
  assertStrictEquals(CharType.isChar("\u{10FFFF}"), false);
});

Deno.test("CharType.assertChar()", () => {
  try {
    CharType.assertChar(" ", "test-1");
    CharType.assertChar("0", "test-1");
    CharType.assertChar("\u0000", "test-1");
    CharType.assertChar("\uFFFF", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    CharType.assertChar("\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    CharType.assertChar("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    CharType.assertChar("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    CharType.assertChar(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    CharType.assertChar(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    CharType.assertChar(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
