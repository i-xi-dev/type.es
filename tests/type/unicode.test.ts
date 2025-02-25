import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isCodePlane()", () => {
  assertStrictEquals(Type.isCodePlane(-1), false);
  assertStrictEquals(Type.isCodePlane(-0), true);
  assertStrictEquals(Type.isCodePlane(0), true);
  assertStrictEquals(Type.isCodePlane(16), true);
  assertStrictEquals(Type.isCodePlane(17), false);

  assertStrictEquals(Type.isCodePlane(undefined), false);
  assertStrictEquals(Type.isCodePlane("0"), false);
});

Deno.test("Type.assertCodePlane()", () => {
  try {
    Type.assertCodePlane(0, "test-1");
    Type.assertCodePlane(16, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertCodePlane(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertCodePlane(17, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertCodePlane(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertCodePlane("0", "test-1");
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
