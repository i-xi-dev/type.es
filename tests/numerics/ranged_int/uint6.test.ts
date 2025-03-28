import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics, type uint6 } from "../../../mod.ts";

const { Uint6 } = Numerics;

Deno.test("Numerics.Uint6.BIT_LENGTH", () => {
  assertStrictEquals(Uint6.BIT_LENGTH, 6);
});

Deno.test("Numerics.Uint6.MIN_VALUE", () => {
  assertStrictEquals(Uint6.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint6.MAX_VALUE", () => {
  assertStrictEquals(Uint6.MAX_VALUE, 0x3F);
});

Deno.test("Numerics.Uint6.BYTE_LENGTH", () => {
  assertStrictEquals(Uint6.BYTE_LENGTH, 1);
});

Deno.test("Numerics.Uint6[Symbol.toStringTag]", () => {
  assertStrictEquals(
    (Uint6 as unknown as { [Symbol.toStringTag]: string })[Symbol.toStringTag],
    "Uint6",
  );
});

const le = "little-endian";
const be = "big-endian";

Deno.test("Numerics.Uint6.fromBytes()", () => {
  assertStrictEquals(Uint6.fromBytes(Uint8Array.of(0)), 0);
  assertStrictEquals(Uint6.fromBytes(Uint8Array.of(0), be), 0);
  assertStrictEquals(Uint6.fromBytes(Uint8Array.of(0), le), 0);

  assertStrictEquals(Uint6.fromBytes(Uint8Array.of(0x3F)), 0x3F);
  assertStrictEquals(Uint6.fromBytes(Uint8Array.of(0x3F), be), 0x3F);
  assertStrictEquals(Uint6.fromBytes(Uint8Array.of(0x3F), le), 0x3F);

  const e0 = "`bytes` must be an `Uint8Array<ArrayBuffer>`.";
  assertThrows(
    () => {
      Uint6.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    e0,
  );

  const e1 = "byte length unmatched.";
  assertThrows(
    () => {
      Uint6.fromBytes(Uint8Array.of());
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.fromBytes(Uint8Array.of(0, 0));
    },
    RangeError,
    e1,
  );

  const e2 = "parse result is overflowed.";
  assertThrows(
    () => {
      Uint6.fromBytes(Uint8Array.of(0x40));
    },
    RangeError,
    e2,
  );
});

Deno.test("Numerics.Uint6.toBytes()", () => {
  assertStrictEquals(
    [...Uint6.toBytes(0)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint6.toBytes(0, be)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint6.toBytes(0, le)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint6.toBytes(0x3F)].map((i) => i.toString()).join(","),
    "63",
  );
  assertStrictEquals(
    [...Uint6.toBytes(0x3F, be)].map((i) => i.toString()).join(","),
    "63",
  );
  assertStrictEquals(
    [...Uint6.toBytes(0x3F, le)].map((i) => i.toString()).join(
      ",",
    ),
    "63",
  );

  const e1 = "`value` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.toBytes(0x100 as unknown as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toBytes(-1 as unknown as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toBytes(undefined as unknown as uint6);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.Uint6.bitwiseAnd()", () => {
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b0000_00), 0b0000_00);

  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b0000_01), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b0000_01), 0b0000_01);

  const e1 = "`a` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseAnd(undefined as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0, undefined as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint6.bitwiseOr()", () => {
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b0000_01), 0b0000_01);

  const e1 = "`a` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.bitwiseOr(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseOr("0" as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.bitwiseOr(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseOr(0, null as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint6.bitwiseXOr()", () => {
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b0000_01), 0b0000_00);

  const e1 = "`a` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0n as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0, [0] as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint6.rotateLeft()", () => {
  assertStrictEquals(Uint6.rotateLeft(0b100000, 0), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 1), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 2), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 3), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 4), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 5), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 6), 0b100000);

  assertStrictEquals(Uint6.rotateLeft(0b011111, 0), 0b011111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 1), 0b111110);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 2), 0b111101);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 3), 0b111011);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 4), 0b110111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 5), 0b101111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 6), 0b011111);

  assertStrictEquals(Uint6.rotateLeft(0b000001, -1), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 0), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 1), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 2), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 3), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 4), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 5), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 6), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 7), 0b000010);

  assertStrictEquals(Uint6.rotateLeft(0b111111, 1), 0b111111);

  assertStrictEquals(Uint6.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 101), 0);

  const e1 = "`value` must be a 6-bit unsigned integer.";
  assertThrows(
    () => {
      Uint6.rotateLeft(0x40 as uint6, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.rotateLeft(-1 as uint6, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint6.rotateLeft(0x3F, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint6.truncate()", () => {
  assertStrictEquals(Uint6.truncate(-1), 63);
  assertStrictEquals(Uint6.truncate(0), 0);
  assertStrictEquals(Uint6.truncate(32), 32);
  assertStrictEquals(Uint6.truncate(64), 0);
  assertStrictEquals(Uint6.truncate(65), 1);
  assertStrictEquals(Uint6.truncate(128), 0);
  assertStrictEquals(Uint6.truncate(129), 1);

  const e2 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint6.truncate(0n as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.Uint6.saturate()", () => {
  assertStrictEquals(Uint6.saturate(0), 0);
  assertStrictEquals(Object.is(Uint6.saturate(-0), 0), true);
  assertStrictEquals(Uint6.saturate(1), 1);
  assertStrictEquals(Uint6.saturate(63), 63);
  assertStrictEquals(Uint6.saturate(64), 63);
  assertStrictEquals(Uint6.saturate(-1), 0);

  assertStrictEquals(Uint6.saturate(Number.MIN_SAFE_INTEGER), 0);
  assertStrictEquals(Uint6.saturate(Number.MAX_SAFE_INTEGER), 63);

  const e1 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint6.saturate(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.saturate("0" as unknown as number);
    },
    TypeError,
    e1,
  );

  assertThrows(
    () => {
      Uint6.saturate(Number.MAX_SAFE_INTEGER + 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.saturate(Number.MIN_SAFE_INTEGER - 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must be a safe integer.";
  assertThrows(
    () => {
      Uint6.saturate(0n as unknown as number);
    },
    TypeError,
    e2,
  );
});
