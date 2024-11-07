import { assertStrictEquals, fail, unreachable } from "./deps.ts";
import { UsvStringType } from "../mod.ts";

Deno.test("UsvStringType.isUsvString()", () => {
  assertStrictEquals(UsvStringType.isUsvString(0), false);
  assertStrictEquals(UsvStringType.isUsvString(0n), false);
  assertStrictEquals(UsvStringType.isUsvString(Number.NaN), false);
  assertStrictEquals(
    UsvStringType.isUsvString(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(UsvStringType.isUsvString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(UsvStringType.isUsvString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    UsvStringType.isUsvString(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(UsvStringType.isUsvString(undefined), false);
  assertStrictEquals(UsvStringType.isUsvString(null), false);
  assertStrictEquals(UsvStringType.isUsvString(true), false);
  assertStrictEquals(UsvStringType.isUsvString(false), false);
  assertStrictEquals(UsvStringType.isUsvString(""), true);
  assertStrictEquals(UsvStringType.isUsvString("0"), true);

  assertStrictEquals(UsvStringType.isUsvString("\uD800\uDC00"), true);
  assertStrictEquals(UsvStringType.isUsvString("\uDC00\uD800"), false);
});

Deno.test("UsvStringType.assertUsvString()", () => {
  try {
    UsvStringType.assertUsvString("", "test-1");
    UsvStringType.assertUsvString(" ", "test-1");
    UsvStringType.assertUsvString("0", "test-1");
    UsvStringType.assertUsvString("\u0000", "test-1");
    UsvStringType.assertUsvString("\uFFFF", "test-1");
    UsvStringType.assertUsvString("\u{10FFFF}", "test-1");
    UsvStringType.assertUsvString(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    UsvStringType.assertUsvString("\uD800\uDC00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    UsvStringType.assertUsvString("\uDC00\uD800", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assertUsvString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assertUsvString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assertUsvString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("UsvStringType.isNonEmpty()", () => {
  assertStrictEquals(UsvStringType.isNonEmpty(0), false);
  assertStrictEquals(UsvStringType.isNonEmpty(0n), false);
  assertStrictEquals(UsvStringType.isNonEmpty(Number.NaN), false);
  assertStrictEquals(UsvStringType.isNonEmpty(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(UsvStringType.isNonEmpty(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(UsvStringType.isNonEmpty(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(UsvStringType.isNonEmpty(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(UsvStringType.isNonEmpty(undefined), false);
  assertStrictEquals(UsvStringType.isNonEmpty(null), false);
  assertStrictEquals(UsvStringType.isNonEmpty(true), false);
  assertStrictEquals(UsvStringType.isNonEmpty(false), false);
  assertStrictEquals(UsvStringType.isNonEmpty(""), false);
  assertStrictEquals(UsvStringType.isNonEmpty("0"), true);
  assertStrictEquals(UsvStringType.isNonEmpty("00"), true);

  assertStrictEquals(UsvStringType.isNonEmpty("\uD800\uDC00"), true);
  assertStrictEquals(UsvStringType.isNonEmpty("\uDC00\uD800"), false);
});

Deno.test("UsvStringType.assertNonEmpty()", () => {
  try {
    UsvStringType.assertNonEmpty("0", "test-1");
    UsvStringType.assertNonEmpty("00", "test-1");

    UsvStringType.assertNonEmpty("\uD800\uDC00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    UsvStringType.assertNonEmpty("\uDC00\uD800", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assertNonEmpty("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assertNonEmpty(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assertNonEmpty(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assertNonEmpty(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});
