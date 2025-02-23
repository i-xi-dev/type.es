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

Deno.test("Type.isUint8Array()", () => {
  assertStrictEquals(Type.isUint8Array(new ArrayBuffer(0)), false);
  assertStrictEquals(Type.isUint8Array(Uint8Array.of(0).buffer), false);
  assertStrictEquals(Type.isUint8Array(new Uint8Array(0)), true);
  assertStrictEquals(Type.isUint8Array([]), false);
  assertStrictEquals(Type.isUint8Array(null), false);
  assertStrictEquals(Type.isUint8Array(undefined), false);
});

Deno.test("Type.assertUint8Array()", () => {
  try {
    Type.assertUint8Array(new Uint8Array(0), "test-1");
    Type.assertUint8Array(Uint8Array.of(0), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint8Array(new ArrayBuffer(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertUint8Array(null, "test-1");
    unreachable();
  } catch {
    //
  }
});
