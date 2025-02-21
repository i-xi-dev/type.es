import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isUint8()", () => {
  assertStrictEquals(Type.isUint8(-1), false);
  assertStrictEquals(Type.isUint8(-0), true);
  assertStrictEquals(Type.isUint8(0), true);
  assertStrictEquals(Type.isUint8(63), true);
  assertStrictEquals(Type.isUint8(64), true);
  assertStrictEquals(Type.isUint8(127), true);
  assertStrictEquals(Type.isUint8(128), true);
  assertStrictEquals(Type.isUint8(255), true);
  assertStrictEquals(Type.isUint8(256), false);
  assertStrictEquals(Type.isUint8(65535), false);
  assertStrictEquals(Type.isUint8(65536), false);
  assertStrictEquals(Type.isUint8(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint8(0x100000000), false);

  assertStrictEquals(Type.isUint8(0.1), false);
  assertStrictEquals(Type.isUint8(0.5), false);
  assertStrictEquals(Type.isUint8("0" as unknown as number), false);
  assertStrictEquals(Type.isUint8(false as unknown as number), false);
  assertStrictEquals(Type.isUint8({} as unknown as number), false);
  assertStrictEquals(Type.isUint8([] as unknown as number), false);
  assertStrictEquals(Type.isUint8([0] as unknown as number), false);
  assertStrictEquals(Type.isUint8(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint8(null as unknown as number), false);
});

Deno.test("Type.assertUint8()", () => {
  try {
    Type.assertUint8(0, "test-1");
    Type.assertUint8(0xFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint8(0.5, "test-1");
    unreachable();
  } catch {
    //
  }
});
