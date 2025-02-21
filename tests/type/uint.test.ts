import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isUint6()", () => {
  assertStrictEquals(Type.isUint6(-1), false);
  assertStrictEquals(Type.isUint6(-0), true);
  assertStrictEquals(Type.isUint6(0), true);
  assertStrictEquals(Type.isUint6(63), true);
  assertStrictEquals(Type.isUint6(64), false);
  assertStrictEquals(Type.isUint6(127), false);
  assertStrictEquals(Type.isUint6(128), false);
  assertStrictEquals(Type.isUint6(255), false);
  assertStrictEquals(Type.isUint6(256), false);
  assertStrictEquals(Type.isUint6(65535), false);
  assertStrictEquals(Type.isUint6(65536), false);
  assertStrictEquals(Type.isUint6(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint6(0x100000000), false);

  assertStrictEquals(Type.isUint6(0.1), false);
  assertStrictEquals(Type.isUint6(0.5), false);
  assertStrictEquals(Type.isUint6("0" as unknown as number), false);
  assertStrictEquals(Type.isUint6(false as unknown as number), false);
  assertStrictEquals(Type.isUint6({} as unknown as number), false);
  assertStrictEquals(Type.isUint6([] as unknown as number), false);
  assertStrictEquals(Type.isUint6([0] as unknown as number), false);
  assertStrictEquals(Type.isUint6(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint6(null as unknown as number), false);
});

Deno.test("Type.assertUint6()", () => {
  try {
    Type.assertUint6(0, "test-1");
    Type.assertUint6(0x3F, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint6(0x40, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isUint7()", () => {
  assertStrictEquals(Type.isUint7(-1), false);
  assertStrictEquals(Type.isUint7(-0), true);
  assertStrictEquals(Type.isUint7(0), true);
  assertStrictEquals(Type.isUint7(63), true);
  assertStrictEquals(Type.isUint7(64), true);
  assertStrictEquals(Type.isUint7(127), true);
  assertStrictEquals(Type.isUint7(128), false);
  assertStrictEquals(Type.isUint7(255), false);
  assertStrictEquals(Type.isUint7(256), false);
  assertStrictEquals(Type.isUint7(65535), false);
  assertStrictEquals(Type.isUint7(65536), false);
  assertStrictEquals(Type.isUint7(0xFFFFFFFF), false);
  assertStrictEquals(Type.isUint7(0x100000000), false);

  assertStrictEquals(Type.isUint7(0.1), false);
  assertStrictEquals(Type.isUint7(0.5), false);
  assertStrictEquals(Type.isUint7("0" as unknown as number), false);
  assertStrictEquals(Type.isUint7(false as unknown as number), false);
  assertStrictEquals(Type.isUint7({} as unknown as number), false);
  assertStrictEquals(Type.isUint7([] as unknown as number), false);
  assertStrictEquals(Type.isUint7([0] as unknown as number), false);
  assertStrictEquals(Type.isUint7(undefined as unknown as number), false);
  assertStrictEquals(Type.isUint7(null as unknown as number), false);
});

Deno.test("Type.assertUint7()", () => {
  try {
    Type.assertUint7(0, "test-1");
    Type.assertUint7(0x7F, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertUint7(0x80, "test-1");
    unreachable();
  } catch {
    //
  }
});

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
    Type.assertUint8(0x100, "test-1");
    unreachable();
  } catch {
    //
  }
});
