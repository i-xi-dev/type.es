import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../mod.ts";

const { SimpleCondition } = Text;

Deno.test("Text.SimpleCondition.fromGeneralCategories()", () => {
  const c0 = SimpleCondition.fromGeneralCategories([]);
  assertStrictEquals(c0.isMatch("A"), false);
  assertStrictEquals(c0.isMatch("0"), false);

  const c1 = SimpleCondition.fromGeneralCategories(["L"]);
  assertStrictEquals(c1.isMatch("A"), true);
  assertStrictEquals(c1.isMatch("0"), false);

  assertThrows(
    () => {
      SimpleCondition.fromGeneralCategories(undefined as unknown as ["L"]);
    },
    TypeError,
    "`gcs` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromGeneralCategories("L" as unknown as ["L"]);
    },
    TypeError,
    "`gcs` must implement `Symbol.iterator`.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromGeneralCategories(["5"] as unknown as ["L"]);
    },
    TypeError,
    "`gcs[*]` must be an Unicode `General_Category` value.",
  );
  assertThrows(
    () => {
      SimpleCondition.fromGeneralCategories([1] as unknown as ["L"]);
    },
    TypeError,
    "`gcs[*]` must be an Unicode `General_Category` value.",
  );
});

Deno.test("Text.SimpleCondition.prototype.isMatch() - _UnicodeGeneralCategoryCondition codepoint", () => {
  const gcs1 = SimpleCondition.fromGeneralCategories(["Lu"]);
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

Deno.test("Text.SimpleCondition.prototype.isMatch() - _UnicodeGeneralCategoryCondition rune", () => {
  const gcs1 = SimpleCondition.fromGeneralCategories(["Lu"]);
  assertStrictEquals(gcs1.isMatch("L"), true);
  assertStrictEquals(gcs1.isMatch("l"), false);
  assertStrictEquals(gcs1.isMatch(" "), false);
  assertStrictEquals(gcs1.isMatch("0"), false);
  assertStrictEquals(gcs1.isMatch("$"), false);
  assertStrictEquals(gcs1.isMatch("\u{2029}"), false);

  const gcs2 = SimpleCondition.fromGeneralCategories(["Ll"]);
  assertStrictEquals(gcs2.isMatch("L"), false);
  assertStrictEquals(gcs2.isMatch("l"), true);
  assertStrictEquals(gcs2.isMatch(" "), false);
  assertStrictEquals(gcs2.isMatch("0"), false);
  assertStrictEquals(gcs2.isMatch("$"), false);
  assertStrictEquals(gcs2.isMatch("\u{2029}"), false);

  const gcs3 = SimpleCondition.fromGeneralCategories(["L"]);
  assertStrictEquals(gcs3.isMatch("L"), true);
  assertStrictEquals(gcs3.isMatch("l"), true);
  assertStrictEquals(gcs3.isMatch(" "), false);
  assertStrictEquals(gcs3.isMatch("0"), false);
  assertStrictEquals(gcs3.isMatch("$"), false);
  assertStrictEquals(gcs3.isMatch("\u{2029}"), false);

  const gcs4 = SimpleCondition.fromGeneralCategories(["Lu", "Ll"]);
  assertStrictEquals(gcs4.isMatch("L"), true);
  assertStrictEquals(gcs4.isMatch("l"), true);
  assertStrictEquals(gcs4.isMatch(" "), false);
  assertStrictEquals(gcs4.isMatch("0"), false);
  assertStrictEquals(gcs4.isMatch("$"), false);
  assertStrictEquals(gcs4.isMatch("\u{2029}"), false);

  const gcs5 = SimpleCondition.fromGeneralCategories([]);
  assertStrictEquals(gcs5.isMatch("L"), false);
  assertStrictEquals(gcs5.isMatch("l"), false);
  assertStrictEquals(gcs5.isMatch(" "), false);
  assertStrictEquals(gcs5.isMatch("0"), false);
  assertStrictEquals(gcs5.isMatch("$"), false);
  assertStrictEquals(gcs5.isMatch("\u{2029}"), false);

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

Deno.test("Text.SimpleCondition.prototype.findMatchedRunes() - _UnicodeGeneralCategoryCondition", () => {
  const s1 = SimpleCondition.fromGeneralCategories(["Lu"]);
  const r1a = s1.findMatchedRunes("123DE6GhijE");
  assertStrictEquals(
    JSON.stringify([...r1a]),
    `[{"rune":"D","runeIndex":3},{"rune":"E","runeIndex":4},{"rune":"G","runeIndex":6},{"rune":"E","runeIndex":10}]`,
  );
  const r1b = s1.findMatchedRunes("");
  assertStrictEquals(JSON.stringify([...r1b]), `[]`);
});
