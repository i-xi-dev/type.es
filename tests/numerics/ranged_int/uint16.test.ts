import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics, type uint16 } from "../../../mod.ts";

const { Uint16 } = Numerics;

Deno.test("Numerics.Uint16.BIT_LENGTH", () => {
  assertStrictEquals(Uint16.BIT_LENGTH, 16);
});

Deno.test("Numerics.Uint16.MIN_VALUE", () => {
  assertStrictEquals(Uint16.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint16.MAX_VALUE", () => {
  assertStrictEquals(Uint16.MAX_VALUE, 0xFFFF);
});

Deno.test("Numerics.Uint16.BYTE_LENGTH", () => {
  assertStrictEquals(Uint16.BYTE_LENGTH, 2);
});

const le = "little-endian";
const be = "big-endian";

Deno.test("Numerics.Uint16.fromBytes()", () => {
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0, 0)), 0);
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0, 0), be), 0);
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0, 0), le), 0);

  // assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0, 0xFF)), 0xFF);
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0, 0xFF), be), 0xFF);
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0xFF, 0), le), 0xFF);

  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0xFF, 0xFF)), 0xFFFF);
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0xFF, 0xFF), be), 0xFFFF);
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(0xFF, 0xFF), le), 0xFFFF);

  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(13, 101), be), 3429);
  assertStrictEquals(Uint16.fromBytes(Uint8Array.of(101, 13), le), 3429);

  const e0 = "`bytes` must be an `Uint8Array`.";
  assertThrows(
    () => {
      Uint16.fromBytes([0] as unknown as Uint8Array);
    },
    TypeError,
    e0,
  );

  const e1 = "byte length unmatched.";
  assertThrows(
    () => {
      Uint16.fromBytes(Uint8Array.of());
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromBytes(Uint8Array.of(0));
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromBytes(Uint8Array.of(0, 0, 0));
    },
    RangeError,
    e1,
  );
});

Deno.test("Numerics.Uint16.toBytes()", () => {
  // assertStrictEquals(
  //   [...Uint16.toBytes(0)].map((i) => i.toString()).join(","),
  //   "0,0",
  // );
  assertStrictEquals(
    [...Uint16.toBytes(0, be)].map((i) => i.toString()).join(","),
    "0,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0, le)].map((i) => i.toString()).join(","),
    "0,0",
  );
  // assertStrictEquals(
  //   [...Uint16.toBytes(0xFF)].map((i) => i.toString()).join(","),
  //   "0,255",
  // );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF, be)].map((i) => i.toString()).join(","),
    "0,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF, le)].map((i) => i.toString()).join(","),
    "255,0",
  );

  // assertStrictEquals(
  //   [...Uint16.toBytes(0x100)].map((i) => i.toString()).join(","),
  //   "1,0",
  // );
  assertStrictEquals(
    [...Uint16.toBytes(0x100, be)].map((i) => i.toString()).join(","),
    "1,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0x100, le)].map((i) => i.toString()).join(","),
    "0,1",
  );

  // assertStrictEquals(
  //   [...Uint16.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
  //   "255,255",
  // );
  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF, be)].map((i) => i.toString()).join(","),
    "255,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF, le)].map((i) => i.toString()).join(","),
    "255,255",
  );

  const e1 = "`value` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.toBytes(0x10000);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.toBytes(-1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.toBytes(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.Uint16.bitwiseAnd()", () => {
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );

  assertStrictEquals(
    Uint16.bitwiseAnd(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0001,
  );

  const e1 = "`a` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.bitwiseAnd(0x10000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.bitwiseAnd([0] as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.bitwiseAnd(0, 0x10000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.bitwiseAnd(0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint16.bitwiseOr()", () => {
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint16.bitwiseOr(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0001,
  );

  const e1 = "`a` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.bitwiseOr(0x10000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.bitwiseOr("0" as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.bitwiseOr(0, 0x10000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.bitwiseOr(0, null as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint16.bitwiseXOr()", () => {
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint16.bitwiseXOr(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0000,
  );

  const e1 = "`a` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0x10000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0n as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0, 0x10000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0, [0] as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint16.rotateLeft()", () => {
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 0),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 1),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 2),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 3),
    0b00000000_00000100,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 4),
    0b00000000_00001000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 5),
    0b00000000_00010000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 6),
    0b00000000_00100000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 7),
    0b00000000_01000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 8),
    0b00000000_10000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 9),
    0b00000001_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 10),
    0b00000010_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 11),
    0b00000100_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 12),
    0b00001000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 13),
    0b00010000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 14),
    0b00100000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 15),
    0b01000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 16),
    0b10000000_00000000,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 0),
    0b01111111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 1),
    0b11111111_11111110,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 2),
    0b11111111_11111101,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 3),
    0b11111111_11111011,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 4),
    0b11111111_11110111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 5),
    0b11111111_11101111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 6),
    0b11111111_11011111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 7),
    0b11111111_10111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 8),
    0b11111111_01111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 9),
    0b11111110_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 10),
    0b11111101_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 11),
    0b11111011_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 12),
    0b11110111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 13),
    0b11101111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 14),
    0b11011111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 15),
    0b10111111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 16),
    0b01111111_11111111,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -17),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -16),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -1),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 0),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 1),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 2),
    0b00000000_00000100,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 3),
    0b00000000_00001000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 4),
    0b00000000_00010000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 5),
    0b00000000_00100000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 6),
    0b00000000_01000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 7),
    0b00000000_10000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 8),
    0b00000001_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 9),
    0b00000010_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 10),
    0b00000100_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 11),
    0b00001000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 12),
    0b00010000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 13),
    0b00100000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 14),
    0b01000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 15),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 16),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 17),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 32),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 33),
    0b00000000_00000010,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b11111111_11111111, 1),
    0b11111111_11111111,
  );

  assertStrictEquals(Uint16.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint16.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint16.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint16.rotateLeft(0, 101), 0);

  const e1 = "`value` must be a 16-bit unsigned integer.";
  assertThrows(
    () => {
      Uint16.rotateLeft(0x10000 as number, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.rotateLeft(-1 as number, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint16.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint16.truncate()", () => {
  assertStrictEquals(Uint16.truncate(-1), 65535);
  assertStrictEquals(Uint16.truncate(0), 0);
  assertStrictEquals(Uint16.truncate(64), 64);
  assertStrictEquals(Uint16.truncate(65), 65);
  assertStrictEquals(Uint16.truncate(128), 128);
  assertStrictEquals(Uint16.truncate(129), 129);
  assertStrictEquals(Uint16.truncate(256), 256);
  assertStrictEquals(Uint16.truncate(257), 257);
  assertStrictEquals(Uint16.truncate(512), 512);
  assertStrictEquals(Uint16.truncate(513), 513);
  assertStrictEquals(Uint16.truncate(65535), 65535);
  assertStrictEquals(Uint16.truncate(65536), 0);
  assertStrictEquals(Uint16.truncate(65537), 1);
  assertStrictEquals(Uint16.truncate(131071), 65535);
  assertStrictEquals(Uint16.truncate(131072), 0);
});
