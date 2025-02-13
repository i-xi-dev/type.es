import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isGeneralCategory()", () => {
  assertStrictEquals(Type.isGeneralCategory("Lu"), true);
  assertStrictEquals(Type.isGeneralCategory("Lv"), false);
  assertStrictEquals(Type.isGeneralCategory("u"), false);
  assertStrictEquals(Type.isGeneralCategory(""), false);
  assertStrictEquals(Type.isGeneralCategory(0), false);
  assertStrictEquals(Type.isGeneralCategory(undefined), false);
  assertStrictEquals(Type.isGeneralCategory(null), false);
  assertStrictEquals(Type.isGeneralCategory(true), false);
  assertStrictEquals(Type.isGeneralCategory(false), false);
});

Deno.test("Type.assertGeneralCategory()", () => {
  try {
    Type.assertGeneralCategory("Lu", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertGeneralCategory(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertGeneralCategory(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertGeneralCategory(new String("Lv"), "test-1");
    unreachable();
  } catch {
    //
  }
});
