import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isCodePointRange()", () => {
  assertStrictEquals(Type.isCodePointRange([0, 0]), true);
  assertStrictEquals(Type.isCodePointRange([0, 1]), true);
  assertStrictEquals(Type.isCodePointRange([1, 0]), false);
  assertStrictEquals(Type.isCodePointRange([-1, 0]), false);
  assertStrictEquals(Type.isCodePointRange([0, 0x110000]), false);

  assertStrictEquals(Type.isCodePointRange([0]), false);
  assertStrictEquals(Type.isCodePointRange([0, 0, 0]), false);
  assertStrictEquals(Type.isCodePointRange([0n, 0n]), false);
  assertStrictEquals(Type.isCodePointRange(0), false);
  assertStrictEquals(Type.isCodePointRange("0"), false);
  assertStrictEquals(Type.isCodePointRange(null), false);
});

Deno.test("Type.isCodePointRange()", () => {
  try {
    Type.assertCodePointRange([0, 0], "test-1");
    Type.assertCodePointRange([0, 0x10FFFF], "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertCodePointRange([-1, 0], "test-1");
    unreachable();
  } catch {
    //
  }
});
