import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics, type uint24 } from "../../../mod.ts";

const { Uint24 } = Numerics;

Deno.test("Numerics.Uint24.BIT_LENGTH", () => {
  assertStrictEquals(Uint24.BIT_LENGTH, 24);
});

Deno.test("Numerics.Uint24.MIN_VALUE", () => {
  assertStrictEquals(Uint24.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint24.MAX_VALUE", () => {
  assertStrictEquals(Uint24.MAX_VALUE, 0xFFFFFF);
});

Deno.test("Numerics.Uint24.BYTE_LENGTH", () => {
  assertStrictEquals(Uint24.BYTE_LENGTH, 3);
});

const le = "little-endian";
const be = "big-endian";

Deno.test("Numerics.Uint24.fromBytes()", () => {
  assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0, 0, 0)), 0);
  assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0, 0, 0), be), 0);
  assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0, 0, 0), le), 0);

  // assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0, 0, 0xFF)), 0xFF);
  assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0, 0, 0xFF), be), 0xFF);
  assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0xFF, 0, 0), le), 0xFF);

  // assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0, 0xFF, 0xFF)), 0xFFFF);
  assertStrictEquals(
    Uint24.fromBytes(Uint8Array.of(0, 0xFF, 0xFF), be),
    0xFFFF,
  );
  assertStrictEquals(
    Uint24.fromBytes(Uint8Array.of(0xFF, 0xFF, 0), le),
    0xFFFF,
  );

  assertStrictEquals(Uint24.fromBytes(Uint8Array.of(0, 13, 101), be), 3429);
  assertStrictEquals(Uint24.fromBytes(Uint8Array.of(101, 13, 0), le), 3429);

  assertStrictEquals(
    Uint24.fromBytes(Uint8Array.of(0xFF, 0xFF, 0xFF)),
    0xFFFFFF,
  );
  assertStrictEquals(
    Uint24.fromBytes(Uint8Array.of(0xFF, 0xFF, 0xFF), be),
    0xFFFFFF,
  );
  assertStrictEquals(
    Uint24.fromBytes(Uint8Array.of(0xFF, 0xFF, 0xFF), le),
    0xFFFFFF,
  );

  const e0 = "`bytes` must be an `Uint8Array`.";
  assertThrows(
    () => {
      Uint24.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    e0,
  );

  const e1 = "byte length unmatched.";
  assertThrows(
    () => {
      Uint24.fromBytes(Uint8Array.of());
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.fromBytes(Uint8Array.of(0, 0));
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.fromBytes(Uint8Array.of(0, 0, 0, 0));
    },
    RangeError,
    e1,
  );
});

