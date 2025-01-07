import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Text } from "../../mod.ts";

const { Rune } = Text;

Deno.test("Rune.is()", () => {
  assertStrictEquals(Rune.is(0), false);
  assertStrictEquals(Rune.is(0n), false);
  assertStrictEquals(Rune.is(Number.NaN), false);
  assertStrictEquals(Rune.is(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Rune.is(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Rune.is(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Rune.is(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Rune.is(undefined), false);
  assertStrictEquals(Rune.is(null), false);
  assertStrictEquals(Rune.is(true), false);
  assertStrictEquals(Rune.is(false), false);
  assertStrictEquals(Rune.is(""), false);
  assertStrictEquals(Rune.is("0"), true);
  assertStrictEquals(Rune.is("\u0000"), true);
  assertStrictEquals(Rune.is("\uFFFF"), true);
  assertStrictEquals(Rune.is("\u{10000}"), true);
  assertStrictEquals(Rune.is("\u0000\u0000"), false);

  assertStrictEquals(Rune.is("\uD800"), false);
  assertStrictEquals(Rune.is("\uDC00"), false);
  assertStrictEquals(Rune.is("\uD800\uD800"), false);
  assertStrictEquals(Rune.is("\uD800\uDC00"), true);
  assertStrictEquals(Rune.is("\uDC00\uD800"), false);
  assertStrictEquals(Rune.is("\uDC00\uDC00"), false);
  assertStrictEquals(Rune.is("\u{10FFFF}"), true);
});

Deno.test("Rune.assert()", () => {
  try {
    Rune.assert(" ", "test-1");
    Rune.assert("0", "test-1");
    Rune.assert("\u0000", "test-1");
    Rune.assert("\uFFFF", "test-1");
    Rune.assert("\u{10000}", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Rune.assert("\u{10000}\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Rune.assert(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Rune.planeOf(string)", () => {
  assertStrictEquals(Rune.planeOf("\u{0}"), 0);
  assertStrictEquals(Rune.planeOf("\u{FFFF}"), 0);
  assertStrictEquals(Rune.planeOf("\u{10000}"), 1);
  assertStrictEquals(Rune.planeOf("\u{1FFFF}"), 1);
  assertStrictEquals(Rune.planeOf("\u{20000}"), 2);
  assertStrictEquals(Rune.planeOf("\u{2FFFF}"), 2);
  assertStrictEquals(Rune.planeOf("\u{30000}"), 3);
  assertStrictEquals(Rune.planeOf("\u{3FFFF}"), 3);
  assertStrictEquals(Rune.planeOf("\u{40000}"), 4);
  assertStrictEquals(Rune.planeOf("\u{4FFFF}"), 4);
  assertStrictEquals(Rune.planeOf("\u{50000}"), 5);
  assertStrictEquals(Rune.planeOf("\u{5FFFF}"), 5);
  assertStrictEquals(Rune.planeOf("\u{60000}"), 6);
  assertStrictEquals(Rune.planeOf("\u{6FFFF}"), 6);
  assertStrictEquals(Rune.planeOf("\u{70000}"), 7);
  assertStrictEquals(Rune.planeOf("\u{7FFFF}"), 7);
  assertStrictEquals(Rune.planeOf("\u{80000}"), 8);
  assertStrictEquals(Rune.planeOf("\u{8FFFF}"), 8);
  assertStrictEquals(Rune.planeOf("\u{90000}"), 9);
  assertStrictEquals(Rune.planeOf("\u{9FFFF}"), 9);
  assertStrictEquals(Rune.planeOf("\u{A0000}"), 10);
  assertStrictEquals(Rune.planeOf("\u{AFFFF}"), 10);
  assertStrictEquals(Rune.planeOf("\u{B0000}"), 11);
  assertStrictEquals(Rune.planeOf("\u{BFFFF}"), 11);
  assertStrictEquals(Rune.planeOf("\u{C0000}"), 12);
  assertStrictEquals(Rune.planeOf("\u{CFFFF}"), 12);
  assertStrictEquals(Rune.planeOf("\u{D0000}"), 13);
  assertStrictEquals(Rune.planeOf("\u{DFFFF}"), 13);
  assertStrictEquals(Rune.planeOf("\u{E0000}"), 14);
  assertStrictEquals(Rune.planeOf("\u{EFFFF}"), 14);
  assertStrictEquals(Rune.planeOf("\u{F0000}"), 15);
  assertStrictEquals(Rune.planeOf("\u{FFFFF}"), 15);
  assertStrictEquals(Rune.planeOf("\u{100000}"), 16);
  assertStrictEquals(Rune.planeOf("\u{10FFFF}"), 16);

  assertThrows(
    () => {
      Rune.planeOf("");
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );

  assertThrows(
    () => {
      Rune.planeOf("11");
    },
    TypeError,
    "`rune` must be an Unicode scalar value.",
  );
});

Deno.test("Rune.isBmp(string)", () => {
  assertStrictEquals(Rune.isBmp("\u{0}"), true);
  assertStrictEquals(Rune.isBmp("\u{FFFF}"), true);
  assertStrictEquals(Rune.isBmp("\u{10000}"), false);
  assertStrictEquals(Rune.isBmp("\u{10FFFF}"), false);

  assertStrictEquals(Rune.isBmp(""), false);
  assertStrictEquals(Rune.isBmp("11"), false);
});

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
      Rune.matchesScript("a", "Aaaaa");
    },
    TypeError,
    // "`script` must be an ISO 15924 script alpha-4 code.",
    "`Aaaaa` is not supported in Unicode property.",
  );

  assertThrows(
    () => {
      Rune.matchesScript("a", "Zsym");
    },
    TypeError,
    "`Zsym` is not supported in Unicode property.",
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
