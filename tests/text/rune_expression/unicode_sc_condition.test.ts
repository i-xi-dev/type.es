import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { RuneExpression } = Text;

Deno.test("Text.RuneExpression.fromScripts()", () => {
  const c0 = RuneExpression.fromScripts([]);
  assertStrictEquals(c0.isMatch("A"), false);
  assertStrictEquals(c0.isMatch("0"), false);

  const c1 = RuneExpression.fromScripts(["Latn"]);
  assertStrictEquals(c1.isMatch("A"), true);
  assertStrictEquals(c1.isMatch("0"), false);

  assertThrows(
    () => {
      RuneExpression.fromScripts(undefined as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromScripts("Latn" as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromScripts(["2222"] as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );
  assertThrows(
    () => {
      RuneExpression.fromScripts([1] as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );
});

Deno.test(" _UnicodeScriptCondition.prototype.isMatch() - codepoint", () => {
  const scs1 = RuneExpression.fromScripts(["Kana"]);
  assertStrictEquals(scs1.isMatch(0x30A2), true);
  assertStrictEquals(scs1.isMatch(0x3042), false);
  assertStrictEquals(scs1.isMatch(0x30FC), true);
  assertStrictEquals(scs1.isMatch(0x3099), true);

  assertThrows(
    () => {
      scs1.isMatch(-1);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      scs1.isMatch(0x110000);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
});

Deno.test(" _UnicodeScriptCondition.prototype.isMatch() - rune", () => {
  const scs1 = RuneExpression.fromScripts(["Kana"]);
  assertStrictEquals(scs1.isMatch("ア"), true);
  assertStrictEquals(scs1.isMatch("あ"), false);
  assertStrictEquals(scs1.isMatch("ー"), true);
  assertStrictEquals(scs1.isMatch("\u3099"), true);

  const scs2 = RuneExpression.fromScripts(["Hira"]);
  assertStrictEquals(scs2.isMatch("ア"), false);
  assertStrictEquals(scs2.isMatch("あ"), true);
  assertStrictEquals(scs2.isMatch("ー"), true);
  assertStrictEquals(scs2.isMatch("\u3099"), true);

  const opEx = { excludeScx: true } as const;
  const scs1x = RuneExpression.fromScripts(["Kana"], opEx);
  assertStrictEquals(scs1x.isMatch("ア"), true);
  assertStrictEquals(scs1x.isMatch("あ"), false);
  assertStrictEquals(scs1x.isMatch("ー"), false);
  assertStrictEquals(scs1x.isMatch("\u3099"), false);

  const scs2x = RuneExpression.fromScripts(["Hira"], opEx);
  assertStrictEquals(scs2x.isMatch("ア"), false);
  assertStrictEquals(scs2x.isMatch("あ"), true);
  assertStrictEquals(scs2x.isMatch("ー"), false);
  assertStrictEquals(scs2x.isMatch("\u3099"), false);

  const scs10 = RuneExpression.fromScripts(["Latn"]);
  assertStrictEquals(scs10.isMatch("a"), true);
  assertStrictEquals(scs10.isMatch("1"), false);
  assertThrows(
    () => {
      scs10.isMatch("");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      scs10.isMatch("aa");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );

  const scs11 = RuneExpression.fromScripts(["Latn", "Kana"]);
  assertStrictEquals(scs11.isMatch("ア"), true);
  assertStrictEquals(scs11.isMatch("あ"), false);
  assertStrictEquals(scs11.isMatch("ー"), true);
  assertStrictEquals(scs11.isMatch("\u3099"), true);
  assertStrictEquals(scs11.isMatch("a"), true);

  const scs00 = RuneExpression.fromScripts([]);
  assertStrictEquals(scs00.isMatch("ア"), false);
  assertStrictEquals(scs00.isMatch("あ"), false);
  assertStrictEquals(scs00.isMatch("ー"), false);
  assertStrictEquals(scs00.isMatch("\u3099"), false);
  assertStrictEquals(scs00.isMatch("a"), false);
});

Deno.test(" _UnicodeScriptCondition.prototype.findMatchedRunes()", () => {
  const s1 = RuneExpression.fromScripts(["Latn"]);
  const r1a = s1.findMatchedRunes("123DE6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a]),
    `[{"rune":"D","runeIndex":3},{"rune":"E","runeIndex":4},{"rune":"G","runeIndex":6},{"rune":"h","runeIndex":7},{"rune":"i","runeIndex":8},{"rune":"j","runeIndex":9},{"rune":"E","runeIndex":10}]`,
  );
  const r1b = s1.findMatchedRunes("");
  assertStrictEquals(JSON.stringify([...r1b]), `[]`);

  assertThrows(
    () => {
      s1.findMatchedRunes("\uD800");
    },
    TypeError,
    "`text` must be a `USVString`.",
  );
});
