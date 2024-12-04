import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { StringType } from "../../mod.ts";

Deno.test("StringType.isChar()", () => {
  assertStrictEquals(StringType.isChar(0), false);
  assertStrictEquals(StringType.isChar(0n), false);
  assertStrictEquals(StringType.isChar(Number.NaN), false);
  assertStrictEquals(StringType.isChar(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(StringType.isChar(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isChar(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isChar(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(StringType.isChar(undefined), false);
  assertStrictEquals(StringType.isChar(null), false);
  assertStrictEquals(StringType.isChar(true), false);
  assertStrictEquals(StringType.isChar(false), false);
  assertStrictEquals(StringType.isChar(""), false);
  assertStrictEquals(StringType.isChar("0"), true);
  assertStrictEquals(StringType.isChar("\u0000"), true);
  assertStrictEquals(StringType.isChar("\uFFFF"), true);
  assertStrictEquals(StringType.isChar("\u{10000}"), false);
  assertStrictEquals(StringType.isChar("\u0000\u0000"), false);

  assertStrictEquals(StringType.isChar("\uD800"), true);
  assertStrictEquals(StringType.isChar("\uDC00"), true);
  assertStrictEquals(StringType.isChar("\uD800\uD800"), false);
  assertStrictEquals(StringType.isChar("\uD800\uDC00"), false);
  assertStrictEquals(StringType.isChar("\uDC00\uD800"), false);
  assertStrictEquals(StringType.isChar("\uDC00\uDC00"), false);
  assertStrictEquals(StringType.isChar("\u{10FFFF}"), false);
});

Deno.test("StringType.assertChar()", () => {
  try {
    StringType.assertChar(" ", "test-1");
    StringType.assertChar("0", "test-1");
    StringType.assertChar("\u0000", "test-1");
    StringType.assertChar("\uFFFF", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    StringType.assertChar("\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertChar("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertChar("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertChar(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertChar(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertChar(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
