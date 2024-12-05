import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Basics } from "../../mod.ts";

const { StringType } = Basics;

Deno.test("StringType.isRune()", () => {
  assertStrictEquals(StringType.isRune(0), false);
  assertStrictEquals(StringType.isRune(0n), false);
  assertStrictEquals(StringType.isRune(Number.NaN), false);
  assertStrictEquals(StringType.isRune(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(StringType.isRune(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isRune(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isRune(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(StringType.isRune(undefined), false);
  assertStrictEquals(StringType.isRune(null), false);
  assertStrictEquals(StringType.isRune(true), false);
  assertStrictEquals(StringType.isRune(false), false);
  assertStrictEquals(StringType.isRune(""), false);
  assertStrictEquals(StringType.isRune("0"), true);
  assertStrictEquals(StringType.isRune("\u0000"), true);
  assertStrictEquals(StringType.isRune("\uFFFF"), true);
  assertStrictEquals(StringType.isRune("\u{10000}"), true);
  assertStrictEquals(StringType.isRune("\u0000\u0000"), false);

  assertStrictEquals(StringType.isRune("\uD800"), false);
  assertStrictEquals(StringType.isRune("\uDC00"), false);
  assertStrictEquals(StringType.isRune("\uD800\uD800"), false);
  assertStrictEquals(StringType.isRune("\uD800\uDC00"), true);
  assertStrictEquals(StringType.isRune("\uDC00\uD800"), false);
  assertStrictEquals(StringType.isRune("\uDC00\uDC00"), false);
  assertStrictEquals(StringType.isRune("\u{10FFFF}"), true);
});

Deno.test("StringType.assertRune()", () => {
  try {
    StringType.assertRune(" ", "test-1");
    StringType.assertRune("0", "test-1");
    StringType.assertRune("\u0000", "test-1");
    StringType.assertRune("\uFFFF", "test-1");
    StringType.assertRune("\u{10000}", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    StringType.assertRune("\u{10000}\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertRune("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertRune("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertRune(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertRune(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertRune(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
