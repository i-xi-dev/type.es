import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../mod.ts";

const { CodePoint } = Text;

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
