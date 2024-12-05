import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Text } from "../../mod.ts";

const { Rune } = Text;

Deno.test("Rune.isRune()", () => {
  assertStrictEquals(Rune.isRune(0), false);
  assertStrictEquals(Rune.isRune(0n), false);
  assertStrictEquals(Rune.isRune(Number.NaN), false);
  assertStrictEquals(Rune.isRune(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Rune.isRune(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Rune.isRune(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Rune.isRune(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Rune.isRune(undefined), false);
  assertStrictEquals(Rune.isRune(null), false);
  assertStrictEquals(Rune.isRune(true), false);
  assertStrictEquals(Rune.isRune(false), false);
  assertStrictEquals(Rune.isRune(""), false);
  assertStrictEquals(Rune.isRune("0"), true);
  assertStrictEquals(Rune.isRune("\u0000"), true);
  assertStrictEquals(Rune.isRune("\uFFFF"), true);
  assertStrictEquals(Rune.isRune("\u{10000}"), true);
  assertStrictEquals(Rune.isRune("\u0000\u0000"), false);

  assertStrictEquals(Rune.isRune("\uD800"), false);
  assertStrictEquals(Rune.isRune("\uDC00"), false);
  assertStrictEquals(Rune.isRune("\uD800\uD800"), false);
  assertStrictEquals(Rune.isRune("\uD800\uDC00"), true);
  assertStrictEquals(Rune.isRune("\uDC00\uD800"), false);
  assertStrictEquals(Rune.isRune("\uDC00\uDC00"), false);
  assertStrictEquals(Rune.isRune("\u{10FFFF}"), true);
});

Deno.test("Rune.assertRune()", () => {
  try {
    Rune.assertRune(" ", "test-1");
    Rune.assertRune("0", "test-1");
    Rune.assertRune("\u0000", "test-1");
    Rune.assertRune("\uFFFF", "test-1");
    Rune.assertRune("\u{10000}", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Rune.assertRune("\u{10000}\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assertRune("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assertRune("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assertRune(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assertRune(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assertRune(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
