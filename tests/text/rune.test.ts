import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Text } from "../../mod.ts";

const { Rune } = Text;

Deno.test("Rune.is()", () => {
  assertStrictEquals(Rune.is(0), false);
  assertStrictEquals(Rune.is(0n), false);
  assertStrictEquals(Rune.is(Number.NaN), false);
  assertStrictEquals(Rune.is(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Rune.is(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Rune.is(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Rune.is(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Rune.is(undefined), false);
  assertStrictEquals(Rune.is(null), false);
  assertStrictEquals(Rune.is(true), false);
  assertStrictEquals(Rune.is(false), false);
  assertStrictEquals(Rune.is(""), false);
  assertStrictEquals(Rune.is("0"), true);
  assertStrictEquals(Rune.is("\u0000"), true);
  assertStrictEquals(Rune.is("\uFFFF"), true);
  assertStrictEquals(Rune.is("\u{10000}"), true);
  assertStrictEquals(Rune.is("\u0000\u0000"), false);

  assertStrictEquals(Rune.is("\uD800"), false);
  assertStrictEquals(Rune.is("\uDC00"), false);
  assertStrictEquals(Rune.is("\uD800\uD800"), false);
  assertStrictEquals(Rune.is("\uD800\uDC00"), true);
  assertStrictEquals(Rune.is("\uDC00\uD800"), false);
  assertStrictEquals(Rune.is("\uDC00\uDC00"), false);
  assertStrictEquals(Rune.is("\u{10FFFF}"), true);
});

Deno.test("Rune.assert()", () => {
  try {
    Rune.assert(" ", "test-1");
    Rune.assert("0", "test-1");
    Rune.assert("\u0000", "test-1");
    Rune.assert("\uFFFF", "test-1");
    Rune.assert("\u{10000}", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Rune.assert("\u{10000}\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
