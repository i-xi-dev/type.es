import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint16 } from "../../mod.ts";

Deno.test("Uint16.bitLength", () => {
  assertStrictEquals(Uint16.bitLength, 16);
});

Deno.test("Uint16.inRange()", () => {
  assertStrictEquals(Uint16.inRange(-1), false);
  assertStrictEquals(Uint16.inRange(-0), true);
  assertStrictEquals(Uint16.inRange(0), true);
  assertStrictEquals(Uint16.inRange(63), true);
  assertStrictEquals(Uint16.inRange(64), true);
  assertStrictEquals(Uint16.inRange(127), true);
  assertStrictEquals(Uint16.inRange(128), true);
  assertStrictEquals(Uint16.inRange(255), true);
  assertStrictEquals(Uint16.inRange(256), true);
  assertStrictEquals(Uint16.inRange(65535), true);
  assertStrictEquals(Uint16.inRange(65536), false);
  assertStrictEquals(Uint16.inRange(0xFFFFFFFF), false);
  assertStrictEquals(Uint16.inRange(0x100000000), false);

  assertStrictEquals(Uint16.inRange(0.1), false);
  assertStrictEquals(Uint16.inRange(0.5), false);
  assertStrictEquals(Uint16.inRange("0" as unknown as number), false);
  assertStrictEquals(Uint16.inRange(false as unknown as number), false);
  assertStrictEquals(Uint16.inRange({} as unknown as number), false);
  assertStrictEquals(Uint16.inRange([] as unknown as number), false);
  assertStrictEquals(Uint16.inRange([0] as unknown as number), false);
  assertStrictEquals(Uint16.inRange(undefined as unknown as number), false);
  assertStrictEquals(Uint16.inRange(null as unknown as number), false);
});

Deno.test("Uint16.bitwiseAnd()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
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

  const e2 = "The type of `other` does not match the type of `uint16`.";
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

Deno.test("Uint16.bitwiseOr()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
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

  const e2 = "The type of `other` does not match the type of `uint16`.";
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

Deno.test("Uint16.bitwiseXOr()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
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

  const e2 = "The type of `other` does not match the type of `uint16`.";
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

Deno.test("Uint16.rotateLeft()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
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

Deno.test("Uint16.fromNumber()", () => {
  assertStrictEquals(Uint16.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint16.fromNumber(-0), 0), true);
  assertStrictEquals(Uint16.fromNumber(1), 1);
  assertStrictEquals(Uint16.fromNumber(63), 63);
  assertStrictEquals(Uint16.fromNumber(64), 64);
  assertStrictEquals(Uint16.fromNumber(127), 127);
  assertStrictEquals(Uint16.fromNumber(128), 128);
  assertStrictEquals(Uint16.fromNumber(255), 255);
  assertStrictEquals(Uint16.fromNumber(256), 256);
  assertStrictEquals(Uint16.fromNumber(65535), 65535);
  assertStrictEquals(Uint16.fromNumber(65536), 65535);
  assertStrictEquals(Uint16.fromNumber(-1), 0);

  assertStrictEquals(Uint16.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MAX_SAFE_INTEGER), 65535);
  assertStrictEquals(Uint16.fromNumber(Number.POSITIVE_INFINITY), 65535);

  assertStrictEquals(Uint16.fromNumber(0.1), 0);
  assertStrictEquals(Uint16.fromNumber(0.4), 0);
  assertStrictEquals(Uint16.fromNumber(0.5), 0);
  assertStrictEquals(Uint16.fromNumber(0.6), 0);
  assertStrictEquals(Uint16.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint16.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint16.fromNumber(-0.4), 0);
  assertStrictEquals(Uint16.fromNumber(-0.5), 0);
  assertStrictEquals(Uint16.fromNumber(-0.6), 0);
  assertStrictEquals(Uint16.fromNumber(-0.9), 0);

  assertStrictEquals(Uint16.fromNumber(65535.1), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.4), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.5), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.6), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.9), 65535);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint16.fromNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint16.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint16.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint16.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint16.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint16.fromNumber(1, op), 1);
  assertStrictEquals(Uint16.fromNumber(63, op), 63);
  assertStrictEquals(Uint16.fromNumber(64, op), 64);
  assertStrictEquals(Uint16.fromNumber(127, op), 127);
  assertStrictEquals(Uint16.fromNumber(128, op), 128);
  assertStrictEquals(Uint16.fromNumber(255, op), 255);
  assertStrictEquals(Uint16.fromNumber(256, op), 256);
  assertStrictEquals(Uint16.fromNumber(65535, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65536, op), 65535);
  assertStrictEquals(Uint16.fromNumber(-1, op), 0);

  assertStrictEquals(Uint16.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MAX_SAFE_INTEGER, op), 65535);
  assertStrictEquals(Uint16.fromNumber(Number.POSITIVE_INFINITY, op), 65535);

  assertStrictEquals(Uint16.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint16.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint16.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint16.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint16.fromNumber(65535.1, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.4, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.5, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.6, op), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.9, op), 65535);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint16.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint16.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint16.fromNumber(1, op2), 1);
  assertStrictEquals(Uint16.fromNumber(63, op2), 63);
  assertStrictEquals(Uint16.fromNumber(64, op2), 64);
  assertStrictEquals(Uint16.fromNumber(127, op2), 127);
  assertStrictEquals(Uint16.fromNumber(128, op2), 128);
  assertStrictEquals(Uint16.fromNumber(255, op2), 255);
  assertStrictEquals(Uint16.fromNumber(256, op2), 256);
  assertStrictEquals(Uint16.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65536, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint16.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(Uint16.fromNumber(Number.MAX_SAFE_INTEGER, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(Number.POSITIVE_INFINITY, op2), 65535);

  assertStrictEquals(Uint16.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint16.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint16.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint16.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint16.fromNumber(65535.1, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.4, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.5, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.6, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65535.9, op2), 65535);
});

