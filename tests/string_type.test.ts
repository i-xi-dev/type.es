import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { StringType } from "../mod.ts";

Deno.test("StringType.assertString()", () => {
  try {
    StringType.assertString("", "test-1");
    StringType.assertString(" ", "test-1");
    StringType.assertString("0", "test-1");
    StringType.assertString("\u0000", "test-1");
    StringType.assertString("\uFFFF", "test-1");
    StringType.assertString("\u{10FFFF}", "test-1");
    StringType.assertString(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    StringType.assertString("\uD800\uDC00", "test-1");
    StringType.assertString("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    StringType.assertString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("StringType.assertEmpty()", () => {
  try {
    StringType.assertEmpty("", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    StringType.assertEmpty("0", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertEmpty("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertEmpty(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertEmpty(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertEmpty(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("StringType.assertNonEmpty()", () => {
  try {
    StringType.assertNonEmpty("0", "test-1");
    StringType.assertNonEmpty("00", "test-1");

    StringType.assertNonEmpty("\uD800\uDC00", "test-1");
    StringType.assertNonEmpty("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    StringType.assertNonEmpty("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertNonEmpty(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertNonEmpty(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    StringType.assertNonEmpty(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("StringType.isString()", () => {
  assertStrictEquals(StringType.isString(0), false);
  assertStrictEquals(StringType.isString(0n), false);
  assertStrictEquals(StringType.isString(Number.NaN), false);
  assertStrictEquals(StringType.isString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(StringType.isString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(StringType.isString(undefined), false);
  assertStrictEquals(StringType.isString(null), false);
  assertStrictEquals(StringType.isString(true), false);
  assertStrictEquals(StringType.isString(false), false);
  assertStrictEquals(StringType.isString(""), true);
  assertStrictEquals(StringType.isString("0"), true);

  assertStrictEquals(StringType.isString("\uD800\uDC00"), true);
  assertStrictEquals(StringType.isString("\uDC00\uD800"), true);
});

Deno.test("StringType.isEmpty()", () => {
  assertStrictEquals(StringType.isEmpty(0), false);
  assertStrictEquals(StringType.isEmpty(0n), false);
  assertStrictEquals(StringType.isEmpty(Number.NaN), false);
  assertStrictEquals(StringType.isEmpty(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(StringType.isEmpty(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isEmpty(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isEmpty(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(StringType.isEmpty(undefined), false);
  assertStrictEquals(StringType.isEmpty(null), false);
  assertStrictEquals(StringType.isEmpty(true), false);
  assertStrictEquals(StringType.isEmpty(false), false);
  assertStrictEquals(StringType.isEmpty(""), true);
  assertStrictEquals(StringType.isEmpty("0"), false);
  assertStrictEquals(StringType.isEmpty("00"), false);
});

Deno.test("StringType.isNonEmpty()", () => {
  assertStrictEquals(StringType.isNonEmpty(0), false);
  assertStrictEquals(StringType.isNonEmpty(0n), false);
  assertStrictEquals(StringType.isNonEmpty(Number.NaN), false);
  assertStrictEquals(StringType.isNonEmpty(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(StringType.isNonEmpty(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isNonEmpty(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(StringType.isNonEmpty(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(StringType.isNonEmpty(undefined), false);
  assertStrictEquals(StringType.isNonEmpty(null), false);
  assertStrictEquals(StringType.isNonEmpty(true), false);
  assertStrictEquals(StringType.isNonEmpty(false), false);
  assertStrictEquals(StringType.isNonEmpty(""), false);
  assertStrictEquals(StringType.isNonEmpty("0"), true);
  assertStrictEquals(StringType.isNonEmpty("00"), true);

  assertStrictEquals(StringType.isNonEmpty("\uD800\uDC00"), true);
  assertStrictEquals(StringType.isNonEmpty("\uDC00\uD800"), true);
});
