import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics, type uint7 } from "../../../mod.ts";

const { Uint7 } = Numerics;

Deno.test("Numerics.Uint7.BIT_LENGTH", () => {
  assertStrictEquals(Uint7.BIT_LENGTH, 7);
});

Deno.test("Numerics.Uint7.MIN_VALUE", () => {
  assertStrictEquals(Uint7.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint7.MAX_VALUE", () => {
  assertStrictEquals(Uint7.MAX_VALUE, 0x7F);
});

Deno.test("Numerics.Uint7.BYTE_LENGTH", () => {
  assertStrictEquals(Uint7.BYTE_LENGTH, 1);
});

const le = "little-endian";
const be = "big-endian";

Deno.test("Numerics.Uint7.toBytes()", () => {
  assertStrictEquals(
    [...Uint7.toBytes(0)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint7.toBytes(0, be)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint7.toBytes(0, le)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint7.toBytes(0x7F)].map((i) => i.toString()).join(","),
    "127",
  );
  assertStrictEquals(
    [...Uint7.toBytes(0x7F, be)].map((i) => i.toString()).join(","),
    "127",
  );
  assertStrictEquals(
    [...Uint7.toBytes(0x7F, le)].map((i) => i.toString()).join(
      ",",
    ),
    "127",
  );

  const e1 = "`value` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.toBytes(0x100 as unknown as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toBytes(-1 as unknown as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toBytes(undefined as unknown as uint7);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.Uint7.bitwiseAnd()", () => {
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b0000_000), 0b0000_000);

  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b0000_001), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b0000_001), 0b0000_001);

  const e1 = "`a` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseAnd([0] as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0, undefined as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint7.bitwiseOr()", () => {
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b0000_001), 0b0000_001);

  const e1 = "`a` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.bitwiseOr(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseOr("0" as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.bitwiseOr(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseOr(0, null as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint7.bitwiseXOr()", () => {
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b0000_001), 0b0000_000);

  const e1 = "`a` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0n as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0, [0] as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint7.rotateLeft()", () => {
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 0), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 1), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 2), 0b0000010);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 3), 0b0000100);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 4), 0b0001000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 5), 0b0010000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 6), 0b0100000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 7), 0b1000000);

  assertStrictEquals(Uint7.rotateLeft(0b0111111, 0), 0b0111111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 1), 0b1111110);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 2), 0b1111101);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 3), 0b1111011);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 4), 0b1110111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 5), 0b1101111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 6), 0b1011111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 7), 0b0111111);

  assertStrictEquals(Uint7.rotateLeft(0b0000001, -1), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 0), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 1), 0b0000010);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 2), 0b0000100);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 3), 0b0001000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 4), 0b0010000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 5), 0b0100000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 6), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 7), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 8), 0b0000010);

  assertStrictEquals(Uint7.rotateLeft(0b1111111, 1), 0b1111111);

  assertStrictEquals(Uint7.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 101), 0);

  const e1 = "`value` must be a 7-bit unsigned integer.";
  assertThrows(
    () => {
      Uint7.rotateLeft(0x80 as uint7, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.rotateLeft(-1 as uint7, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint7.rotateLeft(0x7F, 3.1);
    },
    TypeError,
    e2,
  );
});
