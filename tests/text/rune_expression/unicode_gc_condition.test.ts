import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { RuneExpression } = Text;

Deno.test("Text.RuneExpression.fromGeneralCategories()", () => {
  // const c0 = RuneExpression.fromGeneralCategories([]);
  // assertStrictEquals(c0.isMatch("A"), false);
  // assertStrictEquals(c0.isMatch("0"), false);

  const c1 = RuneExpression.fromGeneralCategories(["L"]);
  assertStrictEquals(c1.isMatch("A"), true);
  assertStrictEquals(c1.isMatch("0"), false);

  assertThrows(
    () => {
      RuneExpression.fromGeneralCategories([]);
    },
    TypeError,
    "`gcs` must have 1 or more `General_Category` values.",
  );

  assertThrows(
    () => {
      RuneExpression.fromGeneralCategories(undefined as unknown as ["L"]);
    },
    TypeError,
    "`gcs` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromGeneralCategories("L" as unknown as ["L"]);
    },
    TypeError,
    "`gcs` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      RuneExpression.fromGeneralCategories(["5"] as unknown as ["L"]);
    },
    TypeError,
    "`gcs[*]` must be an Unicode `General_Category` value.",
  );
  assertThrows(
    () => {
      RuneExpression.fromGeneralCategories([1] as unknown as ["L"]);
    },
    TypeError,
    "`gcs[*]` must be an Unicode `General_Category` value.",
  );
});

