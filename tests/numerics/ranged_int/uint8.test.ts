import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics, type uint8 } from "../../../mod.ts";

const { Uint8 } = Numerics;

Deno.test("Numerics.Uint8.BIT_LENGTH", () => {
  assertStrictEquals(Uint8.BIT_LENGTH, 8);
  // Uint8.BIT_LENGTH=6;
  // delete Uint8["BIT_LENGTH"];
  // assertStrictEquals(Uint8.BIT_LENGTH, 8);
});

Deno.test("Numerics.Uint8.MIN_VALUE", () => {
  assertStrictEquals(Uint8.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint8.MAX_VALUE", () => {
  assertStrictEquals(Uint8.MAX_VALUE, 0xFF);
});

Deno.test("Numerics.Uint8.BYTE_LENGTH", () => {
  assertStrictEquals(Uint8.BYTE_LENGTH, 1);
});

Deno.test("Numerics.Uint8[Symbol.toStringTag]", () => {
  assertStrictEquals(
    (Uint8 as unknown as { [Symbol.toStringTag]: string })[Symbol.toStringTag],
    "Uint8",
  );
});

const le = "little-endian";
const be = "big-endian";

Deno.test("Numerics.Uint8.fromBytes()", () => {
  assertStrictEquals(Uint8.fromBytes(Uint8Array.of(0)), 0);
  assertStrictEquals(Uint8.fromBytes(Uint8Array.of(0), be), 0);
  assertStrictEquals(Uint8.fromBytes(Uint8Array.of(0), le), 0);

  assertStrictEquals(Uint8.fromBytes(Uint8Array.of(0xFF)), 0xFF);
  assertStrictEquals(Uint8.fromBytes(Uint8Array.of(0xFF), be), 0xFF);
  assertStrictEquals(Uint8.fromBytes(Uint8Array.of(0xFF), le), 0xFF);

  const e0 = "`bytes` must be an `Uint8Array<ArrayBuffer>`.";
  assertThrows(
    () => {
      Uint8.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    e0,
  );

  const e1 = "byte length unmatched.";
  assertThrows(
    () => {
      Uint8.fromBytes(Uint8Array.of());
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.fromBytes(Uint8Array.of(0, 0));
    },
    RangeError,
    e1,
  );
});

Deno.test("Numerics.Uint8.toBytes()", () => {
  assertStrictEquals(
    [...Uint8.toBytes(0)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0, be)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0, le)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0xFF)].map((i) => i.toString()).join(","),
    "255",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0xFF, be)].map((i) => i.toString()).join(","),
    "255",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0xFF, le)].map((i) => i.toString()).join(
      ",",
    ),
    "255",
  );

  const e1 = "`value` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.toBytes(0x100 as unknown as uint8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.toBytes(-1 as unknown as uint8);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.toBytes(undefined as unknown as uint8);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.Uint8.bitwiseAnd()", () => {
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b0000_0000), 0b0000_0000);

  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b0000_0001), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b0000_0001), 0b0000_0001);

  const e1 = "`a` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0x100 as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.bitwiseAnd([0] as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0, 0x100 as unknown as uint8);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0, undefined as unknown as uint8);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint8.bitwiseOr()", () => {
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b0000_0001), 0b0000_0001);

  const e1 = "`a` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.bitwiseOr(0x100 as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.bitwiseOr("0" as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.bitwiseOr(0, 0x100 as unknown as uint8);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.bitwiseOr(0, null as unknown as uint8);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint8.bitwiseXOr()", () => {
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b0000_0001), 0b0000_0000);

  const e1 = "`a` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0x100 as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0n as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0, 0x100 as unknown as uint8);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0, [0] as unknown as uint8);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint8.rotateLeft()", () => {
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 0), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 1), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 2), 0b00000010);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 3), 0b00000100);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 4), 0b00001000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 5), 0b00010000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 6), 0b00100000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 7), 0b01000000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 8), 0b10000000);

  assertStrictEquals(Uint8.rotateLeft(0b01111111, 0), 0b01111111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 1), 0b11111110);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 2), 0b11111101);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 3), 0b11111011);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 4), 0b11110111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 5), 0b11101111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 6), 0b11011111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 7), 0b10111111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 8), 0b01111111);

  assertStrictEquals(Uint8.rotateLeft(0b00000001, -9), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, -8), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, -1), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 0), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 1), 0b00000010);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 2), 0b00000100);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 3), 0b00001000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 4), 0b00010000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 5), 0b00100000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 6), 0b01000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 7), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 8), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 9), 0b00000010);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 16), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 17), 0b00000010);

  assertStrictEquals(Uint8.rotateLeft(0b11111111, 1), 0b11111111);

  assertStrictEquals(Uint8.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint8.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint8.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint8.rotateLeft(0, 101), 0);

  const e1 = "`value` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8.rotateLeft(256 as uint8, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.rotateLeft(-1 as uint8, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint8.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint8.truncate()", () => {
  assertStrictEquals(Uint8.truncate(-1), 255);
  assertStrictEquals(Uint8.truncate(0), 0);
  assertStrictEquals(Uint8.truncate(64), 64);
  assertStrictEquals(Uint8.truncate(65), 65);
  assertStrictEquals(Uint8.truncate(128), 128);
  assertStrictEquals(Uint8.truncate(129), 129);
  assertStrictEquals(Uint8.truncate(256), 0);
  assertStrictEquals(Uint8.truncate(257), 1);
  assertStrictEquals(Uint8.truncate(512), 0);
  assertStrictEquals(Uint8.truncate(513), 1);

  const e2 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint8.truncate(0n as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint8.saturate()", () => {
  assertStrictEquals(Uint8.saturate(0), 0);
  assertStrictEquals(Object.is(Uint8.saturate(-0), 0), true);
  assertStrictEquals(Uint8.saturate(1), 1);
  assertStrictEquals(Uint8.saturate(63), 63);
  assertStrictEquals(Uint8.saturate(64), 64);
  assertStrictEquals(Uint8.saturate(127), 127);
  assertStrictEquals(Uint8.saturate(128), 128);
  assertStrictEquals(Uint8.saturate(255), 255);
  assertStrictEquals(Uint8.saturate(256), 255);
  assertStrictEquals(Uint8.saturate(-1), 0);

  assertStrictEquals(Uint8.saturate(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint8.saturate(Number.MAX_SAFE_INTEGER), 255);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint8.saturate(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.saturate("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint8.saturate(Number.MAX_SAFE_INTEGER + 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.saturate(Number.MIN_SAFE_INTEGER - 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint8.saturate(0n as unknown as number);
    },
    TypeError,
    e2,
  );
});
