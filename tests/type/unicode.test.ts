import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isUnicodePlane()", () => {
  assertStrictEquals(Type.isUnicodePlane(-1), false);
  assertStrictEquals(Type.isUnicodePlane(-0), true);
  assertStrictEquals(Type.isUnicodePlane(0), true);
  assertStrictEquals(Type.isUnicodePlane(16), true);
  assertStrictEquals(Type.isUnicodePlane(17), false);

  assertStrictEquals(Type.isUnicodePlane(undefined), false);
  assertStrictEquals(Type.isUnicodePlane("0"), false);
});

Deno.test("Type.assertUnicodePlane()", () => {
  try {
    Type.assertUnicodePlane(0, "test-1");
    Type.assertUnicodePlane(16, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUnicodePlane(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertUnicodePlane(17, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertUnicodePlane(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertUnicodePlane("0", "test-1");
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
