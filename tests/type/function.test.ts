import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isFunction()", () => {
  assertStrictEquals(Type.isFunction(function () {}), true);
  assertStrictEquals(Type.isFunction(() => true), true);
  assertStrictEquals(Type.isFunction(async function () {}), true);
  // deno-lint-ignore require-await
  assertStrictEquals(Type.isFunction(async () => true), true);
  assertStrictEquals(Type.isFunction(String), true);
  assertStrictEquals(Type.isFunction(Event), true);
  assertStrictEquals(Type.isFunction(Array), true);
  assertStrictEquals(Type.isFunction(ArrayBuffer), true);
  assertStrictEquals(Type.isFunction(ArrayBuffer.isView), true);
  assertStrictEquals(Type.isFunction(Intl.NumberFormat), true);

  assertStrictEquals(Type.isFunction(null), false);
});

Deno.test("Type.assertFunction()", () => {
  try {
    Type.assertFunction(function () {}, "test-1");
    Type.assertFunction(String, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertFunction(null, "test-1");
    unreachable();
  } catch {
    //
  }
});
