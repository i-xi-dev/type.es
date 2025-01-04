import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Text } from "../../mod.ts";

const { RuneString } = Text;

Deno.test("RuneString.is()", () => {
  assertStrictEquals(RuneString.is(0), false);
  assertStrictEquals(RuneString.is(0n), false);
  assertStrictEquals(RuneString.is(Number.NaN), false);
  assertStrictEquals(
    RuneString.is(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(RuneString.is(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(RuneString.is(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(
    RuneString.is(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(RuneString.is(undefined), false);
  assertStrictEquals(RuneString.is(null), false);
  assertStrictEquals(RuneString.is(true), false);
  assertStrictEquals(RuneString.is(false), false);
  assertStrictEquals(RuneString.is(""), true);
  assertStrictEquals(RuneString.is("0"), true);

  assertStrictEquals(RuneString.is("\uD800\uDC00"), true);
  assertStrictEquals(RuneString.is("\uDC00\uD800"), false);
});

Deno.test("RuneString.assert()", () => {
  try {
    RuneString.assert("", "test-1");
    RuneString.assert(" ", "test-1");
    RuneString.assert("0", "test-1");
    RuneString.assert("\u0000", "test-1");
    RuneString.assert("\uFFFF", "test-1");
    RuneString.assert("\u{10FFFF}", "test-1");
    RuneString.assert(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    RuneString.assert("\uD800\uDC00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    RuneString.assert("\uDC00\uD800", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneString.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneString.assert(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneString.assert(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("RuneString.isNonEmpty()", () => {
  assertStrictEquals(RuneString.isNonEmpty(0), false);
  assertStrictEquals(RuneString.isNonEmpty(0n), false);
  assertStrictEquals(RuneString.isNonEmpty(Number.NaN), false);
  assertStrictEquals(RuneString.isNonEmpty(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(RuneString.isNonEmpty(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(RuneString.isNonEmpty(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(RuneString.isNonEmpty(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(RuneString.isNonEmpty(undefined), false);
  assertStrictEquals(RuneString.isNonEmpty(null), false);
  assertStrictEquals(RuneString.isNonEmpty(true), false);
  assertStrictEquals(RuneString.isNonEmpty(false), false);
  assertStrictEquals(RuneString.isNonEmpty(""), false);
  assertStrictEquals(RuneString.isNonEmpty("0"), true);
  assertStrictEquals(RuneString.isNonEmpty("00"), true);

  assertStrictEquals(RuneString.isNonEmpty("\uD800\uDC00"), true);
  assertStrictEquals(RuneString.isNonEmpty("\uDC00\uD800"), false);
});

Deno.test("RuneString.assertNonEmpty()", () => {
  try {
    RuneString.assertNonEmpty("0", "test-1");
    RuneString.assertNonEmpty("00", "test-1");

    RuneString.assertNonEmpty("\uD800\uDC00", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    RuneString.assertNonEmpty("\uDC00\uD800", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneString.assertNonEmpty("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneString.assertNonEmpty(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneString.assertNonEmpty(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    RuneString.assertNonEmpty(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("RuneString.runeCountOf()", () => {
  assertStrictEquals(RuneString.runeCountOf(""), 0);
  assertStrictEquals(RuneString.runeCountOf("012"), 3);
  assertStrictEquals(RuneString.runeCountOf("あい"), 2);
  assertStrictEquals(RuneString.runeCountOf("\u{2000B}"), 1);

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      RuneString.runeCountOf(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      RuneString.runeCountOf("\u{dc0b}\u{d840}");
    },
    TypeError,
    e1,
  );
});

Deno.test("RuneString.runeCountOf() - allowMalformed", () => {
  const op = { allowMalformed: true } as const;

  assertStrictEquals(RuneString.runeCountOf("", op), 0);
  assertStrictEquals(RuneString.runeCountOf("012", op), 3);
  assertStrictEquals(RuneString.runeCountOf("あい", op), 2);
  assertStrictEquals(RuneString.runeCountOf("\u{2000B}", op), 1);

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      RuneString.runeCountOf(undefined as unknown as string, op);
    },
    TypeError,
    e1,
  );

  assertStrictEquals(RuneString.runeCountOf("\u{dc0b}\u{d840}", op), 2);
});

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("RuneString.toRunes()", () => {
  assertStrictEquals(_iToS(RuneString.toRunes("")), `[]`);
  assertStrictEquals(_iToS(RuneString.toRunes("012")), `["0","1","2"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("あい")), `["あ","い"]`);
  assertStrictEquals(
    _iToS(RuneString.toRunes("\u{2000B}")),
    `["\u{2000B}"]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(_iToS(RuneString.toRunes("g̈")), `["\u0067","\u0308"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("각")), `["\uAC01"]`);
  assertStrictEquals(
    _iToS(RuneString.toRunes("각")),
    `["\u1100","\u1161","\u11A8"]`,
  );
  assertStrictEquals(_iToS(RuneString.toRunes("ก")), `["\u0E01"]`);

  assertStrictEquals(_iToS(RuneString.toRunes("நி")), `["\u0BA8","\u0BBF"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("เ")), `["\u0E40"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("กำ")), `["\u0E01","\u0E33"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("षि")), `["\u0937","\u093F"]`);
  assertStrictEquals(
    _iToS(RuneString.toRunes("क्षि")),
    `["\u0915","\u094D","\u0937","\u093F"]`,
  );

  assertStrictEquals(_iToS(RuneString.toRunes("ำ")), `["\u0E33"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("ष")), `["\u0937"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("ि")), `["\u093F"]`);

  assertStrictEquals(_iToS(RuneString.toRunes("ch")), `["\u0063","\u0068"]`);
  assertStrictEquals(_iToS(RuneString.toRunes("kʷ")), `["\u006B","\u02B7"]`);

  assertStrictEquals(_iToS(RuneString.toRunes("Ą́")), `["\u0104","\u0301"]`);

  assertStrictEquals(
    _iToS(RuneString.toRunes("𩸽が塚󠄁")),
    `["\u{29E3D}","\u304b","\u3099","\u585A","\u{E0101}"]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...RuneString.toRunes(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...RuneString.toRunes("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});

Deno.test("RuneString.fromCodePoints()", () => {
  assertStrictEquals(RuneString.fromCodePoints([]), "");
  assertStrictEquals(RuneString.fromCodePoints([48, 49, 50]), "012");
  assertStrictEquals(RuneString.fromCodePoints([12354, 12356]), "あい");
  assertStrictEquals(RuneString.fromCodePoints([131083]), "\u{2000B}");

  assertStrictEquals(
    RuneString.fromCodePoints([48, 49, 50, 131083, 12354, 12356]),
    "012\u{2000B}あい",
  );

  const e1 = "`value` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      [...RuneString.fromCodePoints(1 as unknown as number[])];
    },
    TypeError,
    e1,
  );

  const e2 = "`value[1]` must be a code point.";
  assertThrows(
    () => {
      [...RuneString.fromCodePoints([48, -1])];
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must not contain lone surrogate code points.";
  assertThrows(
    () => {
      [...RuneString.fromCodePoints([48, 0xDC00, 0xD800])];
    },
    RangeError,
    e3,
  );
});

Deno.test("RuneString.toCodePoints()", () => {
  assertStrictEquals(_iToS(RuneString.toCodePoints("")), `[]`);
  assertStrictEquals(_iToS(RuneString.toCodePoints("012")), `[48,49,50]`);
  assertStrictEquals(
    _iToS(RuneString.toCodePoints("あい")),
    `[12354,12356]`,
  );
  assertStrictEquals(
    _iToS(RuneString.toCodePoints("\u{2000B}")),
    `[131083]`,
  ); // JSONの仕様ではサロゲートペアをエスケープするだったような

  assertStrictEquals(
    _iToS(RuneString.toCodePoints("012\u{2000B}あい")),
    `[48,49,50,131083,12354,12356]`,
  );

  const e1 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      [...RuneString.toCodePoints(undefined as unknown as string)];
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      [...RuneString.toCodePoints("\u{dc0b}\u{d840}")];
    },
    TypeError,
    e1,
  );
});
