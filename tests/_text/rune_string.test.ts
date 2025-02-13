import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../mod.ts";

const { RuneString } = Text;

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
      RuneString.toRunes(undefined as unknown as string);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      RuneString.toRunes("\u{dc0b}\u{d840}");
    },
    TypeError,
    e1,
  );

  const op = { allowMalformed: true } as const;
  const e2 = "`value` must be a `string`.";
  assertThrows(
    () => {
      RuneString.toRunes(undefined as unknown as string, op);
    },
    TypeError,
    e2,
  );

  assertStrictEquals(
    _iToS(RuneString.toRunes("\u{dc0b}\u{d840}", op)),
    `["\\udc0b","\\ud840"]`,
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

  const op = { allowMalformed: true } as const;
  assertStrictEquals(
    RuneString.fromCodePoints([48, 0xDC00, 0xD800], op),
    "0\uDC00\uD800",
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
      RuneString.toCodePoints(undefined as unknown as string);
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

  const op = { allowMalformed: true } as const;
  const e2 = "`value` must be a `string`.";
  assertThrows(
    () => {
      RuneString.toCodePoints(undefined as unknown as string, op);
    },
    TypeError,
    e2,
  );
  assertStrictEquals(
    _iToS(RuneString.toCodePoints("\u{dc0b}\u{d840}", op)),
    `[56331,55360]`,
  );
});

// Deno.test("Rune.isInScript()", () => {
//   const opEx = { excludeScx: true } as const;

//   assertStrictEquals(Rune.isInScript("ア", "Kana"), true);
//   assertStrictEquals(Rune.isInScript("ア", "Hira"), false);
//   //assertStrictEquals(Rune.isInScript("ア", "Kana", opEx), true);
//   //assertStrictEquals(Rune.isInScript("ア", "Hira", opEx), false);

//   assertStrictEquals(Rune.isInScript("あ", "Kana"), false);
//   assertStrictEquals(Rune.isInScript("あ", "Hira"), true);
//   //assertStrictEquals(Rune.isInScript("あ", "Kana", opEx), false);
//   //assertStrictEquals(Rune.isInScript("あ", "Hira", opEx), true);

//   assertStrictEquals(Rune.isInScript("ー", "Kana"), true);
//   assertStrictEquals(Rune.isInScript("ー", "Hira"), true);
//   //assertStrictEquals(Rune.isInScript("ー","Kana", opEx), false);
//   //assertStrictEquals(Rune.isInScript("ー","Hira", opEx), false);

//   // "か\u3099"
//   assertStrictEquals(Rune.isInScript("\u3099", "Kana"), true);
//   assertStrictEquals(Rune.isInScript("\u3099", "Hira"), true);

//   // "カ\u3099"

//   // assertThrows(
//   //   () => {
//   //     Rune.isInScript("", "Latn");
//   //   },
//   //   RangeError,
//   //   "xxx.",
//   // );
//   assertStrictEquals(Rune.isInScript("", "Latn"), false);

//   assertStrictEquals(Rune.isInScript("a", "Latn"), true);
//   //assertStrictEquals(Rune.isInScript("a","Latn", opEx), true);
//   //assertStrictEquals(Rune.isInScript("a",["Latn", "Zyyy"], opEx), true);

//   // assertThrows(
//   //   () => {
//   //     Rune.isInScript("aa", "Latn");
//   //   },
//   //   RangeError,
//   //   "xxx.",
//   // );
//   assertStrictEquals(Rune.isInScript("aa", "Latn"), false);

//   assertThrows(
//     () => {
//       Rune.isInScript("a", "Zsym");
//     },
//     RangeError,
//     "`Zsym` is not supported in Unicode property.",
//   );
// });
