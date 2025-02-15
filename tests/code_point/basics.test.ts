import { assertStrictEquals, assertThrows } from "@std/assert";
import { CodePoint } from "../../mod.ts";

Deno.test("CodePoint.toString()", () => {
  assertStrictEquals(CodePoint.toString(-0x0), "U+0000");
  assertStrictEquals(CodePoint.toString(0x0), "U+0000");
  assertStrictEquals(CodePoint.toString(0xFFFF), "U+FFFF");
  assertStrictEquals(CodePoint.toString(0x10000), "U+10000");
  assertStrictEquals(CodePoint.toString(0x10FFFF), "U+10FFFF");

  assertThrows(
    () => {
      CodePoint.toString(-1);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      CodePoint.toString(0x110000);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );

  assertThrows(
    () => {
      CodePoint.toString("0" as unknown as number);
    },
    TypeError,
    "`codePoint` must be a code point.",
  );
});

Deno.test("CodePoint.planeOf()", () => {
  assertStrictEquals(CodePoint.planeOf(0x0), 0);
  assertStrictEquals(CodePoint.planeOf(0xFFFF), 0);
  assertStrictEquals(CodePoint.planeOf(0x10000), 1);
  assertStrictEquals(CodePoint.planeOf(0x1FFFF), 1);
  assertStrictEquals(CodePoint.planeOf(0x20000), 2);
  assertStrictEquals(CodePoint.planeOf(0x2FFFF), 2);
  assertStrictEquals(CodePoint.planeOf(0x30000), 3);
  assertStrictEquals(CodePoint.planeOf(0x3FFFF), 3);
  assertStrictEquals(CodePoint.planeOf(0x40000), 4);
  assertStrictEquals(CodePoint.planeOf(0x4FFFF), 4);
  assertStrictEquals(CodePoint.planeOf(0x50000), 5);
  assertStrictEquals(CodePoint.planeOf(0x5FFFF), 5);
  assertStrictEquals(CodePoint.planeOf(0x60000), 6);
  assertStrictEquals(CodePoint.planeOf(0x6FFFF), 6);
  assertStrictEquals(CodePoint.planeOf(0x70000), 7);
  assertStrictEquals(CodePoint.planeOf(0x7FFFF), 7);
  assertStrictEquals(CodePoint.planeOf(0x80000), 8);
  assertStrictEquals(CodePoint.planeOf(0x8FFFF), 8);
  assertStrictEquals(CodePoint.planeOf(0x90000), 9);
  assertStrictEquals(CodePoint.planeOf(0x9FFFF), 9);
  assertStrictEquals(CodePoint.planeOf(0xA0000), 10);
  assertStrictEquals(CodePoint.planeOf(0xAFFFF), 10);
  assertStrictEquals(CodePoint.planeOf(0xB0000), 11);
  assertStrictEquals(CodePoint.planeOf(0xBFFFF), 11);
  assertStrictEquals(CodePoint.planeOf(0xC0000), 12);
  assertStrictEquals(CodePoint.planeOf(0xCFFFF), 12);
  assertStrictEquals(CodePoint.planeOf(0xD0000), 13);
  assertStrictEquals(CodePoint.planeOf(0xDFFFF), 13);
  assertStrictEquals(CodePoint.planeOf(0xE0000), 14);
  assertStrictEquals(CodePoint.planeOf(0xEFFFF), 14);
  assertStrictEquals(CodePoint.planeOf(0xF0000), 15);
  assertStrictEquals(CodePoint.planeOf(0xFFFFF), 15);
  assertStrictEquals(CodePoint.planeOf(0x100000), 16);
  assertStrictEquals(CodePoint.planeOf(0x10FFFF), 16);

  assertThrows(
    () => {
      CodePoint.planeOf(-1);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePoint.planeOf(0x110000);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePoint.planeOf("0" as unknown as number);
    },
    TypeError,
    "codePoint",
  );
});
