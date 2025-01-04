import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../mod.ts";
const { GraphemeSequence } = Text;

function _iToS(iterable: Iterable<string | number>): string {
  return JSON.stringify([...iterable]);
}

Deno.test("GraphemeSequence.fromString()", () => {
  const g1 = GraphemeSequence.fromString("");
  assertStrictEquals(_iToS(g1.toArray()), `[]`);

  const g2 = GraphemeSequence.fromString("012");
  assertStrictEquals(_iToS(g2.toArray()), `["0","1","2"]`);

  const g3 = GraphemeSequence.fromString("あい");
  assertStrictEquals(_iToS(g3.toArray()), `["あ","い"]`);

  const g4 = GraphemeSequence.fromString("\u{2000B}");
  assertStrictEquals(_iToS(g4.toArray()), `["\u{2000B}"]`);

  const e1 = "`value` must be a `string`.";
  assertThrows(
    () => {
      GraphemeSequence.fromString(null as unknown as string, {
        allowMalformed: true,
      });
    },
    TypeError,
    e1,
  );

  const gx1 = GraphemeSequence.fromString("\u{dc0b}\u{d840}", {
    allowMalformed: true,
  });
  assertStrictEquals(_iToS(gx1.toArray()), `["\\udc0b","\\ud840"]`);

  const e2 = "`value` must be a `USVString`.";
  assertThrows(
    () => {
      GraphemeSequence.fromString(null as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      GraphemeSequence.fromString("\u{dc0b}\u{d840}");
    },
    TypeError,
    e2,
  );

  const g5 = GraphemeSequence.fromString("0", { locale: "en" });
  assertStrictEquals(_iToS(g5.toArray()), `["0"]`);
  assertStrictEquals(g5.locale.baseName, "en");

  const g6 = GraphemeSequence.fromString("0", { locale: "en-US" });
  assertStrictEquals(_iToS(g6.toArray()), `["0"]`);
  assertStrictEquals(g6.locale.baseName, "en-US");

  const g7 = GraphemeSequence.fromString("0", { locale: "en-Latn-US" });
  assertStrictEquals(_iToS(g7.toArray()), `["0"]`);
  // assertStrictEquals(g7.locale.baseName, "en-Latn-US");

  const g8 = GraphemeSequence.fromString("0", { locale: "ja" });
  assertStrictEquals(_iToS(g8.toArray()), `["0"]`);
  assertStrictEquals(g8.locale.baseName, "ja");

  const g9 = GraphemeSequence.fromString("0", { locale: "ja-JP" });
  assertStrictEquals(_iToS(g9.toArray()), `["0"]`);
  assertStrictEquals(g9.locale.baseName, "ja-JP");

  const g10 = GraphemeSequence.fromString("0", { locale: "ja-Jpan-JP" });
  assertStrictEquals(_iToS(g10.toArray()), `["0"]`);
  // assertStrictEquals(g10.locale.baseName, "ja-Jpan-JP");

  const g11 = GraphemeSequence.fromString("g̈", { locale: "en" });
  assertStrictEquals(_iToS(g11.toArray()), `["\u0067\u0308"]`);

  const g12 = GraphemeSequence.fromString("각", { locale: "en" });
  assertStrictEquals(_iToS(g12.toArray()), `["\uAC01"]`);

  const g13 = GraphemeSequence.fromString("각", { locale: "en" });
  assertStrictEquals(_iToS(g13.toArray()), `["\u1100\u1161\u11A8"]`);

  const g14 = GraphemeSequence.fromString("ก", { locale: "en" });
  assertStrictEquals(_iToS(g14.toArray()), `["\u0E01"]`);

  const g15 = GraphemeSequence.fromString("நி", { locale: "en" });
  assertStrictEquals(_iToS(g15.toArray()), `["\u0BA8\u0BBF"]`);

  const g16 = GraphemeSequence.fromString("เ", { locale: "en" });
  assertStrictEquals(_iToS(g16.toArray()), `["\u0E40"]`);

  const g17 = GraphemeSequence.fromString("กำ", { locale: "en" });
  assertStrictEquals(_iToS(g17.toArray()), `["\u0E01\u0E33"]`);

  const g18 = GraphemeSequence.fromString("षि", { locale: "en" });
  assertStrictEquals(_iToS(g18.toArray()), `["\u0937\u093F"]`);

  const g19 = GraphemeSequence.fromString("क्षि", { locale: "en" });
  assertStrictEquals(_iToS(g19.toArray()), `["\u0915\u094D\u0937\u093F"]`);

  const g20 = GraphemeSequence.fromString("ำ", { locale: "en" });
  assertStrictEquals(_iToS(g20.toArray()), `["\u0E33"]`);

  const g21 = GraphemeSequence.fromString("ष", { locale: "en" });
  assertStrictEquals(_iToS(g21.toArray()), `["\u0937"]`);

  const g22 = GraphemeSequence.fromString("ि", { locale: "en" });
  assertStrictEquals(_iToS(g22.toArray()), `["\u093F"]`);

  const g23 = GraphemeSequence.fromString("ch", { locale: "en" });
  assertStrictEquals(_iToS(g23.toArray()), `["\u0063","\u0068"]`);

  // const g24 = GraphemeSequence.fromString("ch", { locale: "sk" });
  // assertStrictEquals(_iToS(g24.toArray()), `["\u0063\u0068"]`);

  const g25 = GraphemeSequence.fromString("kʷ", { locale: "en" });
  assertStrictEquals(_iToS(g25.toArray()), `["\u006B","\u02B7"]`);

  const g26 = GraphemeSequence.fromString("Ą́", { locale: "en" });
  assertStrictEquals(_iToS(g26.toArray()), `["\u0104\u0301"]`);

  const g27 = GraphemeSequence.fromString("𩸽が塚󠄁", { locale: "en" });
  assertStrictEquals(
    _iToS(g27.toArray()),
    `["\u{29E3D}","\u304b\u3099","\u585A\u{E0101}"]`,
  );

  const g27b = GraphemeSequence.fromString("𩸽が塚󠄁", {
    locale: "en",
    normalization: "NFC",
  });
  assertStrictEquals(
    _iToS(g27b.toArray()),
    `["\u{29E3D}","\u304C","\u585A\u{E0101}"]`,
  );
});

Deno.test("Script/includesAll()", () => {
  const opEx = { excludeScx: true } as const;

  const g1 = GraphemeSequence.fromString("ア");
  assertStrictEquals(g1.isBelongToScripts("Kana"), true);
  assertStrictEquals(g1.isBelongToScripts("Hira"), false);
  assertStrictEquals(g1.isBelongToScripts("Kana", opEx), true);
  assertStrictEquals(g1.isBelongToScripts("Hira", opEx), false);

  const g2 = GraphemeSequence.fromString("あ");
  assertStrictEquals(g2.isBelongToScripts("Kana"), false);
  assertStrictEquals(g2.isBelongToScripts("Hira"), true);
  assertStrictEquals(g2.isBelongToScripts("Kana", opEx), false);
  assertStrictEquals(g2.isBelongToScripts("Hira", opEx), true);

  const g3 = GraphemeSequence.fromString("ー");
  assertStrictEquals(g3.isBelongToScripts("Kana"), true);
  assertStrictEquals(g3.isBelongToScripts("Hira"), true);
  assertStrictEquals(g3.isBelongToScripts("Kana", opEx), false);
  assertStrictEquals(g3.isBelongToScripts("Hira", opEx), false);

  const g4 = GraphemeSequence.fromString("か\u3099");
  assertStrictEquals(g4.isBelongToScripts("Kana"), false);
  assertStrictEquals(g4.isBelongToScripts("Hira"), true);
  assertStrictEquals(g4.isBelongToScripts("Kana", opEx), false);
  assertStrictEquals(g4.isBelongToScripts("Hira", opEx), false);

  const g5 = GraphemeSequence.fromString("カ\u3099");
  assertStrictEquals(g5.isBelongToScripts("Kana"), true);
  assertStrictEquals(g5.isBelongToScripts("Hira"), false);
  assertStrictEquals(g5.isBelongToScripts("Kana", opEx), false);
  assertStrictEquals(g5.isBelongToScripts("Hira", opEx), false);

  const g6 = GraphemeSequence.fromString("");
  assertStrictEquals(g6.isBelongToScripts("Latn"), true);
  assertStrictEquals(g6.isBelongToScripts("Latn", opEx), true);
  assertStrictEquals(g6.isBelongToScripts(["Latn", "Zyyy"], opEx), true);

  const g7 = GraphemeSequence.fromString("a");
  assertStrictEquals(g7.isBelongToScripts("Latn"), true);
  assertStrictEquals(g7.isBelongToScripts("Latn", opEx), true);
  assertStrictEquals(g7.isBelongToScripts(["Latn", "Zyyy"], opEx), true);

  const g8 = GraphemeSequence.fromString("aa");
  assertStrictEquals(g8.isBelongToScripts("Latn"), true);
  assertStrictEquals(g8.isBelongToScripts("Latn", opEx), true);
  assertStrictEquals(g8.isBelongToScripts(["Latn", "Zyyy"], opEx), true);

  const g9 = GraphemeSequence.fromString("1aa");
  assertStrictEquals(g9.isBelongToScripts("Latn"), false);
  assertStrictEquals(g9.isBelongToScripts("Latn", opEx), false);
  assertStrictEquals(g9.isBelongToScripts(["Latn", "Zyyy"], opEx), true);

  const g10 = GraphemeSequence.fromString("a1a");
  assertStrictEquals(g10.isBelongToScripts("Latn"), false);
  assertStrictEquals(g10.isBelongToScripts("Latn", opEx), false);
  assertStrictEquals(g10.isBelongToScripts(["Latn", "Zyyy"], opEx), true);

  const g11 = GraphemeSequence.fromString("aa1");
  assertStrictEquals(g11.isBelongToScripts("Latn"), false);
  assertStrictEquals(g11.isBelongToScripts("Latn", opEx), false);
  assertStrictEquals(g11.isBelongToScripts(["Latn", "Zyyy"], opEx), true);

  const g12 = GraphemeSequence.fromString("aaa");
  assertStrictEquals(g12.isBelongToScripts("Latn"), true);
  assertStrictEquals(g12.isBelongToScripts("Latn", opEx), true);
  assertStrictEquals(g12.isBelongToScripts(["Latn", "Zyyy"], opEx), true);

  assertThrows(
    () => {
      g12.isBelongToScripts("Zsym");
    },
    RangeError,
    "At least one of `scripts` is not supported in Unicode property.",
  );
});
