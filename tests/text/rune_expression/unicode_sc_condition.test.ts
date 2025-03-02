import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { SimpleCondition } = Text;

Deno.test("Text.SimpleCondition.fromScripts()", () => {
  const c0 = SimpleCondition.fromScripts([]);
  assertStrictEquals(c0.isMatch("A"), false);
  assertStrictEquals(c0.isMatch("0"), false);

  const c1 = SimpleCondition.fromScripts(["Latn"]);
  assertStrictEquals(c1.isMatch("A"), true);
  assertStrictEquals(c1.isMatch("0"), false);

  assertThrows(
    () => {
      SimpleCondition.fromScripts(undefined as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromScripts("Latn" as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromScripts(["2222"] as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromScripts([1] as unknown as ["Latn"]);
    },
    TypeError,
    "`scripts[*]` must be a supported script in Unicode property.",
  );
});

Deno.test("Text.SimpleCondition.prototype.isMatch() - _UnicodeScriptCondition codepoint", () => {
  const scs1 = SimpleCondition.fromScripts(["Kana"]);
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

Deno.test("Text.SimpleCondition.prototype.isMatch() - _UnicodeScriptCondition rune", () => {
  const scs1 = SimpleCondition.fromScripts(["Kana"]);
  assertStrictEquals(scs1.isMatch("ア"), true);
  assertStrictEquals(scs1.isMatch("あ"), false);
  assertStrictEquals(scs1.isMatch("ー"), true);
  assertStrictEquals(scs1.isMatch("\u3099"), true);

  const scs2 = SimpleCondition.fromScripts(["Hira"]);
  assertStrictEquals(scs2.isMatch("ア"), false);
  assertStrictEquals(scs2.isMatch("あ"), true);
  assertStrictEquals(scs2.isMatch("ー"), true);
  assertStrictEquals(scs2.isMatch("\u3099"), true);

  const opEx = { excludeScx: true } as const;
  const scs1x = SimpleCondition.fromScripts(["Kana"], opEx);
  assertStrictEquals(scs1x.isMatch("ア"), true);
  assertStrictEquals(scs1x.isMatch("あ"), false);
  assertStrictEquals(scs1x.isMatch("ー"), false);
  assertStrictEquals(scs1x.isMatch("\u3099"), false);

  const scs2x = SimpleCondition.fromScripts(["Hira"], opEx);
  assertStrictEquals(scs2x.isMatch("ア"), false);
  assertStrictEquals(scs2x.isMatch("あ"), true);
  assertStrictEquals(scs2x.isMatch("ー"), false);
  assertStrictEquals(scs2x.isMatch("\u3099"), false);

  const scs10 = SimpleCondition.fromScripts(["Latn"]);
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

  const scs11 = SimpleCondition.fromScripts(["Latn", "Kana"]);
  assertStrictEquals(scs11.isMatch("ア"), true);
  assertStrictEquals(scs11.isMatch("あ"), false);
  assertStrictEquals(scs11.isMatch("ー"), true);
  assertStrictEquals(scs11.isMatch("\u3099"), true);
  assertStrictEquals(scs11.isMatch("a"), true);

  const scs00 = SimpleCondition.fromScripts([]);
  assertStrictEquals(scs00.isMatch("ア"), false);
  assertStrictEquals(scs00.isMatch("あ"), false);
  assertStrictEquals(scs00.isMatch("ー"), false);
  assertStrictEquals(scs00.isMatch("\u3099"), false);
  assertStrictEquals(scs00.isMatch("a"), false);
});