Deno.test("Numerics.Uint24.toBytes()", () => {
  // assertStrictEquals(
  //   [...Uint24.toBytes(0)].map((i) => i.toString()).join(","),
  //   "0,0,0",
  // );
  assertStrictEquals(
    [...Uint24.toBytes(0, be)].map((i) => i.toString()).join(","),
    "0,0,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0, le)].map((i) => i.toString()).join(","),
    "0,0,0",
  );
  // assertStrictEquals(
  //   [...Uint24.toBytes(0xFF)].map((i) => i.toString()).join(","),
  //   "0,0,255",
  // );
  assertStrictEquals(
    [...Uint24.toBytes(0xFF, be)].map((i) => i.toString()).join(","),
    "0,0,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFF, le)].map((i) => i.toString()).join(","),
    "255,0,0",
  );

  // assertStrictEquals(
  //   [...Uint24.toBytes(0x100)].map((i) => i.toString()).join(","),
  //   "0,1,0",
  // );
  assertStrictEquals(
    [...Uint24.toBytes(0x100, be)].map((i) => i.toString()).join(","),
    "0,1,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0x100, le)].map((i) => i.toString()).join(","),
    "0,1,0",
  );

  // assertStrictEquals(
  //   [...Uint24.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
  //   "0,255,255",
  // );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFF, be)].map((i) => i.toString()).join(","),
    "0,255,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFF, le)].map((i) => i.toString()).join(","),
    "255,255,0",
  );

  // assertStrictEquals(
  //   [...Uint24.toBytes(0x10000)].map((i) => i.toString()).join(","),
  //   "1,0,0",
  // );
  assertStrictEquals(
    [...Uint24.toBytes(0x10000, be)].map((i) => i.toString()).join(","),
    "1,0,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0x10000, le)].map((i) => i.toString()).join(","),
    "0,0,1",
  );

  // assertStrictEquals(
  //   [...Uint24.toBytes(0xFFFFFF)].map((i) => i.toString()).join(","),
  //   "255,255,255",
  // );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFFFF, be)].map((i) => i.toString()).join(","),
    "255,255,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFFFF, le)].map((i) => i.toString()).join(","),
    "255,255,255",
  );

  const e1 = "`value` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.toBytes(0x1000000);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toBytes(-1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toBytes(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.Uint24.bitwiseAnd()", () => {
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );

  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0001,
  );

  const e1 = "`a` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0x1000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.bitwiseAnd([0] as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0, 0x1000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint24.bitwiseOr()", () => {
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0001,
  );

  const e1 = "`a` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.bitwiseOr(0x1000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.bitwiseOr("0" as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.bitwiseOr(0, 0x1000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.bitwiseOr(0, null as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint24.bitwiseXOr()", () => {
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );

  const e1 = "`a` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0x1000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0n as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0, 0x1000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0, [0] as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint24.rotateLeft()", () => {
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 0),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 1),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 2),
    0b00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 3),
    0b00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 4),
    0b00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 5),
    0b00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 6),
    0b00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 7),
    0b00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 8),
    0b00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 9),
    0b00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 10),
    0b00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 11),
    0b00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 12),
    0b00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 13),
    0b00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 14),
    0b00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 15),
    0b00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 16),
    0b00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 17),
    0b00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 18),
    0b00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 19),
    0b00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 20),
    0b00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 21),
    0b00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 22),
    0b00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 23),
    0b01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 24),
    0b10000000_00000000_00000000,
  );

  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 0),
    0b01111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 1),
    0b11111111_11111111_11111110,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 2),
    0b11111111_11111111_11111101,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 3),
    0b11111111_11111111_11111011,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 4),
    0b11111111_11111111_11110111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 5),
    0b11111111_11111111_11101111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 6),
    0b11111111_11111111_11011111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 7),
    0b11111111_11111111_10111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 8),
    0b11111111_11111111_01111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 9),
    0b11111111_11111110_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 10),
    0b11111111_11111101_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 11),
    0b11111111_11111011_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 12),
    0b11111111_11110111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 13),
    0b11111111_11101111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 14),
    0b11111111_11011111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 15),
    0b11111111_10111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 16),
    0b11111111_01111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 17),
    0b11111110_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 18),
    0b11111101_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 19),
    0b11111011_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 20),
    0b11110111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 21),
    0b11101111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 22),
    0b11011111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 23),
    0b10111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 24),
    0b01111111_11111111_11111111,
  );

  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, -25),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, -24),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, -1),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 0),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 1),
    0b00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 2),
    0b00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 3),
    0b00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 4),
    0b00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 5),
    0b00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 6),
    0b00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 7),
    0b00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 8),
    0b00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 9),
    0b00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 10),
    0b00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 11),
    0b00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 12),
    0b00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 13),
    0b00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 14),
    0b00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 15),
    0b00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 16),
    0b00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 17),
    0b00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 18),
    0b00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 19),
    0b00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 20),
    0b00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 21),
    0b00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 22),
    0b01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 23),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 24),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 25),
    0b00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 48),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 49),
    0b00000000_00000000_00000010,
  );

  assertStrictEquals(
    Uint24.rotateLeft(0b11111111_11111111_11111111, 1),
    0b11111111_11111111_11111111,
  );

  assertStrictEquals(Uint24.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint24.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint24.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint24.rotateLeft(0, 101), 0);

  const e1 = "`value` must be a 24-bit unsigned integer.";
  assertThrows(
    () => {
      Uint24.rotateLeft(0x100000000 as number, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.rotateLeft(-1 as number, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint24.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint24.truncate()", () => {
  assertStrictEquals(Uint24.truncate(-1), 16777215);
  assertStrictEquals(Uint24.truncate(0), 0);
  assertStrictEquals(Uint24.truncate(64), 64);
  assertStrictEquals(Uint24.truncate(65), 65);
  assertStrictEquals(Uint24.truncate(128), 128);
  assertStrictEquals(Uint24.truncate(129), 129);
  assertStrictEquals(Uint24.truncate(256), 256);
  assertStrictEquals(Uint24.truncate(257), 257);
  assertStrictEquals(Uint24.truncate(512), 512);
  assertStrictEquals(Uint24.truncate(513), 513);
  assertStrictEquals(Uint24.truncate(65535), 65535);
  assertStrictEquals(Uint24.truncate(65536), 65536);
  assertStrictEquals(Uint24.truncate(65537), 65537);
  assertStrictEquals(Uint24.truncate(131071), 131071);
  assertStrictEquals(Uint24.truncate(131072), 131072);
  assertStrictEquals(Uint24.truncate(16777215), 16777215);
  assertStrictEquals(Uint24.truncate(16777216), 0);
  assertStrictEquals(Uint24.truncate(33554431), 16777215);
  assertStrictEquals(Uint24.truncate(33554432), 0);

  const e2 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint24.truncate(0n as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint24.saturate()", () => {
  assertStrictEquals(Uint24.saturate(0), 0);
  assertStrictEquals(Object.is(Uint24.saturate(-0), 0), true);
  assertStrictEquals(Uint24.saturate(1), 1);
  assertStrictEquals(Uint24.saturate(63), 63);
  assertStrictEquals(Uint24.saturate(64), 64);
  assertStrictEquals(Uint24.saturate(127), 127);
  assertStrictEquals(Uint24.saturate(128), 128);
  assertStrictEquals(Uint24.saturate(255), 255);
  assertStrictEquals(Uint24.saturate(256), 256);
  assertStrictEquals(Uint24.saturate(65535), 65535);
  assertStrictEquals(Uint24.saturate(65536), 65536);
  assertStrictEquals(Uint24.saturate(16777215), 16777215);
  assertStrictEquals(Uint24.saturate(16777216), 16777215);
  assertStrictEquals(Uint24.saturate(-1), 0);

  assertStrictEquals(Uint24.saturate(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(
    Uint24.saturate(Number.MAX_SAFE_INTEGER),
    16777215,
  );

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint24.saturate(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.saturate("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint24.saturate(Number.MAX_SAFE_INTEGER + 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.saturate(Number.MIN_SAFE_INTEGER - 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint24.saturate(0n as unknown as number);
    },
    TypeError,
    e2,
  );
});
