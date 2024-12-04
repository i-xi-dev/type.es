import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { UsvStringType } from "../../mod.ts";

Deno.test("UsvStringType.is()", () => {
  assertStrictEquals(UsvStringType.is(0), false);
  assertStrictEquals(UsvStringType.is(0n), false);
  assertStrictEquals(UsvStringType.is(Number.NaN), false);
  assertStrictEquals(
    UsvStringType.is(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(UsvStringType.is(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(UsvStringType.is(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    UsvStringType.is(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(UsvStringType.is(undefined), false);
  assertStrictEquals(UsvStringType.is(null), false);
  assertStrictEquals(UsvStringType.is(true), false);
  assertStrictEquals(UsvStringType.is(false), false);
  assertStrictEquals(UsvStringType.is(""), true);
  assertStrictEquals(UsvStringType.is("0"), true);

  assertStrictEquals(UsvStringType.is("\uD800\uDC00"), true);
  assertStrictEquals(UsvStringType.is("\uDC00\uD800"), false);
});

Deno.test("UsvStringType.assert()", () => {
  try {
    UsvStringType.assert("", "test-1");
    UsvStringType.assert(" ", "test-1");
    UsvStringType.assert("0", "test-1");
    UsvStringType.assert("\u0000", "test-1");
    UsvStringType.assert("\uFFFF", "test-1");
    UsvStringType.assert("\u{10FFFF}", "test-1");
    UsvStringType.assert(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    UsvStringType.assert("\uD800\uDC00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    UsvStringType.assert("\uDC00\uD800", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assert(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    UsvStringType.assert(new String("0"), "test-1");
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

Deno.test("UsvStringType.fromCodePoints()", () => {
  assertStrictEquals(UsvStringType.fromCodePoints([]), "");
  assertStrictEquals(UsvStringType.fromCodePoints([48, 49, 50]), "012");
  assertStrictEquals(UsvStringType.fromCodePoints([12354, 12356]), "あい");
  assertStrictEquals(UsvStringType.fromCodePoints([131083]), "\u{2000B}");

  assertStrictEquals(
    UsvStringType.fromCodePoints([48, 49, 50, 131083, 12354, 12356]),
    "012\u{2000B}あい",
  );

  const e1 = "`value` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      [...UsvStringType.fromCodePoints(1 as unknown as number[])];
    },
    TypeError,
    e1,
  );

  const e2 = "`value[1]` must be a code point.";
  assertThrows(
    () => {
      [...UsvStringType.fromCodePoints([48, -1])];
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must not contain lone surrogate code points.";
  assertThrows(
    () => {
      [...UsvStringType.fromCodePoints([48, 0xDC00, 0xD800])];
    },
    RangeError,
    e3,
  );
});

Deno.test("UsvStringType.toCodePoints()", () => {
  assertStrictEquals(_iToS(UsvStringType.toCodePoints("")), `[]`);
  assertStrictEquals(_iToS(UsvStringType.toCodePoints("012")), `[48,49,50]`);
  assertStrictEquals(
    _iToS(UsvStringType.toCodePoints("あい")),
    `[12354,12356]`,
  );
  assertStrictEquals(
    _iToS(UsvStringType.toCodePoints("\u{2000B}")),
    `[131083]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(
    _iToS(UsvStringType.toCodePoints("012\u{2000B}あい")),
    `[48,49,50,131083,12354,12356]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...UsvStringType.toCodePoints(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...UsvStringType.toCodePoints("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});

Deno.test("UsvStringType.toGraphemes()", () => {
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("")), `[]`);
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("\u{2000B}")),
    `["\u{2000B}"]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...UsvStringType.toGraphemes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...UsvStringType.toGraphemes("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );

  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("0", { locale: "en" })),
    `["0"]`,
  );
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("0", { locale: "en-US" })),
    `["0"]`,
  );
  // assertStrictEquals(_iToS(UsvStringType.toGraphemes("0", {locale:"en-Latn-US"})), `["0"]`,);

  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("0", { locale: "ja" })),
    `["0"]`,
  );
  // assertStrictEquals(_iToS(UsvStringType.toGraphemes("0", {locale:"ja-Jpan"})), `["0"]`);
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("0", { locale: "ja-JP" })),
    `["0"]`,
  );
  // assertStrictEquals(_iToS(UsvStringType.toGraphemes("0", {locale:"ja-Jpan-JP"})), `["0"]`);

  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("g̈", { locale: "en" })),
    `["\u0067\u0308"]`,
  );
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("각")), `["\uAC01"]`);
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("각")),
    `["\u1100\u1161\u11A8"]`,
  );
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("ก")), `["\u0E01"]`);

  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("நி")),
    `["\u0BA8\u0BBF"]`,
  );
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("เ")), `["\u0E40"]`);
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("กำ")),
    `["\u0E01\u0E33"]`,
  );
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("षि")),
    `["\u0937\u093F"]`,
  );
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("क्षि")),
    `["\u0915\u094D\u0937\u093F"]`,
  );

  assertStrictEquals(_iToS(UsvStringType.toGraphemes("ำ")), `["\u0E33"]`);
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("ष")), `["\u0937"]`);
  assertStrictEquals(_iToS(UsvStringType.toGraphemes("ि")), `["\u093F"]`);

  // assertStrictEquals(_iToS(UsvStringType.toGraphemes("ch")), `["\u0063","\u0068"]`);
  // assertStrictEquals(_iToS(UsvStringType.toGraphemes("ch", {locale:"sk"})), `["\u0063\u0068"]`);
  // assertStrictEquals(_iToS(UsvStringType.toGraphemes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(_iToS(UsvStringType.toGraphemes("Ą́")), `["\u0104\u0301"]`);

  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b\u3099","\u585A\u{E0101}"]`,
  );
  assertStrictEquals(
    _iToS(UsvStringType.toGraphemes("𩸽が塚󠄁".normalize("NFC"))),
    `["\u{29E3D}","\u304C","\u585A\u{E0101}"]`,
  );
});
