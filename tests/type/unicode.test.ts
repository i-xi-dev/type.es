import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isPlane()", () => {
  assertStrictEquals(Type.isPlane(-1), false);
  assertStrictEquals(Type.isPlane(-0), true);
  assertStrictEquals(Type.isPlane(0), true);
  assertStrictEquals(Type.isPlane(16), true);
  assertStrictEquals(Type.isPlane(17), false);

  assertStrictEquals(Type.isPlane(undefined), false);
  assertStrictEquals(Type.isPlane("0"), false);
});

Deno.test("Type.assertPlane()", () => {
  try {
    Type.assertPlane(0, "test-1");
    Type.assertPlane(16, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertPlane(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertPlane(17, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPlane(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertPlane("0", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUnicodeGeneralCategory()", () => {
  assertStrictEquals(Type.isUnicodeGeneralCategory("Lu"), true);
  assertStrictEquals(Type.isUnicodeGeneralCategory("Lv"), false);
  assertStrictEquals(Type.isUnicodeGeneralCategory("u"), false);
  assertStrictEquals(Type.isUnicodeGeneralCategory(""), false);
  assertStrictEquals(Type.isUnicodeGeneralCategory(0), false);
  assertStrictEquals(Type.isUnicodeGeneralCategory(undefined), false);
  assertStrictEquals(Type.isUnicodeGeneralCategory(null), false);
  assertStrictEquals(Type.isUnicodeGeneralCategory(true), false);
  assertStrictEquals(Type.isUnicodeGeneralCategory(false), false);
});

Deno.test("Type.assertUnicodeGeneralCategory()", () => {
  try {
    Type.assertUnicodeGeneralCategory("Lu", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUnicodeGeneralCategory(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertUnicodeGeneralCategory(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertUnicodeGeneralCategory(new String("Lv"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUnicodeScript()", () => {
  assertStrictEquals(Type.isUnicodeScript("Latn"), true);

  assertStrictEquals(Type.isUnicodeScript("Aaaaa"), false);
  assertStrictEquals(Type.isUnicodeScript("Aaa"), false);
  assertStrictEquals(Type.isUnicodeScript("AAAA"), false);
  assertStrictEquals(Type.isUnicodeScript(""), false);

  assertStrictEquals(Type.isUnicodeScript(null), false);
});

Deno.test("Type.assertUnicodeScript()", () => {
  try {
    Type.assertUnicodeScript("Latn", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUnicodeScript("Zxxx", "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertUnicodeScript("Aaaaa", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isRuneInScript()", () => {
  assertStrictEquals(Type.isRuneInScript("ア", "Kana"), true);
  assertStrictEquals(Type.isRuneInScript("ア", "Hira"), false);
  assertStrictEquals(Type.isRuneInScript("あ", "Kana"), false);
  assertStrictEquals(Type.isRuneInScript("あ", "Hira"), true);
  assertStrictEquals(Type.isRuneInScript("ー", "Kana"), true);
  assertStrictEquals(Type.isRuneInScript("ー", "Hira"), true);
  assertStrictEquals(Type.isRuneInScript("\u3099", "Kana"), true);
  assertStrictEquals(Type.isRuneInScript("\u3099", "Hira"), true);

  const opEx = { excludeScx: true } as const;
  assertStrictEquals(Type.isRuneInScript("ア", "Kana", opEx), true);
  assertStrictEquals(Type.isRuneInScript("ア", "Hira", opEx), false);
  assertStrictEquals(Type.isRuneInScript("あ", "Kana", opEx), false);
  assertStrictEquals(Type.isRuneInScript("あ", "Hira", opEx), true);
  assertStrictEquals(Type.isRuneInScript("ー", "Kana", opEx), false);
  assertStrictEquals(Type.isRuneInScript("ー", "Hira", opEx), false);
  assertStrictEquals(Type.isRuneInScript("\u3099", "Kana", opEx), false);
  assertStrictEquals(Type.isRuneInScript("\u3099", "Hira", opEx), false);

  assertThrows(
    () => {
      Type.isRuneInScript("a", "Aaaaa" as "Latn");
    },
    TypeError,
    // "`script` must be an ISO 15924 script alpha-4 code.",
    "`Aaaaa` is not supported script in Unicode property.",
  );

  assertThrows(
    () => {
      Type.isRuneInScript("a", "Zsym");
    },
    TypeError,
    "`Zsym` is not supported script in Unicode property.",
  );

  assertStrictEquals(Type.isRuneInScript("", "Latn"), false);
  assertStrictEquals(Type.isRuneInScript("aa", "Latn"), false);

  assertStrictEquals(Type.isRuneInScript("a", "Latn"), true);
  assertStrictEquals(Type.isRuneInScript("1", "Latn"), false);
});

Deno.test("Type.assertRuneInScript()", () => {
  try {
    Type.assertRuneInScript("L", "test-1", "Latn");
    Type.assertRuneInScript("l", "test-1", "Latn");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertRuneInScript("L0", "test-1", "Latn");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertRuneInScript("L", "test-1", "" as "Latn");
    unreachable();
  } catch {
    //
  }
});
