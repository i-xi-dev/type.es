import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isCodePoint()", () => {
  assertStrictEquals(Type.isCodePoint(-1), false);
  assertStrictEquals(Type.isCodePoint(-0), true);
  assertStrictEquals(Type.isCodePoint(0), true);
  assertStrictEquals(Type.isCodePoint(63), true);
  assertStrictEquals(Type.isCodePoint(64), true);
  assertStrictEquals(Type.isCodePoint(127), true);
  assertStrictEquals(Type.isCodePoint(128), true);
  assertStrictEquals(Type.isCodePoint(255), true);
  assertStrictEquals(Type.isCodePoint(256), true);
  assertStrictEquals(Type.isCodePoint(65535), true);
  assertStrictEquals(Type.isCodePoint(65536), true);
  assertStrictEquals(Type.isCodePoint(0x10FFFF), true);
  assertStrictEquals(Type.isCodePoint(0x110000), false);
  assertStrictEquals(Type.isCodePoint(0xFFFFFFFF), false);
  assertStrictEquals(Type.isCodePoint(0x100000000), false);
  assertStrictEquals(Type.isCodePoint(0.1), false);

  assertStrictEquals(Type.isCodePoint("0"), false);
  assertStrictEquals(Type.isCodePoint("255"), false);
  assertStrictEquals(Type.isCodePoint(true), false);
  assertStrictEquals(Type.isCodePoint({}), false);
  assertStrictEquals(Type.isCodePoint([]), false);
  assertStrictEquals(Type.isCodePoint([0]), false);
  assertStrictEquals(Type.isCodePoint(undefined), false);
  assertStrictEquals(Type.isCodePoint(null), false);
});

Deno.test("Type.assertCodePoint()", () => {
  try {
    Type.assertCodePoint(-0, "test-1");
    Type.assertCodePoint(0, "test-1");
    Type.assertCodePoint(0x10FFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertCodePoint(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertCodePoint(0x110000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertCodePoint(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});
