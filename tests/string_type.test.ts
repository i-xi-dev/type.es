import { assertStrictEquals, assertThrows, fail, unreachable } from "./deps.ts";
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

Deno.test("StringType.charCountOf()", () => {
  assertStrictEquals(StringType.charCountOf(""), 0);
  assertStrictEquals(StringType.charCountOf("012"), 3);
  assertStrictEquals(StringType.charCountOf("あい"), 2);
  assertStrictEquals(StringType.charCountOf("\u{2000B}"), 2);
  assertStrictEquals(StringType.charCountOf("\u{dc0b}\u{d840}"), 2);

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      StringType.charCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
});

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("StringType.toChars()", () => {
  assertStrictEquals(_iToS(StringType.toChars("")), `[]`);
  assertStrictEquals(_iToS(StringType.toChars("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(StringType.toChars("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(StringType.toChars("\u{2000B}")),
    `["\\ud840","\\udc0b"]`,
  );
  assertStrictEquals(
    _iToS(StringType.toChars("\u{dc0b}\u{d840}")),
    `["\\udc0b","\\ud840"]`,
  );

  assertStrictEquals(
    _iToS(StringType.toChars("𩸽が塚󠄁")),
    `["\\ud867","\\ude3d","\u304b","\u3099","\u585A","\\udb40","\\udd01"]`,
  );

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      [...StringType.toChars(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
});