Deno.test(" _GeneralCategoryExpression.prototype.isMatch() - codepoint", () => {
  const gcs1 = RuneExpression.fromGeneralCategories(["Lu"]);
  assertStrictEquals(gcs1.isMatch(0x4C), true);
  assertStrictEquals(gcs1.isMatch(0x6C), false);
  assertStrictEquals(gcs1.isMatch(0x20), false);
  assertStrictEquals(gcs1.isMatch(0x30), false);
  assertStrictEquals(gcs1.isMatch(0x24), false);
  assertStrictEquals(gcs1.isMatch(0x2029), false);

  assertThrows(
    () => {
      gcs1.isMatch(-1);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      gcs1.isMatch(0x110000);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
});

Deno.test(" _GeneralCategoryExpression.prototype.isMatch() - codepoint - not", () => {
  const gcs1 = RuneExpression.fromGeneralCategories(["Lu"], { not: true });
  assertStrictEquals(gcs1.isMatch(0x4C), false);
  assertStrictEquals(gcs1.isMatch(0x6C), true);
  assertStrictEquals(gcs1.isMatch(0x20), true);
  assertStrictEquals(gcs1.isMatch(0x30), true);
  assertStrictEquals(gcs1.isMatch(0x24), true);
  assertStrictEquals(gcs1.isMatch(0x2029), true);

  assertThrows(
    () => {
      gcs1.isMatch(-1);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      gcs1.isMatch(0x110000);
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
});

Deno.test(" _GeneralCategoryExpression.prototype.isMatch() - rune", () => {
  const gcs1 = RuneExpression.fromGeneralCategories(["Lu"]);
  assertStrictEquals(gcs1.isMatch("L"), true);
  assertStrictEquals(gcs1.isMatch("l"), false);
  assertStrictEquals(gcs1.isMatch(" "), false);
  assertStrictEquals(gcs1.isMatch("0"), false);
  assertStrictEquals(gcs1.isMatch("$"), false);
  assertStrictEquals(gcs1.isMatch("\u{2029}"), false);

  const gcs2 = RuneExpression.fromGeneralCategories(["Ll"]);
  assertStrictEquals(gcs2.isMatch("L"), false);
  assertStrictEquals(gcs2.isMatch("l"), true);
  assertStrictEquals(gcs2.isMatch(" "), false);
  assertStrictEquals(gcs2.isMatch("0"), false);
  assertStrictEquals(gcs2.isMatch("$"), false);
  assertStrictEquals(gcs2.isMatch("\u{2029}"), false);

  const gcs3 = RuneExpression.fromGeneralCategories(["L"]);
  assertStrictEquals(gcs3.isMatch("L"), true);
  assertStrictEquals(gcs3.isMatch("l"), true);
  assertStrictEquals(gcs3.isMatch(" "), false);
  assertStrictEquals(gcs3.isMatch("0"), false);
  assertStrictEquals(gcs3.isMatch("$"), false);
  assertStrictEquals(gcs3.isMatch("\u{2029}"), false);

  const gcs4 = RuneExpression.fromGeneralCategories(["Lu", "Ll"]);
  assertStrictEquals(gcs4.isMatch("L"), true);
  assertStrictEquals(gcs4.isMatch("l"), true);
  assertStrictEquals(gcs4.isMatch(" "), false);
  assertStrictEquals(gcs4.isMatch("0"), false);
  assertStrictEquals(gcs4.isMatch("$"), false);
  assertStrictEquals(gcs4.isMatch("\u{2029}"), false);

  // const gcs5 = RuneExpression.fromGeneralCategories([]);
  // assertStrictEquals(gcs5.isMatch("L"), false);
  // assertStrictEquals(gcs5.isMatch("l"), false);
  // assertStrictEquals(gcs5.isMatch(" "), false);
  // assertStrictEquals(gcs5.isMatch("0"), false);
  // assertStrictEquals(gcs5.isMatch("$"), false);
  // assertStrictEquals(gcs5.isMatch("\u{2029}"), false);

  assertThrows(
    () => {
      gcs1.isMatch("");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      gcs1.isMatch("00");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
});

Deno.test(" _GeneralCategoryExpression.prototype.isMatch() - rune - not", () => {
  const gcs1 = RuneExpression.fromGeneralCategories(["Lu"], { not: true });
  assertStrictEquals(gcs1.isMatch("L"), false);
  assertStrictEquals(gcs1.isMatch("l"), true);
  assertStrictEquals(gcs1.isMatch(" "), true);
  assertStrictEquals(gcs1.isMatch("0"), true);
  assertStrictEquals(gcs1.isMatch("$"), true);
  assertStrictEquals(gcs1.isMatch("\u{2029}"), true);

  const gcs2 = RuneExpression.fromGeneralCategories(["Ll"], { not: true });
  assertStrictEquals(gcs2.isMatch("L"), true);
  assertStrictEquals(gcs2.isMatch("l"), false);
  assertStrictEquals(gcs2.isMatch(" "), true);
  assertStrictEquals(gcs2.isMatch("0"), true);
  assertStrictEquals(gcs2.isMatch("$"), true);
  assertStrictEquals(gcs2.isMatch("\u{2029}"), true);

  const gcs3 = RuneExpression.fromGeneralCategories(["L"], { not: true });
  assertStrictEquals(gcs3.isMatch("L"), false);
  assertStrictEquals(gcs3.isMatch("l"), false);
  assertStrictEquals(gcs3.isMatch(" "), true);
  assertStrictEquals(gcs3.isMatch("0"), true);
  assertStrictEquals(gcs3.isMatch("$"), true);
  assertStrictEquals(gcs3.isMatch("\u{2029}"), true);

  const gcs4 = RuneExpression.fromGeneralCategories(["Lu", "Ll"], {
    not: true,
  });
  assertStrictEquals(gcs4.isMatch("L"), false);
  assertStrictEquals(gcs4.isMatch("l"), false);
  assertStrictEquals(gcs4.isMatch(" "), true);
  assertStrictEquals(gcs4.isMatch("0"), true);
  assertStrictEquals(gcs4.isMatch("$"), true);
  assertStrictEquals(gcs4.isMatch("\u{2029}"), true);

  // const gcs5 = RuneExpression.fromGeneralCategories([],{not:true});
  // assertStrictEquals(gcs5.isMatch("L"), false);
  // assertStrictEquals(gcs5.isMatch("l"), false);
  // assertStrictEquals(gcs5.isMatch(" "), false);
  // assertStrictEquals(gcs5.isMatch("0"), false);
  // assertStrictEquals(gcs5.isMatch("$"), false);
  // assertStrictEquals(gcs5.isMatch("\u{2029}"), false);

  assertThrows(
    () => {
      gcs1.isMatch("");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
  assertThrows(
    () => {
      gcs1.isMatch("00");
    },
    TypeError,
    "`codePointOrRune` must be a code point or string representing a single code point.",
  );
});

Deno.test(" _GeneralCategoryExpression.prototype.findMatchedRunes()", () => {
  const s1 = RuneExpression.fromGeneralCategories(["Lu"]);
  const r1a = s1.findMatchedRunes("123DE6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a]),
    `[{"rune":"D","runeIndex":3},{"rune":"E","runeIndex":4},{"rune":"G","runeIndex":6},{"rune":"E","runeIndex":10}]`,
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

Deno.test(" _GeneralCategoryExpression.prototype.findMatchedRunes() - not", () => {
  const s1 = RuneExpression.fromGeneralCategories(["Lu"], { not: true });
  const r1a = s1.findMatchedRunes("123DE6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a]),
    `[{"rune":"1","runeIndex":0},{"rune":"2","runeIndex":1},{"rune":"3","runeIndex":2},{"rune":"6","runeIndex":5},{"rune":"h","runeIndex":7},{"rune":"i","runeIndex":8},{"rune":"j","runeIndex":9}]`,
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
