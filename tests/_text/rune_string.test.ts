import { assertStrictEquals, assertThrows } from "@std/assert";
import { xText } from "../../mod.ts";

const { RuneString } = xText;

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

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
