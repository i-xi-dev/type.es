import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isBufferSource()", () => {
  assertStrictEquals(Type.isBufferSource(new ArrayBuffer(0)), true);
  assertStrictEquals(Type.isBufferSource(Uint8Array.of(0).buffer), true);
  assertStrictEquals(Type.isBufferSource(new Uint8Array(0)), true);
  assertStrictEquals(Type.isBufferSource([]), false);
  assertStrictEquals(Type.isBufferSource(null), false);
  assertStrictEquals(Type.isBufferSource(undefined), false);
  assertStrictEquals(Type.isBufferSource(new DataView(new ArrayBuffer(0))), true);
});

Deno.test("Type.assertBufferSource()", () => {
  try {
    Type.assertBufferSource(new ArrayBuffer(0), "test-1");
    Type.assertBufferSource(Uint8Array.of(0).buffer, "test-1");
    Type.assertBufferSource(new Uint8Array(0), "test-1");
    Type.assertBufferSource(new DataView(new ArrayBuffer(0)), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBufferSource([], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertBufferSource(null, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.assertArrayBufferView()", () => {
  try {
    Type.assertArrayBufferView(new Uint8Array(0), "test-1");
    Type.assertArrayBufferView(new DataView(new ArrayBuffer(0)), "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertArrayBufferView(new ArrayBuffer(0), "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayBufferView([], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayBufferView(null, "test-1");
    unreachable();
  } catch {
    //
  }
});
