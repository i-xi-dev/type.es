import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../mod.ts";

const { Rune } = Text;

Deno.test("Rune.matchesGeneralCategory()", () => {
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Lu"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Ll"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Lt"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "LC"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Lm"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Lo"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "L"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Mn"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Mc"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Me"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "M"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Nd"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Nl"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "No"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "N"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Pc"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Pd"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Ps"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Pe"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Pi"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Pf"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Po"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "P"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Sm"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Sc"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Sk"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "So"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "S"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Zs"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Zl"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Zp"), true);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Z"), true);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Cc"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Cf"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Cs"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Co"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "Cn"), false);
  assertStrictEquals(Rune.matchesGeneralCategory("\u{2029}", "C"), false);

  assertThrows(
    () => {
      Rune.matchesGeneralCategory("\u{2029}", "" as "C");
    },
    TypeError,
    "`category` must be an Unicode `General_Category` value.",
  );
});

Deno.test("Rune.matchesScript()", () => {
  assertStrictEquals(Rune.matchesScript("ア", "Kana"), true);
  assertStrictEquals(Rune.matchesScript("ア", "Hira"), false);
  assertStrictEquals(Rune.matchesScript("あ", "Kana"), false);
  assertStrictEquals(Rune.matchesScript("あ", "Hira"), true);
  assertStrictEquals(Rune.matchesScript("ー", "Kana"), true);
  assertStrictEquals(Rune.matchesScript("ー", "Hira"), true);
  assertStrictEquals(Rune.matchesScript("\u3099", "Kana"), true);
  assertStrictEquals(Rune.matchesScript("\u3099", "Hira"), true);

  const opEx = { excludeScx: true } as const;
  assertStrictEquals(Rune.matchesScript("ア", "Kana", opEx), true);
  assertStrictEquals(Rune.matchesScript("ア", "Hira", opEx), false);
  assertStrictEquals(Rune.matchesScript("あ", "Kana", opEx), false);
  assertStrictEquals(Rune.matchesScript("あ", "Hira", opEx), true);
  assertStrictEquals(Rune.matchesScript("ー", "Kana", opEx), false);
  assertStrictEquals(Rune.matchesScript("ー", "Hira", opEx), false);
  assertStrictEquals(Rune.matchesScript("\u3099", "Kana", opEx), false);
  assertStrictEquals(Rune.matchesScript("\u3099", "Hira", opEx), false);

  assertThrows(
    () => {
      Rune.matchesScript("a", "Aaaaa" as "Latn");
    },
    TypeError,
    // "`script` must be an ISO 15924 script alpha-4 code.",
    "`Aaaaa` is not supported script in Unicode property.",
  );

  assertThrows(
    () => {
      Rune.matchesScript("a", "Zsym");
    },
    TypeError,
    "`Zsym` is not supported script in Unicode property.",
  );

  assertStrictEquals(Rune.matchesScript("", "Latn"), false);
  assertStrictEquals(Rune.matchesScript("aa", "Latn"), false);

  assertStrictEquals(Rune.matchesScript("a", "Latn"), true);
  assertStrictEquals(Rune.matchesScript("1", "Latn"), false);
});

Deno.test("Rune.matchesCommonScript()", () => {
  assertStrictEquals(Rune.matchesCommonScript("ア"), false);
  assertStrictEquals(Rune.matchesCommonScript("あ"), false);
  assertStrictEquals(Rune.matchesCommonScript("ー"), true);
  assertStrictEquals(Rune.matchesCommonScript("\u3099"), false);
  assertStrictEquals(Rune.matchesCommonScript("a"), false);
  assertStrictEquals(Rune.matchesCommonScript("1"), true);

  assertStrictEquals(Rune.matchesCommonScript(""), false);
  assertStrictEquals(Rune.matchesCommonScript("11"), false);
});

Deno.test("Rune.matchesInheritedScript()", () => {
  assertStrictEquals(Rune.matchesInheritedScript("ア"), false);
  assertStrictEquals(Rune.matchesInheritedScript("あ"), false);
  assertStrictEquals(Rune.matchesInheritedScript("ー"), false);
  assertStrictEquals(Rune.matchesInheritedScript("\u3099"), true);
  assertStrictEquals(Rune.matchesInheritedScript("a"), false);
  assertStrictEquals(Rune.matchesInheritedScript("1"), false);

  assertStrictEquals(Rune.matchesInheritedScript(""), false);
  assertStrictEquals(Rune.matchesInheritedScript("11"), false);
});
