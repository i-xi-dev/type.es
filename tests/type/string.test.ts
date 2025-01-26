import { assertStrictEquals, fail, unreachable } from "@std/assert";
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

Deno.test("Type.assertString()", () => {
  try {
    Type.assertString("", "test-1");
    Type.assertString(" ", "test-1");
    Type.assertString("0", "test-1");
    Type.assertString("\u0000", "test-1");
    Type.assertString("\uFFFF", "test-1");
    Type.assertString("\u{10FFFF}", "test-1");
    Type.assertString(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    Type.assertString("\uD800\uDC00", "test-1");
    Type.assertString("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
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

Deno.test("Type.assertEmptyString()", () => {
  try {
    Type.assertEmptyString("", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertEmptyString("0", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertEmptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
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

Deno.test("Type.assertNonEmptyString()", () => {
  try {
    Type.assertNonEmptyString("0", "test-1");
    Type.assertNonEmptyString("00", "test-1");

    Type.assertNonEmptyString("\uD800\uDC00", "test-1");
    Type.assertNonEmptyString("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertNonEmptyString("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonEmptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonEmptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertNonEmptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
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

Deno.test("Type.assertChar()", () => {
  try {
    Type.assertChar(" ", "test-1");
    Type.assertChar("0", "test-1");
    Type.assertChar("\u0000", "test-1");
    Type.assertChar("\uFFFF", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertChar("\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertChar(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
