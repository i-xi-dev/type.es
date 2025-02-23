import { assertStrictEquals, assertThrows } from "@std/assert";
import { xNumerics } from "../../mod.ts";

const { Uint32 } = xNumerics;

Deno.test("Uint32.rotateLeft()", () => {
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 0),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 1),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 2),
    0b00000000_00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 3),
    0b00000000_00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 4),
    0b00000000_00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 5),
    0b00000000_00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 6),
    0b00000000_00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 7),
    0b00000000_00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 8),
    0b00000000_00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 9),
    0b00000000_00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 10),
    0b00000000_00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 11),
    0b00000000_00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 12),
    0b00000000_00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 13),
    0b00000000_00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 14),
    0b00000000_00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 15),
    0b00000000_00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 16),
    0b00000000_00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 17),
    0b00000000_00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 18),
    0b00000000_00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 19),
    0b00000000_00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 20),
    0b00000000_00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 21),
    0b00000000_00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 22),
    0b00000000_00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 23),
    0b00000000_01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 24),
    0b00000000_10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 25),
    0b00000001_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 26),
    0b00000010_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 27),
    0b00000100_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 28),
    0b00001000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 29),
    0b00010000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 30),
    0b00100000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 31),
    0b01000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 32),
    0b10000000_00000000_00000000_00000000,
  );

  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 0),
    0b01111111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 1),
    0b11111111_11111111_11111111_11111110,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 2),
    0b11111111_11111111_11111111_11111101,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 3),
    0b11111111_11111111_11111111_11111011,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 4),
    0b11111111_11111111_11111111_11110111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 5),
    0b11111111_11111111_11111111_11101111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 6),
    0b11111111_11111111_11111111_11011111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 7),
    0b11111111_11111111_11111111_10111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 8),
    0b11111111_11111111_11111111_01111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 9),
    0b11111111_11111111_11111110_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 10),
    0b11111111_11111111_11111101_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 11),
    0b11111111_11111111_11111011_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 12),
    0b11111111_11111111_11110111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 13),
    0b11111111_11111111_11101111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 14),
    0b11111111_11111111_11011111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 15),
    0b11111111_11111111_10111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 16),
    0b11111111_11111111_01111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 17),
    0b11111111_11111110_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 18),
    0b11111111_11111101_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 19),
    0b11111111_11111011_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 20),
    0b11111111_11110111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 21),
    0b11111111_11101111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 22),
    0b11111111_11011111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 23),
    0b11111111_10111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 24),
    0b11111111_01111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 25),
    0b11111110_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 26),
    0b11111101_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 27),
    0b11111011_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 28),
    0b11110111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 29),
    0b11101111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 30),
    0b11011111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 31),
    0b10111111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 32),
    0b01111111_11111111_11111111_11111111,
  );

  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, -33),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, -32),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, -1),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 0),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 1),
    0b00000000_00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 2),
    0b00000000_00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 3),
    0b00000000_00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 4),
    0b00000000_00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 5),
    0b00000000_00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 6),
    0b00000000_00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 7),
    0b00000000_00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 8),
    0b00000000_00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 9),
    0b00000000_00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 10),
    0b00000000_00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 11),
    0b00000000_00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 12),
    0b00000000_00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 13),
    0b00000000_00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 14),
    0b00000000_00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 15),
    0b00000000_00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 16),
    0b00000000_00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 17),
    0b00000000_00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 18),
    0b00000000_00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 19),
    0b00000000_00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 20),
    0b00000000_00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 21),
    0b00000000_00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 22),
    0b00000000_01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 23),
    0b00000000_10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 24),
    0b00000001_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 25),
    0b00000010_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 26),
    0b00000100_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 27),
    0b00001000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 28),
    0b00010000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 29),
    0b00100000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 30),
    0b01000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 31),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 32),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 33),
    0b00000000_00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 64),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 65),
    0b00000000_00000000_00000000_00000010,
  );

  assertStrictEquals(
    Uint32.rotateLeft(0b11111111_11111111_11111111_11111111, 1),
    0b11111111_11111111_11111111_11111111,
  );

  assertStrictEquals(Uint32.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint32.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint32.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint32.rotateLeft(0, 101), 0);

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.rotateLeft(0x100000000 as number, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.rotateLeft(-1 as number, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint32.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint32.fromNumber()", () => {
  assertStrictEquals(Uint32.fromNumber(0), 0);
  assertStrictEquals(Object.is(Uint32.fromNumber(-0), 0), true);
  assertStrictEquals(Uint32.fromNumber(1), 1);
  assertStrictEquals(Uint32.fromNumber(63), 63);
  assertStrictEquals(Uint32.fromNumber(64), 64);
  assertStrictEquals(Uint32.fromNumber(127), 127);
  assertStrictEquals(Uint32.fromNumber(128), 128);
  assertStrictEquals(Uint32.fromNumber(255), 255);
  assertStrictEquals(Uint32.fromNumber(256), 256);
  assertStrictEquals(Uint32.fromNumber(65535), 65535);
  assertStrictEquals(Uint32.fromNumber(65536), 65536);
  assertStrictEquals(Uint32.fromNumber(16777215), 16777215);
  assertStrictEquals(Uint32.fromNumber(16777216), 16777216);
  assertStrictEquals(Uint32.fromNumber(4294967295), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967296), 4294967295);
  assertStrictEquals(Uint32.fromNumber(-1), 0);

  assertStrictEquals(Uint32.fromNumber(Number.NEGATIVE_INFINITY), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MAX_SAFE_INTEGER), 4294967295);
  assertStrictEquals(Uint32.fromNumber(Number.POSITIVE_INFINITY), 4294967295);

  assertStrictEquals(Uint32.fromNumber(0.1), 0);
  assertStrictEquals(Uint32.fromNumber(0.4), 0);
  assertStrictEquals(Uint32.fromNumber(0.5), 0);
  assertStrictEquals(Uint32.fromNumber(0.6), 0);
  assertStrictEquals(Uint32.fromNumber(0.9), 0);

  assertStrictEquals(Object.is(Uint32.fromNumber(-0.1), 0), true);
  assertStrictEquals(Uint32.fromNumber(-0.4), 0);
  assertStrictEquals(Uint32.fromNumber(-0.5), 0);
  assertStrictEquals(Uint32.fromNumber(-0.6), 0);
  assertStrictEquals(Uint32.fromNumber(-0.9), 0);

  assertStrictEquals(Uint32.fromNumber(4294967295.1), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.4), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.5), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.6), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.9), 4294967295);

  const e1 = "`value` must be a `number`.";
  assertThrows(
    () => {
      Uint32.fromNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must not be `NaN`.";
  assertThrows(
    () => {
      Uint32.fromNumber(Number.NaN);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint32.fromNumber() - roundingMode", () => {
  const op = { roundingMode: "up" } as const;

  assertStrictEquals(Uint32.fromNumber(0, op), 0);
  assertStrictEquals(Object.is(Uint32.fromNumber(-0, op), 0), true);
  assertStrictEquals(Uint32.fromNumber(1, op), 1);
  assertStrictEquals(Uint32.fromNumber(63, op), 63);
  assertStrictEquals(Uint32.fromNumber(64, op), 64);
  assertStrictEquals(Uint32.fromNumber(127, op), 127);
  assertStrictEquals(Uint32.fromNumber(128, op), 128);
  assertStrictEquals(Uint32.fromNumber(255, op), 255);
  assertStrictEquals(Uint32.fromNumber(256, op), 256);
  assertStrictEquals(Uint32.fromNumber(65535, op), 65535);
  assertStrictEquals(Uint32.fromNumber(65536, op), 65536);
  assertStrictEquals(Uint32.fromNumber(16777215, op), 16777215);
  assertStrictEquals(Uint32.fromNumber(16777216, op), 16777216);
  assertStrictEquals(Uint32.fromNumber(4294967295, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967296, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(-1, op), 0);

  assertStrictEquals(Uint32.fromNumber(Number.NEGATIVE_INFINITY, op), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MIN_SAFE_INTEGER, op), 0);
  assertStrictEquals(
    Uint32.fromNumber(Number.MAX_SAFE_INTEGER, op),
    4294967295,
  );
  assertStrictEquals(
    Uint32.fromNumber(Number.POSITIVE_INFINITY, op),
    4294967295,
  );

  assertStrictEquals(Uint32.fromNumber(0.1, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.4, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.5, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.6, op), 1);
  assertStrictEquals(Uint32.fromNumber(0.9, op), 1);

  assertStrictEquals(Uint32.fromNumber(-0.1, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.4, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.5, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.6, op), 0);
  assertStrictEquals(Uint32.fromNumber(-0.9, op), 0);

  assertStrictEquals(Uint32.fromNumber(4294967295.1, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.4, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.5, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.6, op), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.9, op), 4294967295);

  const op2 = { roundingMode: "down" } as const;

  assertStrictEquals(Uint32.fromNumber(0, op2), 0);
  assertStrictEquals(Object.is(Uint32.fromNumber(-0, op2), 0), true);
  assertStrictEquals(Uint32.fromNumber(1, op2), 1);
  assertStrictEquals(Uint32.fromNumber(63, op2), 63);
  assertStrictEquals(Uint32.fromNumber(64, op2), 64);
  assertStrictEquals(Uint32.fromNumber(127, op2), 127);
  assertStrictEquals(Uint32.fromNumber(128, op2), 128);
  assertStrictEquals(Uint32.fromNumber(255, op2), 255);
  assertStrictEquals(Uint32.fromNumber(256, op2), 256);
  assertStrictEquals(Uint32.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint32.fromNumber(65536, op2), 65536);
  assertStrictEquals(Uint32.fromNumber(16777215, op2), 16777215);
  assertStrictEquals(Uint32.fromNumber(16777216, op2), 16777216);
  assertStrictEquals(Uint32.fromNumber(4294967295, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967296, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(-1, op2), 0);

  assertStrictEquals(Uint32.fromNumber(Number.NEGATIVE_INFINITY, op2), 0);
  assertStrictEquals(Uint32.fromNumber(Number.MIN_SAFE_INTEGER, op2), 0);
  assertStrictEquals(
    Uint32.fromNumber(Number.MAX_SAFE_INTEGER, op2),
    4294967295,
  );
  assertStrictEquals(
    Uint32.fromNumber(Number.POSITIVE_INFINITY, op2),
    4294967295,
  );

  assertStrictEquals(Uint32.fromNumber(0.1, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.4, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.5, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.6, op2), 0);
  assertStrictEquals(Uint32.fromNumber(0.9, op2), 0);

  assertStrictEquals(Uint32.fromNumber(-0.1, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.4, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.5, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.6, op2), 0);
  assertStrictEquals(Uint32.fromNumber(-0.9, op2), 0);

  assertStrictEquals(Uint32.fromNumber(4294967295.1, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.4, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.5, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.6, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967295.9, op2), 4294967295);
});

Deno.test("Uint32.fromNumber() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint32`.";
  assertThrows(
    () => {
      Uint32.fromNumber(-1, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromNumber(4294967296, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint32.fromNumber(-1, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(64, op2), 64);
  assertStrictEquals(Uint32.fromNumber(65, op2), 65);
  assertStrictEquals(Uint32.fromNumber(128, op2), 128);
  assertStrictEquals(Uint32.fromNumber(129, op2), 129);
  assertStrictEquals(Uint32.fromNumber(256, op2), 256);
  assertStrictEquals(Uint32.fromNumber(257, op2), 257);
  assertStrictEquals(Uint32.fromNumber(512, op2), 512);
  assertStrictEquals(Uint32.fromNumber(513, op2), 513);
  assertStrictEquals(Uint32.fromNumber(65535, op2), 65535);
  assertStrictEquals(Uint32.fromNumber(65536, op2), 65536);
  assertStrictEquals(Uint32.fromNumber(131071, op2), 131071);
  assertStrictEquals(Uint32.fromNumber(131072, op2), 131072);
  assertStrictEquals(Uint32.fromNumber(16777215, op2), 16777215);
  assertStrictEquals(Uint32.fromNumber(16777216, op2), 16777216);
  assertStrictEquals(Uint32.fromNumber(33554431, op2), 33554431);
  assertStrictEquals(Uint32.fromNumber(33554432, op2), 33554432);
  assertStrictEquals(Uint32.fromNumber(4294967295, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(4294967296, op2), 0);
  assertStrictEquals(Uint32.fromNumber(8589934591, op2), 4294967295);
  assertStrictEquals(Uint32.fromNumber(8589934592, op2), 0);
});

Deno.test("Uint32.fromBigInt()", () => {
  assertStrictEquals(Uint32.fromBigInt(0n), 0);
  assertStrictEquals(Object.is(Uint32.fromBigInt(-0n), 0), true);
  assertStrictEquals(Uint32.fromBigInt(1n), 1);
  assertStrictEquals(Uint32.fromBigInt(63n), 63);
  assertStrictEquals(Uint32.fromBigInt(64n), 64);
  assertStrictEquals(Uint32.fromBigInt(127n), 127);
  assertStrictEquals(Uint32.fromBigInt(128n), 128);
  assertStrictEquals(Uint32.fromBigInt(255n), 255);
  assertStrictEquals(Uint32.fromBigInt(256n), 256);
  assertStrictEquals(Uint32.fromBigInt(65535n), 65535);
  assertStrictEquals(Uint32.fromBigInt(65536n), 65536);
  assertStrictEquals(Uint32.fromBigInt(16777215n), 16777215);
  assertStrictEquals(Uint32.fromBigInt(16777216n), 16777216);
  assertStrictEquals(Uint32.fromBigInt(4294967295n), 4294967295);
  assertStrictEquals(Uint32.fromBigInt(4294967296n), 4294967295);
  assertStrictEquals(Uint32.fromBigInt(-1n), 0);

  assertStrictEquals(Uint32.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), 0);
  assertStrictEquals(
    Uint32.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)),
    4294967295,
  );

  const e1 = "`value` must be a `bigint` in the safe integer range.";
  assertThrows(
    () => {
      Uint32.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromBigInt("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint32.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint32.fromBigInt() - overflowMode", () => {
  const op = { overflowMode: "exception" } as const;

  const e1 = "`value` must be within the range of `uint32`.";
  assertThrows(
    () => {
      Uint32.fromBigInt(-1n, op);
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.fromBigInt(4294967296n, op);
    },
    RangeError,
    e1,
  );

  const op2 = { overflowMode: "truncate" } as const;

  assertStrictEquals(Uint32.fromBigInt(-1n, op2), 4294967295);
  assertStrictEquals(Uint32.fromBigInt(64n, op2), 64);
  assertStrictEquals(Uint32.fromBigInt(65n, op2), 65);
  assertStrictEquals(Uint32.fromBigInt(128n, op2), 128);
  assertStrictEquals(Uint32.fromBigInt(129n, op2), 129);
  assertStrictEquals(Uint32.fromBigInt(256n, op2), 256);
  assertStrictEquals(Uint32.fromBigInt(257n, op2), 257);
  assertStrictEquals(Uint32.fromBigInt(512n, op2), 512);
  assertStrictEquals(Uint32.fromBigInt(513n, op2), 513);
  assertStrictEquals(Uint32.fromBigInt(65535n, op2), 65535);
  assertStrictEquals(Uint32.fromBigInt(65536n, op2), 65536);
  assertStrictEquals(Uint32.fromBigInt(65537n, op2), 65537);
  assertStrictEquals(Uint32.fromBigInt(131071n, op2), 131071);
  assertStrictEquals(Uint32.fromBigInt(131072n, op2), 131072);
  assertStrictEquals(Uint32.fromBigInt(16777215n, op2), 16777215);
  assertStrictEquals(Uint32.fromBigInt(16777216n, op2), 16777216);
  assertStrictEquals(Uint32.fromBigInt(4294967295n, op2), 4294967295);
  assertStrictEquals(Uint32.fromBigInt(4294967296n, op2), 0);
});

Deno.test("Uint32.toBigInt()", () => {
  assertStrictEquals(Uint32.toBigInt(0), 0n);
  assertStrictEquals(Uint32.toBigInt(-0), 0n);
  assertStrictEquals(Uint32.toBigInt(0xFFFFFFFF), 0xFFFFFFFFn);

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.toBigInt(0x100000000 as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.toBigInt(-1 as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.toBigInt(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint32.fromString()", () => {
  assertStrictEquals(Uint32.fromString("0"), 0);
  assertStrictEquals(Uint32.fromString("-0"), 0);
  assertStrictEquals(Uint32.fromString("1"), 1);
  assertStrictEquals(Uint32.fromString("-1"), 0);
  assertStrictEquals(Uint32.fromString("4294967295"), 4294967295);
  assertStrictEquals(Uint32.fromString("4294967296"), 4294967295);

  // const e1 = "`value` must be a `string`.";
  const e2 = "`value` must be text representation of 10 based integer.";
  const e22 = "`value` must be text representation of 2 based integer.";
  const e28 = "`value` must be text representation of 8 based integer.";
  const e216 = "`value` must be text representation of 16 based integer.";
  assertThrows(
    () => {
      Uint32.fromString("");
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.fromString(undefined as unknown as string);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.fromString(0 as unknown as string);
    },
    TypeError,
    e2,
  );

  const e3 = "`value` must be within the range of `uint32`.";

  const op2 = { radix: 2 } as const;
  assertStrictEquals(Uint32.fromString("0", op2), 0);
  assertStrictEquals(
    Uint32.fromString("00000000000000000000000000000000", op2),
    0,
  );
  assertStrictEquals(
    Uint32.fromString("11111111111111111111111111111111", op2),
    4294967295,
  );
  assertStrictEquals(
    Uint32.fromString("+011111111111111111111111111111111", op2),
    4294967295,
  );
  assertThrows(
    () => {
      Uint32.fromString("2", op2);
    },
    TypeError,
    e22,
  );
  const op2e = { radix: 2, overflowMode: "exception" } as const;
  assertThrows(
    () => {
      Uint32.fromString("-1", op2e);
    },
    RangeError,
    e3,
  );

  const op8 = { radix: 8 } as const;
  assertStrictEquals(Uint32.fromString("0", op8), 0);
  assertStrictEquals(Uint32.fromString("00000000000", op8), 0);
  assertStrictEquals(Uint32.fromString("37777777777", op8), 4294967295);
  assertStrictEquals(Uint32.fromString("+037777777777", op8), 4294967295);
  assertThrows(
    () => {
      Uint32.fromString("8", op8);
    },
    TypeError,
    e28,
  );

  const op10 = { radix: 10 } as const;
  assertStrictEquals(Uint32.fromString("0", op10), 0);
  assertStrictEquals(Uint32.fromString("0000000000", op10), 0);
  assertStrictEquals(Uint32.fromString("4294967295", op10), 4294967295);
  assertStrictEquals(Uint32.fromString("+04294967295", op10), 4294967295);
  assertThrows(
    () => {
      Uint32.fromString("a", op10);
    },
    TypeError,
    e2,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint32.fromString("0", op16), 0);
  assertStrictEquals(Uint32.fromString("00000000", op16), 0);
  assertStrictEquals(Uint32.fromString("ffffffff", op16), 4294967295);
  assertStrictEquals(Uint32.fromString("FFFFFFFF", op16), 4294967295);
  assertStrictEquals(Uint32.fromString("+0FFFFFFFF", op16), 4294967295);
  assertThrows(
    () => {
      Uint32.fromString("g", op16);
    },
    TypeError,
    e216,
  );
});

Deno.test("Uint32.toString()", () => {
  assertStrictEquals(Uint32.toString(0), "0");
  assertStrictEquals(Uint32.toString(-0), "0");
  assertStrictEquals(Uint32.toString(1), "1");
  assertStrictEquals(Uint32.toString(63), "63");
  assertStrictEquals(Uint32.toString(127), "127");
  assertStrictEquals(Uint32.toString(255), "255");
  assertStrictEquals(Uint32.toString(65535), "65535");
  assertStrictEquals(Uint32.toString(16777215), "16777215");
  assertStrictEquals(Uint32.toString(4294967295), "4294967295");

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.toString(0x100000000 as number);
    },
    TypeError,
    e1,
  );

  const op16 = { radix: 16 } as const;
  assertStrictEquals(Uint32.toString(0, op16), "0");
  assertStrictEquals(Uint32.toString(63, op16), "3F");

  const op16l = { radix: 16, lowerCase: true } as const;
  assertStrictEquals(Uint32.toString(0, op16l), "0");
  assertStrictEquals(Uint32.toString(63, op16l), "3f");

  const op16l2 = { radix: 16, lowerCase: true, minIntegralDigits: 2 } as const;
  assertStrictEquals(Uint32.toString(0, op16l2), "00");
  assertStrictEquals(Uint32.toString(63, op16l2), "3f");

  const op16u3 = { radix: 16, lowerCase: false, minIntegralDigits: 3 } as const;
  assertStrictEquals(Uint32.toString(0, op16u3), "000");
  assertStrictEquals(Uint32.toString(63, op16u3), "03F");
});

Deno.test("Uint32.byteLength", () => {
  assertStrictEquals(Uint32.byteLength, 4);
});

Deno.test("Uint32.toBytes()", () => {
  assertStrictEquals(
    [...Uint32.toBytes(0)].map((i) => i.toString()).join(","),
    "0,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0, false)].map((i) => i.toString()).join(","),
    "0,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0, true)].map((i) => i.toString()).join(","),
    "0,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFF)].map((i) => i.toString()).join(","),
    "0,0,0,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFF, false)].map((i) => i.toString()).join(","),
    "0,0,0,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFF, true)].map((i) => i.toString()).join(","),
    "255,0,0,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0x100)].map((i) => i.toString()).join(","),
    "0,0,1,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x100, false)].map((i) => i.toString()).join(","),
    "0,0,1,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x100, true)].map((i) => i.toString()).join(","),
    "0,1,0,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
    "0,0,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFF, false)].map((i) => i.toString()).join(","),
    "0,0,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,0,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0x10000)].map((i) => i.toString()).join(","),
    "0,1,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x10000, false)].map((i) => i.toString()).join(","),
    "0,1,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x10000, true)].map((i) => i.toString()).join(","),
    "0,0,1,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFF)].map((i) => i.toString()).join(","),
    "0,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFF, false)].map((i) => i.toString()).join(","),
    "0,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,255,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0x1000000)].map((i) => i.toString()).join(","),
    "1,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x1000000, false)].map((i) => i.toString()).join(","),
    "1,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x1000000, true)].map((i) => i.toString()).join(","),
    "0,0,0,1",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFFFF)].map((i) => i.toString()).join(","),
    "255,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFFFF, false)].map((i) => i.toString()).join(","),
    "255,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,255,255",
  );

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.toBytes(0x100000000);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.toBytes(-1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.toBytes(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});
