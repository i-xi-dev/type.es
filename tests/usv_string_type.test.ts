import { assertStrictEquals, assertThrows, fail, unreachable } from "./deps.ts";
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

Deno.test("UsvStringType.runeCountOf()", () => {
  assertStrictEquals(UsvStringType.runeCountOf(""), 0);
  assertStrictEquals(UsvStringType.runeCountOf("012"), 3);
  assertStrictEquals(UsvStringType.runeCountOf("あい"), 2);
  assertStrictEquals(UsvStringType.runeCountOf("\u{2000B}"), 1);

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      UsvStringType.runeCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      UsvStringType.runeCountOf("\u{dc0b}\u{d840}");
    },
    TypeError,
    e1,
  );
});

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("UsvStringType.toRunes()", () => {
  assertStrictEquals(_iToS(UsvStringType.toRunes("")), `[]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(UsvStringType.toRunes("\u{2000B}")),
    `["\u{2000B}"]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(_iToS(UsvStringType.toRunes("g̈")), `["\u0067","\u0308"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("각")), `["\uAC01"]`);
  assertStrictEquals(
    _iToS(UsvStringType.toRunes("각")),
    `["\u1100","\u1161","\u11A8"]`,
  );
  assertStrictEquals(_iToS(UsvStringType.toRunes("ก")), `["\u0E01"]`);

  assertStrictEquals(_iToS(UsvStringType.toRunes("நி")), `["\u0BA8","\u0BBF"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("เ")), `["\u0E40"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("กำ")), `["\u0E01","\u0E33"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("षि")), `["\u0937","\u093F"]`);
  assertStrictEquals(
    _iToS(UsvStringType.toRunes("क्षि")),
    `["\u0915","\u094D","\u0937","\u093F"]`,
  );

  assertStrictEquals(_iToS(UsvStringType.toRunes("ำ")), `["\u0E33"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("ष")), `["\u0937"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("ि")), `["\u093F"]`);

  assertStrictEquals(_iToS(UsvStringType.toRunes("ch")), `["\u0063","\u0068"]`);
  assertStrictEquals(_iToS(UsvStringType.toRunes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(_iToS(UsvStringType.toRunes("Ą́")), `["\u0104","\u0301"]`);

  assertStrictEquals(
    _iToS(UsvStringType.toRunes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b","\u3099","\u585A","\u{E0101}"]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...UsvStringType.toRunes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...UsvStringType.toRunes("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});
