import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import {
  assertChar,
  assertEmptyString,
  assertNonEmptyString,
  assertRune,
  assertString,
  isChar,
  isEmptyString,
  isNonEmptyString,
  isRune,
  isString,
} from "../mod.ts";

Deno.test("assertChar()", () => {
  try {
    assertChar(" ", "test-1");
    assertChar("0", "test-1");
    assertChar("\u0000", "test-1");
    assertChar("\uFFFF", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertChar("\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertChar("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertChar("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertChar(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertChar(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertChar(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertRune()", () => {
  try {
    assertRune(" ", "test-1");
    assertRune("0", "test-1");
    assertRune("\u0000", "test-1");
    assertRune("\uFFFF", "test-1");
    assertRune("\u{10000}", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertRune("\u{10000}\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertRune("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertRune("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertRune(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertRune(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertRune(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertString()", () => {
  try {
    assertString("", "test-1");
    assertString(" ", "test-1");
    assertString("0", "test-1");
    assertString("\u0000", "test-1");
    assertString("\uFFFF", "test-1");
    assertString("\u{10FFFF}", "test-1");
    assertString(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertEmptyString()", () => {
  try {
    assertEmptyString("", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertEmptyString("0", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertEmptyString("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertEmptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertEmptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertEmptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("assertNonEmptyString()", () => {
  try {
    assertNonEmptyString("0", "test-1");
    assertNonEmptyString("00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    assertNonEmptyString("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonEmptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonEmptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    assertNonEmptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("isChar()", () => {
  assertStrictEquals(isChar(0), false);
  assertStrictEquals(isChar(0n), false);
  assertStrictEquals(isChar(Number.NaN), false);
  assertStrictEquals(isChar(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isChar(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isChar(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isChar(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isChar(undefined), false);
  assertStrictEquals(isChar(null), false);
  assertStrictEquals(isChar(true), false);
  assertStrictEquals(isChar(false), false);
  assertStrictEquals(isChar(""), false);
  assertStrictEquals(isChar("0"), true);
  assertStrictEquals(isChar("\u0000"), true);
  assertStrictEquals(isChar("\uFFFF"), true);
  assertStrictEquals(isChar("\u{10000}"), false);
  assertStrictEquals(isChar("\u0000\u0000"), false);

  assertStrictEquals(isChar("\uD800"), true);
  assertStrictEquals(isChar("\uDC00"), true);
  assertStrictEquals(isChar("\uD800\uD800"), false);
  assertStrictEquals(isChar("\uD800\uDC00"), false);
  assertStrictEquals(isChar("\uDC00\uD800"), false);
  assertStrictEquals(isChar("\uDC00\uDC00"), false);
  assertStrictEquals(isChar("\u{10FFFF}"), false);
});

Deno.test("isRune()", () => {
  assertStrictEquals(isRune(0), false);
  assertStrictEquals(isRune(0n), false);
  assertStrictEquals(isRune(Number.NaN), false);
  assertStrictEquals(isRune(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isRune(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isRune(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isRune(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isRune(undefined), false);
  assertStrictEquals(isRune(null), false);
  assertStrictEquals(isRune(true), false);
  assertStrictEquals(isRune(false), false);
  assertStrictEquals(isRune(""), false);
  assertStrictEquals(isRune("0"), true);
  assertStrictEquals(isRune("\u0000"), true);
  assertStrictEquals(isRune("\uFFFF"), true);
  assertStrictEquals(isRune("\u{10000}"), true);
  assertStrictEquals(isRune("\u0000\u0000"), false);

  assertStrictEquals(isRune("\uD800"), false);
  assertStrictEquals(isRune("\uDC00"), false);
  assertStrictEquals(isRune("\uD800\uD800"), false);
  assertStrictEquals(isRune("\uD800\uDC00"), true);
  assertStrictEquals(isRune("\uDC00\uD800"), false);
  assertStrictEquals(isRune("\uDC00\uDC00"), false);
  assertStrictEquals(isRune("\u{10FFFF}"), true);
});

Deno.test("isString()", () => {
  assertStrictEquals(isString(0), false);
  assertStrictEquals(isString(0n), false);
  assertStrictEquals(isString(Number.NaN), false);
  assertStrictEquals(isString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isString(undefined), false);
  assertStrictEquals(isString(null), false);
  assertStrictEquals(isString(true), false);
  assertStrictEquals(isString(false), false);
  assertStrictEquals(isString(""), true);
  assertStrictEquals(isString("0"), true);
});

Deno.test("isEmptyString()", () => {
  assertStrictEquals(isEmptyString(0), false);
  assertStrictEquals(isEmptyString(0n), false);
  assertStrictEquals(isEmptyString(Number.NaN), false);
  assertStrictEquals(isEmptyString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isEmptyString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isEmptyString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isEmptyString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isEmptyString(undefined), false);
  assertStrictEquals(isEmptyString(null), false);
  assertStrictEquals(isEmptyString(true), false);
  assertStrictEquals(isEmptyString(false), false);
  assertStrictEquals(isEmptyString(""), true);
  assertStrictEquals(isEmptyString("0"), false);
  assertStrictEquals(isEmptyString("00"), false);
});

Deno.test("isNonEmptyString()", () => {
  assertStrictEquals(isNonEmptyString(0), false);
  assertStrictEquals(isNonEmptyString(0n), false);
  assertStrictEquals(isNonEmptyString(Number.NaN), false);
  assertStrictEquals(isNonEmptyString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonEmptyString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isNonEmptyString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isNonEmptyString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonEmptyString(undefined), false);
  assertStrictEquals(isNonEmptyString(null), false);
  assertStrictEquals(isNonEmptyString(true), false);
  assertStrictEquals(isNonEmptyString(false), false);
  assertStrictEquals(isNonEmptyString(""), false);
  assertStrictEquals(isNonEmptyString("0"), true);
  assertStrictEquals(isNonEmptyString("00"), true);
});
