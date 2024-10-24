import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { RuneType } from "../mod.ts";

Deno.test("RuneType.isRune()", () => {
  assertStrictEquals(RuneType.isRune(0), false);
  assertStrictEquals(RuneType.isRune(0n), false);
  assertStrictEquals(RuneType.isRune(Number.NaN), false);
  assertStrictEquals(RuneType.isRune(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(RuneType.isRune(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(RuneType.isRune(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(RuneType.isRune(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(RuneType.isRune(undefined), false);
  assertStrictEquals(RuneType.isRune(null), false);
  assertStrictEquals(RuneType.isRune(true), false);
  assertStrictEquals(RuneType.isRune(false), false);
  assertStrictEquals(RuneType.isRune(""), false);
  assertStrictEquals(RuneType.isRune("0"), true);
  assertStrictEquals(RuneType.isRune("\u0000"), true);
  assertStrictEquals(RuneType.isRune("\uFFFF"), true);
  assertStrictEquals(RuneType.isRune("\u{10000}"), true);
  assertStrictEquals(RuneType.isRune("\u0000\u0000"), false);

  assertStrictEquals(RuneType.isRune("\uD800"), false);
  assertStrictEquals(RuneType.isRune("\uDC00"), false);
  assertStrictEquals(RuneType.isRune("\uD800\uD800"), false);
  assertStrictEquals(RuneType.isRune("\uD800\uDC00"), true);
  assertStrictEquals(RuneType.isRune("\uDC00\uD800"), false);
  assertStrictEquals(RuneType.isRune("\uDC00\uDC00"), false);
  assertStrictEquals(RuneType.isRune("\u{10FFFF}"), true);
});

Deno.test("RuneType.assertRune()", () => {
  try {
    RuneType.assertRune(" ", "test-1");
    RuneType.assertRune("0", "test-1");
    RuneType.assertRune("\u0000", "test-1");
    RuneType.assertRune("\uFFFF", "test-1");
    RuneType.assertRune("\u{10000}", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    RuneType.assertRune("\u{10000}\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneType.assertRune("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneType.assertRune("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneType.assertRune(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneType.assertRune(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneType.assertRune(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
