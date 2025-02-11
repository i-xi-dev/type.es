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

Deno.test("Type.isHighSurrogateCodePoint()", () => {
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xD7FF), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xD800), true);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xDBFF), true);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xDC00), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xDFFF), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xE000), false);

  assertStrictEquals(Type.isHighSurrogateCodePoint(-1), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0x110000), false);
});

Deno.test("Type.isLowSurrogateCodePoint()", () => {
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xD7FF), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xD800), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xDBFF), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xDC00), true);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xDFFF), true);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xE000), false);

  assertStrictEquals(Type.isLowSurrogateCodePoint(-1), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0x110000), false);
});

Deno.test("Type.isSurrogateCodePoint()", () => {
  assertStrictEquals(Type.isSurrogateCodePoint(0xD7FF), false);
  assertStrictEquals(Type.isSurrogateCodePoint(0xD800), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xDBFF), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xDC00), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xDFFF), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xE000), false);

  assertStrictEquals(Type.isSurrogateCodePoint(-1), false);
  assertStrictEquals(Type.isSurrogateCodePoint(0x110000), false);
});
