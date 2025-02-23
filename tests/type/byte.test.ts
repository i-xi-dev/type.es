import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isByteOrder()", () => {
  assertStrictEquals(Type.isByteOrder("big-endian"), true);
  assertStrictEquals(Type.isByteOrder("little-endian"), true);
  assertStrictEquals(Type.isByteOrder(""), false);
  assertStrictEquals(Type.isByteOrder(undefined), false);
  assertStrictEquals(Type.isByteOrder("LITTLE-ENDIAN"), false);
});

Deno.test("Type.assertByteOrder()", () => {
  try {
    Type.assertByteOrder("big-endian", "test-1");
    Type.assertByteOrder("little-endian", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertByteOrder(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertByteOrder(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertByteOrder(new String("little-endian"), "test-1");
    unreachable();
  } catch {
    //
  }
});
