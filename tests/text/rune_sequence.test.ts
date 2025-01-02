import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Text } from "../../mod.ts";

const { RuneSequence } = Text;

Deno.test("RuneSequence.is()", () => {
  assertStrictEquals(RuneSequence.is(0), false);
  assertStrictEquals(RuneSequence.is(0n), false);
  assertStrictEquals(RuneSequence.is(Number.NaN), false);
  assertStrictEquals(
    RuneSequence.is(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(RuneSequence.is(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(RuneSequence.is(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    RuneSequence.is(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(RuneSequence.is(undefined), false);
  assertStrictEquals(RuneSequence.is(null), false);
  assertStrictEquals(RuneSequence.is(true), false);
  assertStrictEquals(RuneSequence.is(false), false);
  assertStrictEquals(RuneSequence.is(""), true);
  assertStrictEquals(RuneSequence.is("0"), true);

  assertStrictEquals(RuneSequence.is("\uD800\uDC00"), true);
  assertStrictEquals(RuneSequence.is("\uDC00\uD800"), false);
});

Deno.test("RuneSequence.assert()", () => {
  try {
    RuneSequence.assert("", "test-1");
    RuneSequence.assert(" ", "test-1");
    RuneSequence.assert("0", "test-1");
    RuneSequence.assert("\u0000", "test-1");
    RuneSequence.assert("\uFFFF", "test-1");
    RuneSequence.assert("\u{10FFFF}", "test-1");
    RuneSequence.assert(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    RuneSequence.assert("\uD800\uDC00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    RuneSequence.assert("\uDC00\uD800", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneSequence.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneSequence.assert(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneSequence.assert(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("RuneSequence.isNonEmpty()", () => {
  assertStrictEquals(RuneSequence.isNonEmpty(0), false);
  assertStrictEquals(RuneSequence.isNonEmpty(0n), false);
  assertStrictEquals(RuneSequence.isNonEmpty(Number.NaN), false);
  assertStrictEquals(RuneSequence.isNonEmpty(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(RuneSequence.isNonEmpty(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(RuneSequence.isNonEmpty(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(RuneSequence.isNonEmpty(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(RuneSequence.isNonEmpty(undefined), false);
  assertStrictEquals(RuneSequence.isNonEmpty(null), false);
  assertStrictEquals(RuneSequence.isNonEmpty(true), false);
  assertStrictEquals(RuneSequence.isNonEmpty(false), false);
  assertStrictEquals(RuneSequence.isNonEmpty(""), false);
  assertStrictEquals(RuneSequence.isNonEmpty("0"), true);
  assertStrictEquals(RuneSequence.isNonEmpty("00"), true);

  assertStrictEquals(RuneSequence.isNonEmpty("\uD800\uDC00"), true);
  assertStrictEquals(RuneSequence.isNonEmpty("\uDC00\uD800"), false);
});

Deno.test("RuneSequence.assertNonEmpty()", () => {
  try {
    RuneSequence.assertNonEmpty("0", "test-1");
    RuneSequence.assertNonEmpty("00", "test-1");

    RuneSequence.assertNonEmpty("\uD800\uDC00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    RuneSequence.assertNonEmpty("\uDC00\uD800", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneSequence.assertNonEmpty("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneSequence.assertNonEmpty(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneSequence.assertNonEmpty(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneSequence.assertNonEmpty(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("RuneSequence.runeCountOf()", () => {
  assertStrictEquals(RuneSequence.runeCountOf(""), 0);
  assertStrictEquals(RuneSequence.runeCountOf("012"), 3);
  assertStrictEquals(RuneSequence.runeCountOf("あい"), 2);
  assertStrictEquals(RuneSequence.runeCountOf("\u{2000B}"), 1);

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      RuneSequence.runeCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      RuneSequence.runeCountOf("\u{dc0b}\u{d840}");
    },
    TypeError,
    e1,
  );
});

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("RuneSequence.toRunes()", () => {
  assertStrictEquals(_iToS(RuneSequence.toRunes("")), `[]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(RuneSequence.toRunes("\u{2000B}")),
    `["\u{2000B}"]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(_iToS(RuneSequence.toRunes("g̈")), `["\u0067","\u0308"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("각")), `["\uAC01"]`);
  assertStrictEquals(
    _iToS(RuneSequence.toRunes("각")),
    `["\u1100","\u1161","\u11A8"]`,
  );
  assertStrictEquals(_iToS(RuneSequence.toRunes("ก")), `["\u0E01"]`);

  assertStrictEquals(_iToS(RuneSequence.toRunes("நி")), `["\u0BA8","\u0BBF"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("เ")), `["\u0E40"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("กำ")), `["\u0E01","\u0E33"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("षि")), `["\u0937","\u093F"]`);
  assertStrictEquals(
    _iToS(RuneSequence.toRunes("क्षि")),
    `["\u0915","\u094D","\u0937","\u093F"]`,
  );

  assertStrictEquals(_iToS(RuneSequence.toRunes("ำ")), `["\u0E33"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("ष")), `["\u0937"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("ि")), `["\u093F"]`);

  assertStrictEquals(_iToS(RuneSequence.toRunes("ch")), `["\u0063","\u0068"]`);
  assertStrictEquals(_iToS(RuneSequence.toRunes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(_iToS(RuneSequence.toRunes("Ą́")), `["\u0104","\u0301"]`);

  assertStrictEquals(
    _iToS(RuneSequence.toRunes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b","\u3099","\u585A","\u{E0101}"]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...RuneSequence.toRunes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...RuneSequence.toRunes("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});

Deno.test("RuneSequence.fromCodePoints()", () => {
  assertStrictEquals(RuneSequence.fromCodePoints([]), "");
  assertStrictEquals(RuneSequence.fromCodePoints([48, 49, 50]), "012");
  assertStrictEquals(RuneSequence.fromCodePoints([12354, 12356]), "あい");
  assertStrictEquals(RuneSequence.fromCodePoints([131083]), "\u{2000B}");

  assertStrictEquals(
    RuneSequence.fromCodePoints([48, 49, 50, 131083, 12354, 12356]),
    "012\u{2000B}あい",
  );

  const e1 = "`value` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      [...RuneSequence.fromCodePoints(1 as unknown as number[])];
    },
    TypeError,
    e1,
  );

  const e2 = "`value[1]` must be a code point.";
  assertThrows(
    () => {
      [...RuneSequence.fromCodePoints([48, -1])];
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must not contain lone surrogate code points.";
  assertThrows(
    () => {
      [...RuneSequence.fromCodePoints([48, 0xDC00, 0xD800])];
    },
    RangeError,
    e3,
  );
});

Deno.test("RuneSequence.toCodePoints()", () => {
  assertStrictEquals(_iToS(RuneSequence.toCodePoints("")), `[]`);
  assertStrictEquals(_iToS(RuneSequence.toCodePoints("012")), `[48,49,50]`);
  assertStrictEquals(
    _iToS(RuneSequence.toCodePoints("あい")),
    `[12354,12356]`,
  );
  assertStrictEquals(
    _iToS(RuneSequence.toCodePoints("\u{2000B}")),
    `[131083]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(
    _iToS(RuneSequence.toCodePoints("012\u{2000B}あい")),
    `[48,49,50,131083,12354,12356]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...RuneSequence.toCodePoints(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...RuneSequence.toCodePoints("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});
/*
Deno.test("RuneSequence.toGraphemes()", () => {
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("")), `[]`);
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("\u{2000B}")),
    `["\u{2000B}"]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...RuneSequence.toGraphemes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...RuneSequence.toGraphemes("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );

  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("0", { locale: "en" })),
    `["0"]`,
  );
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("0", { locale: "en-US" })),
    `["0"]`,
  );
  // assertStrictEquals(_iToS(RuneSequence.toGraphemes("0", {locale:"en-Latn-US"})), `["0"]`,);

  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("0", { locale: "ja" })),
    `["0"]`,
  );
  // assertStrictEquals(_iToS(RuneSequence.toGraphemes("0", {locale:"ja-Jpan"})), `["0"]`);
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("0", { locale: "ja-JP" })),
    `["0"]`,
  );
  // assertStrictEquals(_iToS(RuneSequence.toGraphemes("0", {locale:"ja-Jpan-JP"})), `["0"]`);

  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("g̈", { locale: "en" })),
    `["\u0067\u0308"]`,
  );
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("각")), `["\uAC01"]`);
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("각")),
    `["\u1100\u1161\u11A8"]`,
  );
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("ก")), `["\u0E01"]`);

  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("நி")),
    `["\u0BA8\u0BBF"]`,
  );
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("เ")), `["\u0E40"]`);
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("กำ")),
    `["\u0E01\u0E33"]`,
  );
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("षि")),
    `["\u0937\u093F"]`,
  );
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("क्षि")),
    `["\u0915\u094D\u0937\u093F"]`,
  );

  assertStrictEquals(_iToS(RuneSequence.toGraphemes("ำ")), `["\u0E33"]`);
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("ष")), `["\u0937"]`);
  assertStrictEquals(_iToS(RuneSequence.toGraphemes("ि")), `["\u093F"]`);

  // assertStrictEquals(_iToS(RuneSequence.toGraphemes("ch")), `["\u0063","\u0068"]`);
  // assertStrictEquals(_iToS(RuneSequence.toGraphemes("ch", {locale:"sk"})), `["\u0063\u0068"]`);
  // assertStrictEquals(_iToS(RuneSequence.toGraphemes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(_iToS(RuneSequence.toGraphemes("Ą́")), `["\u0104\u0301"]`);

  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b\u3099","\u585A\u{E0101}"]`,
  );
  assertStrictEquals(
    _iToS(RuneSequence.toGraphemes("𩸽が塚󠄁".normalize("NFC"))),
    `["\u{29E3D}","\u304C","\u585A\u{E0101}"]`,
  );
});

*/
