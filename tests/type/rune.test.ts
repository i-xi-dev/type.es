import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isRune()", () => {
  assertStrictEquals(Type.isRune(0), false);
  assertStrictEquals(Type.isRune(0n), false);
  assertStrictEquals(Type.isRune(Number.NaN), false);
  assertStrictEquals(Type.isRune(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Type.isRune(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Type.isRune(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Type.isRune(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Type.isRune(undefined), false);
  assertStrictEquals(Type.isRune(null), false);
  assertStrictEquals(Type.isRune(true), false);
  assertStrictEquals(Type.isRune(false), false);
  assertStrictEquals(Type.isRune(""), false);
  assertStrictEquals(Type.isRune("0"), true);
  assertStrictEquals(Type.isRune("\u0000"), true);
  assertStrictEquals(Type.isRune("\uFFFF"), true);
  assertStrictEquals(Type.isRune("\u{10000}"), true);
  assertStrictEquals(Type.isRune("\u0000\u0000"), false);

  assertStrictEquals(Type.isRune("\uD800"), false);
  assertStrictEquals(Type.isRune("\uDC00"), false);
  assertStrictEquals(Type.isRune("\uD800\uD800"), false);
  assertStrictEquals(Type.isRune("\uD800\uDC00"), true);
  assertStrictEquals(Type.isRune("\uDC00\uD800"), false);
  assertStrictEquals(Type.isRune("\uDC00\uDC00"), false);
  assertStrictEquals(Type.isRune("\u{10FFFF}"), true);
});

Deno.test("Type.assertRune()", () => {
  try {
    Type.assertRune(" ", "test-1");
    Type.assertRune("0", "test-1");
    Type.assertRune("\u0000", "test-1");
    Type.assertRune("\uFFFF", "test-1");
    Type.assertRune("\u{10000}", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertRune("\u{10000}\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertRune("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertRune("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertRune(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertRune(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertRune(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
