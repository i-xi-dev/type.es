import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isArrayBuffer()", () => {
  assertStrictEquals(Type.isArrayBuffer(new ArrayBuffer(0)), true);
  assertStrictEquals(Type.isArrayBuffer(Uint8Array.of(0).buffer), true);
  assertStrictEquals(Type.isArrayBuffer(new Uint8Array(0)), false);
  assertStrictEquals(Type.isArrayBuffer([]), false);
  assertStrictEquals(Type.isArrayBuffer(null), false);
  assertStrictEquals(Type.isArrayBuffer(undefined), false);
});

Deno.test("Type.assertArrayBuffer()", () => {
  try {
    Type.assertArrayBuffer(new ArrayBuffer(0), "test-1");
    Type.assertArrayBuffer(Uint8Array.of(0).buffer, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertArrayBuffer(new Uint8Array(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayBuffer(null, "test-1");
    unreachable();
  } catch {
    //
  }
});
