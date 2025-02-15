import { assertStrictEquals, fail, unreachable } from "@std/assert";
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
