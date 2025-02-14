import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../mod.ts";

const { CodePoint } = Text;

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

Deno.test("CodePoint.isBmp()", () => {
  assertStrictEquals(CodePoint.isBmp(0x0), true);
  assertStrictEquals(CodePoint.isBmp(0xFFFF), true);
  assertStrictEquals(CodePoint.isBmp(0x10000), false);
  assertStrictEquals(CodePoint.isBmp(0x10FFFF), false);

  assertStrictEquals(CodePoint.isBmp(-1), false);
  assertStrictEquals(CodePoint.isBmp(0x110000), false);
});

Deno.test("CodePoint.isInPlanes()", () => {
  assertStrictEquals(CodePoint.isInPlanes(0x0, []), false);

  assertStrictEquals(CodePoint.isInPlanes(0x0, [0]), true);
  assertStrictEquals(CodePoint.isInPlanes(0xFFFF, [0]), true);
  assertStrictEquals(CodePoint.isInPlanes(0x0, [1]), false);
  assertStrictEquals(CodePoint.isInPlanes(0x100000, [16]), true);
  assertStrictEquals(CodePoint.isInPlanes(0x10FFFF, [16]), true);

  assertStrictEquals(CodePoint.isInPlanes(0x0, [0, 16]), true);
  assertStrictEquals(CodePoint.isInPlanes(0xFFFF, [0, 16]), true);
  assertStrictEquals(CodePoint.isInPlanes(0x0, [1, 16]), false);
  assertStrictEquals(CodePoint.isInPlanes(0x100000, [0, 16]), true);
  assertStrictEquals(CodePoint.isInPlanes(0x10FFFF, [0, 16]), true);

  assertStrictEquals(CodePoint.isInPlanes(-1, []), false);
  assertStrictEquals(CodePoint.isInPlanes(0.5, []), false);
  assertStrictEquals(CodePoint.isInPlanes(0x110000, []), false);

  //assertStrictEquals(CodePoint.isInPlanes(0x0, [1, 16]), false);
  assertThrows(
    () => {
      CodePoint.isInPlanes(0, undefined as unknown as []);
    },
    TypeError,
    "planes",
  );

  assertThrows(
    () => {
      CodePoint.isInPlanes(0, "0" as unknown as []);
    },
    TypeError,
    "planes",
  );

  const epa = "`planes` must be a array of planes.";
  assertThrows(
    () => {
      CodePoint.isInPlanes(0, [-1] as unknown as []);
    },
    TypeError,
    epa,
  );

  assertThrows(
    () => {
      CodePoint.isInPlanes(0, [17] as unknown as []);
    },
    TypeError,
    epa,
  );
});