Deno.test("Uint16.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint16`.";
  assertThrows(
    () => {
      Uint16.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromNumber(65536, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint16.fromNumber(-1, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(64, op2), 64);
  assertStrictEquals(Uint16.fromNumber(65, op2), 65);
  assertStrictEquals(Uint16.fromNumber(128, op2), 128);
  assertStrictEquals(Uint16.fromNumber(129, op2), 129);
  assertStrictEquals(Uint16.fromNumber(256, op2), 256);
  assertStrictEquals(Uint16.fromNumber(257, op2), 257);
  assertStrictEquals(Uint16.fromNumber(512, op2), 512);
  assertStrictEquals(Uint16.fromNumber(513, op2), 513);
  assertStrictEquals(Uint16.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(65536, op2), 0);
  assertStrictEquals(Uint16.fromNumber(131071, op2), 65535);
  assertStrictEquals(Uint16.fromNumber(131072, op2), 0);
});

Deno.test("Uint16.toNumber()", () => {
  assertStrictEquals(Uint16.toNumber(0), 0);
  assertStrictEquals(Uint16.toNumber(-0), 0);
  assertStrictEquals(Object.is(Uint16.toNumber(-0), 0), true);
  assertStrictEquals(Uint16.toNumber(0xFFFF), 0xFFFF);

  const e1 = "The type of `self` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.toNumber(0x10000);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.toNumber(-1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.toNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint16.fromBigInt()", () => {
  assertStrictEquals(Uint16.fromBigInt(0n), 0);
  assertStrictEquals(Object.is(Uint16.fromBigInt(-0n), 0), true);
  assertStrictEquals(Uint16.fromBigInt(1n), 1);
  assertStrictEquals(Uint16.fromBigInt(63n), 63);
  assertStrictEquals(Uint16.fromBigInt(64n), 64);
  assertStrictEquals(Uint16.fromBigInt(127n), 127);
  assertStrictEquals(Uint16.fromBigInt(128n), 128);
  assertStrictEquals(Uint16.fromBigInt(255n), 255);
  assertStrictEquals(Uint16.fromBigInt(256n), 256);
  assertStrictEquals(Uint16.fromBigInt(65535n), 65535);
  assertStrictEquals(Uint16.fromBigInt(65536n), 65535);
  assertStrictEquals(Uint16.fromBigInt(-1n), 0);

  assertStrictEquals(Uint16.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0);
  assertStrictEquals(Uint16.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)), 65535);

  const e1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      Uint16.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must be within the range of safe integer.";
  assertThrows(
    () => {
      Uint16.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    RangeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    RangeError,
    e2,
  );
});

Deno.test("Uint16.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint16`.";
  assertThrows(
    () => {
      Uint16.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.fromBigInt(65536n, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint16.fromBigInt(-1n, op2), 65535);
  assertStrictEquals(Uint16.fromBigInt(64n, op2), 64);
  assertStrictEquals(Uint16.fromBigInt(65n, op2), 65);
  assertStrictEquals(Uint16.fromBigInt(128n, op2), 128);
  assertStrictEquals(Uint16.fromBigInt(129n, op2), 129);
  assertStrictEquals(Uint16.fromBigInt(256n, op2), 256);
  assertStrictEquals(Uint16.fromBigInt(257n, op2), 257);
  assertStrictEquals(Uint16.fromBigInt(512n, op2), 512);
  assertStrictEquals(Uint16.fromBigInt(513n, op2), 513);
  assertStrictEquals(Uint16.fromBigInt(65535n, op2), 65535);
  assertStrictEquals(Uint16.fromBigInt(65536n, op2), 0);
  assertStrictEquals(Uint16.fromBigInt(65537n, op2), 1);
  assertStrictEquals(Uint16.fromBigInt(131071n, op2), 65535);
  assertStrictEquals(Uint16.fromBigInt(131072n, op2), 0);
});

Deno.test("Uint16.toBigInt()", () => {
  assertStrictEquals(Uint16.toBigInt(0), 0n);
  assertStrictEquals(Uint16.toBigInt(-0), 0n);
  assertStrictEquals(Uint16.toBigInt(0xFFFF), 0xFFFFn);

  const e1 = "The type of `self` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.toBigInt(0x10000 as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.toBigInt(-1 as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.toBigInt(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint16.fromString()", () => {
  assertStrictEquals(Uint16.fromString("0"), 0);
  assertStrictEquals(Uint16.fromString("-0"), 0);
  assertStrictEquals(Uint16.fromString("1"), 1);
  assertStrictEquals(Uint16.fromString("-1"), 0);
  assertStrictEquals(Uint16.fromString("65535"), 65535);
  assertStrictEquals(Uint16.fromString("65536"), 65535);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be a decimal representation of an integer.";
  const e22 = "`value` must be a binary representation of an integer.";
  const e28 = "`value` must be an octal representation of an integer.";
  const e216 = "`value` must be a hexadecimal representation of an integer.";
  assertThrows(
    () => {
      Uint16.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint16`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint16.fromString("0", op2), 0);
  assertStrictEquals(Uint16.fromString("0000000000000000", op2), 0);
  assertStrictEquals(Uint16.fromString("1111111111111111", op2), 65535);
  assertStrictEquals(Uint16.fromString("+01111111111111111", op2), 65535);
  assertThrows(
    () => {
      Uint16.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint16.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint16.fromString("0", op8), 0);
  assertStrictEquals(Uint16.fromString("000000", op8), 0);
  assertStrictEquals(Uint16.fromString("177777", op8), 65535);
  assertStrictEquals(Uint16.fromString("+0177777", op8), 65535);
  assertThrows(
    () => {
      Uint16.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint16.fromString("0", op10), 0);
  assertStrictEquals(Uint16.fromString("00000", op10), 0);
  assertStrictEquals(Uint16.fromString("65535", op10), 65535);
  assertStrictEquals(Uint16.fromString("+065535", op10), 65535);
  assertThrows(
    () => {
      Uint16.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint16.fromString("0", op16), 0);
  assertStrictEquals(Uint16.fromString("0000", op16), 0);
  assertStrictEquals(Uint16.fromString("ffff", op16), 65535);
  assertStrictEquals(Uint16.fromString("FFFF", op16), 65535);
  assertStrictEquals(Uint16.fromString("+0FFFF", op16), 65535);
  assertThrows(
    () => {
      Uint16.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});

Deno.test("Uint16.toString()", () => {
  assertStrictEquals(Uint16.toString(0), "0");
  assertStrictEquals(Uint16.toString(-0), "0");
  assertStrictEquals(Uint16.toString(1), "1");
  assertStrictEquals(Uint16.toString(63), "63");
  assertStrictEquals(Uint16.toString(127), "127");
  assertStrictEquals(Uint16.toString(255), "255");
  assertStrictEquals(Uint16.toString(65535), "65535");

  const e1 = "The type of `self` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.toString(0x10000 as number);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint16.toString(0, op16), "0");
  assertStrictEquals(Uint16.toString(63, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(Uint16.toString(0, op16l), "0");
  assertStrictEquals(Uint16.toString(63, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(Uint16.toString(0, op16l2), "00");
  assertStrictEquals(Uint16.toString(63, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(Uint16.toString(0, op16u3), "000");
  assertStrictEquals(Uint16.toString(63, op16u3), "03F");
});

Deno.test("Uint16.byteLength", () => {
  assertStrictEquals(Uint16.byteLength, 2);
});

Deno.test("Uint16.toBytes()", () => {
  assertStrictEquals(
    [...Uint16.toBytes(0)].map((i) => i.toString()).join(","),
    "0,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0, false)].map((i) => i.toString()).join(","),
    "0,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0, true)].map((i) => i.toString()).join(","),
    "0,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF)].map((i) => i.toString()).join(","),
    "0,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF, false)].map((i) => i.toString()).join(","),
    "0,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF, true)].map((i) => i.toString()).join(","),
    "255,0",
  );

  assertStrictEquals(
    [...Uint16.toBytes(0x100)].map((i) => i.toString()).join(","),
    "1,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0x100, false)].map((i) => i.toString()).join(","),
    "1,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0x100, true)].map((i) => i.toString()).join(","),
    "0,1",
  );

  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
    "255,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF, false)].map((i) => i.toString()).join(","),
    "255,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF, true)].map((i) => i.toString()).join(","),
    "255,255",
  );

  const e1 = "The type of `self` does not match the type of `uint16`.";
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
