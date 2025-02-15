import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isScript()", () => {
  assertStrictEquals(Type.isScript("Latn"), true);

  assertStrictEquals(Type.isScript("Aaaaa"), false);
  assertStrictEquals(Type.isScript("Aaa"), false);
  assertStrictEquals(Type.isScript("AAAA"), false);
  assertStrictEquals(Type.isScript(""), false);

  assertStrictEquals(Type.isScript(null), false);
});

Deno.test("Type.assertScript()", () => {
  try {
    Type.assertScript("Latn", "test-1");
    Type.assertScript("Zxxx", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertScript("Aaaaa", "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isRegion()", () => {
  assertStrictEquals(Type.isRegion("US"), true);

  assertStrictEquals(Type.isRegion("us"), false);
  assertStrictEquals(Type.isRegion("USS"), false);
  assertStrictEquals(Type.isRegion("Us"), false);
  assertStrictEquals(Type.isRegion("uS"), false);
  assertStrictEquals(Type.isRegion(""), false);

  assertStrictEquals(Type.isRegion(null), false);
});

Deno.test("Type.assertRegion()", () => {
  try {
    Type.assertRegion("US", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertRegion("us", "test-1");
    unreachable();
  } catch {
    //
  }
});
