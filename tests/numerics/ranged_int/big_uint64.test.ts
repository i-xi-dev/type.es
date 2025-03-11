import { assertStrictEquals, assertThrows } from "@std/assert";
import { type biguint64, Numerics } from "../../../mod.ts";

const { BigUint64 } = Numerics;

Deno.test("Numerics.BigUint64.BIT_LENGTH", () => {
  assertStrictEquals(BigUint64.BIT_LENGTH, 64);
});

Deno.test("Numerics.BigUint64.MIN_VALUE", () => {
  assertStrictEquals(BigUint64.MIN_VALUE, 0n);
});

Deno.test("Numerics.BigUint64.MAX_VALUE", () => {
  assertStrictEquals(BigUint64.MAX_VALUE, 0xFFFFFFFF_FFFFFFFFn);
});

Deno.test("Numerics.BigUint64.BYTE_LENGTH", () => {
  assertStrictEquals(BigUint64.BYTE_LENGTH, 8);
});

const le = "little-endian";
const be = "big-endian";

Deno.test("Numerics.BigUint64.fromBytes()", () => {
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0)),
    0n,
  );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0), be),
    0n,
  );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0), le),
    0n,
  );

  // assertStrictEquals(BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0xFF)), 0xFFn);
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0xFF), be),
    0xFFn,
  );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0xFF, 0, 0, 0, 0, 0, 0, 0), le),
    0xFFn,
  );

  // assertStrictEquals(BigUint64.fromBytes(Uint8Array.of(0, 0, 0xFF, 0xFF)), 0xFFFFn);
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0xFF, 0xFF), be),
    0xFFFFn,
  );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0xFF, 0xFF, 0, 0, 0, 0, 0, 0), le),
    0xFFFFn,
  );

  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 13, 101), be),
    3429n,
  );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(101, 13, 0, 0, 0, 0, 0, 0), le),
    3429n,
  );

  // assertStrictEquals(
  //   BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0xFF, 0xFF, 0xFF)),
  //   0xFFFFFFn,
  // );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0xFF, 0xFF, 0xFF), be),
    0xFFFFFFn,
  );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0xFF, 0xFF, 0xFF, 0, 0, 0, 0, 0), le),
    0xFFFFFFn,
  );

  // assertStrictEquals(
  //   BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0xFF, 0xFF, 0xFF, 0xFF)),
  //   0xFFFFFFFFn,
  // );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0xFF, 0xFF, 0xFF, 0xFF), be),
    0xFFFFFFFFn,
  );
  assertStrictEquals(
    BigUint64.fromBytes(Uint8Array.of(0xFF, 0xFF, 0xFF, 0xFF, 0, 0, 0, 0), le),
    0xFFFFFFFFn,
  );

  assertStrictEquals(
    BigUint64.fromBytes(
      Uint8Array.of(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF),
    ),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertStrictEquals(
    BigUint64.fromBytes(
      Uint8Array.of(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF),
      be,
    ),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertStrictEquals(
    BigUint64.fromBytes(
      Uint8Array.of(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF),
      le,
    ),
    0xFFFFFFFF_FFFFFFFFn,
  );

  const e0 = "`bytes` must be an `Uint8Array<ArrayBuffer>`.";
  assertThrows(
    () => {
      BigUint64.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    e0,
  );

  const e1 = "byte length unmatched.";
  assertThrows(
    () => {
      BigUint64.fromBytes(Uint8Array.of());
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0));
    },
    RangeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.fromBytes(Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0));
    },
    RangeError,
    e1,
  );
});

Deno.test("Numerics.BigUint64.toBytes()", () => {
  assertStrictEquals(
    [...BigUint64.toBytes(0n)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0n, be)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0n, le)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFn)].map((i) => i.toString()).join(","),
  //   "0,0,0,0,0,0,0,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn, be)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn, le)].map((i) => i.toString()).join(","),
    "255,0,0,0,0,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0x100n)].map((i) => i.toString()).join(","),
  //   "0,0,0,0,0,0,1,0",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100n, be)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,1,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100n, le)].map((i) => i.toString()).join(","),
    "0,1,0,0,0,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFFFn)].map((i) => i.toString()).join(","),
  //   "0,0,0,0,0,0,255,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn, be)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn, le)].map((i) => i.toString()).join(","),
    "255,255,0,0,0,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0x10000n)].map((i) => i.toString()).join(","),
  //   "0,0,0,0,0,1,0,0",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n, be)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,1,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n, le)].map((i) => i.toString()).join(","),
    "0,0,1,0,0,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFFFFFn)].map((i) => i.toString()).join(","),
  //   "0,0,0,0,0,255,255,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn, be)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn, le)].map((i) => i.toString()).join(","),
    "255,255,255,0,0,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0x1000000n)].map((i) => i.toString()).join(","),
  //   "0,0,0,0,1,0,0,0",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n, be)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,1,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n, le)].map((i) => i.toString()).join(","),
    "0,0,0,1,0,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFFFFFFFn)].map((i) => i.toString()).join(","),
  //   "0,0,0,0,255,255,255,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn, be)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn, le)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,0,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0x100000000n)].map((i) => i.toString()).join(","),
  //   "0,0,0,1,0,0,0,0",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n, be)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,1,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n, le)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,1,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFFFFFFFFFn)].map((i) => i.toString()).join(","),
  //   "0,0,0,255,255,255,255,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn, be)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn, le)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,0,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0x10000000000n)].map((i) => i.toString()).join(","),
  //   "0,0,1,0,0,0,0,0",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n, be)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,1,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n, le)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,0,1,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFFFFFFFFFFFn)].map((i) => i.toString()).join(","),
  //   "0,0,255,255,255,255,255,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn, be)].map((i) => i.toString())
      .join(","),
    "0,0,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn, le)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,255,0,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0x1000000000000n)].map((i) => i.toString()).join(","),
  //   "0,1,0,0,0,0,0,0",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n, be)].map((i) => i.toString())
      .join(","),
    "0,1,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n, le)].map((i) => i.toString())
      .join(","),
    "0,0,0,0,0,0,1,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn)].map((i) => i.toString()).join(
  //     ",",
  //   ),
  //   "0,255,255,255,255,255,255,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn, be)].map((i) => i.toString())
      .join(","),
    "0,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn, le)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,0",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0x100000000000000n)].map((i) => i.toString()).join(
  //     ",",
  //   ),
  //   "1,0,0,0,0,0,0,0",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n, be)].map((i) => i.toString())
      .join(","),
    "1,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n, le)].map((i) => i.toString())
      .join(","),
    "0,0,0,0,0,0,0,1",
  );

  // assertStrictEquals(
  //   [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn)].map((i) => i.toString()).join(
  //     ",",
  //   ),
  //   "255,255,255,255,255,255,255,255",
  // );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn, be)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn, le)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,255",
  );

  const e1 = "`value` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.toBytes(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBytes(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBytes(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numerics.BigUint64.bitwiseAnd()", () => {
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );

  const e1 = "`a` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseAnd([0] as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0n, undefined as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.BigUint64.bitwiseOr()", () => {
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );

  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );

  const e1 = "`a` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseOr("0" as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0n, null as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.BigUint64.bitwiseXOr()", () => {
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );

  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  const e1 = "`a` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0 as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0n, [0] as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.BigUint64.rotateLeft()", () => {
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      1,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      2,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000010n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      3,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000100n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      4,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00001000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      5,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00010000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      6,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00100000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      7,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_01000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      8,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_10000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      9,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000001_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      10,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000010_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      11,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000100_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      12,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00001000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      13,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00010000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      14,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00100000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      15,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_01000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      16,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_10000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      17,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000001_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      18,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000010_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      19,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000100_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      20,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00001000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      21,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00010000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      22,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00100000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      23,
    ),
    0b00000000_00000000_00000000_00000000_00000000_01000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      24,
    ),
    0b00000000_00000000_00000000_00000000_00000000_10000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      25,
    ),
    0b00000000_00000000_00000000_00000000_00000001_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      26,
    ),
    0b00000000_00000000_00000000_00000000_00000010_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      27,
    ),
    0b00000000_00000000_00000000_00000000_00000100_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      28,
    ),
    0b00000000_00000000_00000000_00000000_00001000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      29,
    ),
    0b00000000_00000000_00000000_00000000_00010000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      30,
    ),
    0b00000000_00000000_00000000_00000000_00100000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      31,
    ),
    0b00000000_00000000_00000000_00000000_01000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      32,
    ),
    0b00000000_00000000_00000000_00000000_10000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      33,
    ),
    0b00000000_00000000_00000000_00000001_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      34,
    ),
    0b00000000_00000000_00000000_00000010_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      35,
    ),
    0b00000000_00000000_00000000_00000100_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      36,
    ),
    0b00000000_00000000_00000000_00001000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      37,
    ),
    0b00000000_00000000_00000000_00010000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      38,
    ),
    0b00000000_00000000_00000000_00100000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      39,
    ),
    0b00000000_00000000_00000000_01000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      40,
    ),
    0b00000000_00000000_00000000_10000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      41,
    ),
    0b00000000_00000000_00000001_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      42,
    ),
    0b00000000_00000000_00000010_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      43,
    ),
    0b00000000_00000000_00000100_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      44,
    ),
    0b00000000_00000000_00001000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      45,
    ),
    0b00000000_00000000_00010000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      46,
    ),
    0b00000000_00000000_00100000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      47,
    ),
    0b00000000_00000000_01000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      48,
    ),
    0b00000000_00000000_10000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      49,
    ),
    0b00000000_00000001_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      50,
    ),
    0b00000000_00000010_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      51,
    ),
    0b00000000_00000100_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      52,
    ),
    0b00000000_00001000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      53,
    ),
    0b00000000_00010000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      54,
    ),
    0b00000000_00100000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      55,
    ),
    0b00000000_01000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      56,
    ),
    0b00000000_10000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      57,
    ),
    0b00000001_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      58,
    ),
    0b00000010_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      59,
    ),
    0b00000100_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      60,
    ),
    0b00001000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      61,
    ),
    0b00010000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      62,
    ),
    0b00100000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      63,
    ),
    0b01000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      64,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      65,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      -1,
    ),
    0b01000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  assertStrictEquals(BigUint64.rotateLeft(0n, -1), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 0), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 1), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 101), 0n);

  const e1 = "`value` must be a 64-bit unsigned integer.";
  assertThrows(
    () => {
      BigUint64.rotateLeft(0x10000000000000000n as bigint, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.rotateLeft(-1n as bigint, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      BigUint64.rotateLeft(0xFFn, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.BigUint64.truncate()", () => {
  assertStrictEquals(BigUint64.truncate(-1n), 0xFFFF_FFFF_FFFF_FFFFn);
  assertStrictEquals(BigUint64.truncate(0n), 0n);
  assertStrictEquals(BigUint64.truncate(64n), 64n);
  assertStrictEquals(BigUint64.truncate(65n), 65n);
  assertStrictEquals(BigUint64.truncate(128n), 128n);
  assertStrictEquals(BigUint64.truncate(129n), 129n);
  assertStrictEquals(BigUint64.truncate(256n), 256n);
  assertStrictEquals(BigUint64.truncate(257n), 257n);
  assertStrictEquals(BigUint64.truncate(512n), 512n);
  assertStrictEquals(BigUint64.truncate(513n), 513n);
  assertStrictEquals(BigUint64.truncate(65535n), 65535n);
  assertStrictEquals(BigUint64.truncate(65536n), 65536n);
  assertStrictEquals(BigUint64.truncate(65537n), 65537n);
  assertStrictEquals(BigUint64.truncate(131071n), 131071n);
  assertStrictEquals(BigUint64.truncate(131072n), 131072n);
  assertStrictEquals(BigUint64.truncate(16777215n), 16777215n);
  assertStrictEquals(BigUint64.truncate(16777216n), 16777216n);
  assertStrictEquals(BigUint64.truncate(33554431n), 33554431n);
  assertStrictEquals(BigUint64.truncate(33554432n), 33554432n);
  assertStrictEquals(BigUint64.truncate(4294967295n), 4294967295n);
  assertStrictEquals(BigUint64.truncate(4294967296n), 4294967296n);
  assertStrictEquals(BigUint64.truncate(8589934591n), 8589934591n);
  assertStrictEquals(BigUint64.truncate(8589934592n), 8589934592n);
  assertStrictEquals(
    BigUint64.truncate(0xFFFF_FFFF_FFFF_FFFFn),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(BigUint64.truncate(0x1_0000_0000_0000_0000n), 0n);

  const e2 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigUint64.truncate(0 as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("Numerics.BigUint64.saturate()", () => {
  assertStrictEquals(BigUint64.saturate(0n), 0n);
  assertStrictEquals(Object.is(BigUint64.saturate(-0n), 0n), true);
  assertStrictEquals(BigUint64.saturate(1n), 1n);
  assertStrictEquals(BigUint64.saturate(63n), 63n);
  assertStrictEquals(BigUint64.saturate(64n), 64n);
  assertStrictEquals(BigUint64.saturate(127n), 127n);
  assertStrictEquals(BigUint64.saturate(128n), 128n);
  assertStrictEquals(BigUint64.saturate(255n), 255n);
  assertStrictEquals(BigUint64.saturate(256n), 256n);
  assertStrictEquals(BigUint64.saturate(65535n), 65535n);
  assertStrictEquals(BigUint64.saturate(65536n), 65536n);
  assertStrictEquals(BigUint64.saturate(16777215n), 16777215n);
  assertStrictEquals(BigUint64.saturate(16777216n), 16777216n);
  assertStrictEquals(BigUint64.saturate(4294967295n), 4294967295n);
  assertStrictEquals(
    BigUint64.saturate(0xFFFF_FFFF_FFFF_FFFFn),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(
    BigUint64.saturate(0x1_0000_0000_0000_0000n),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(BigUint64.saturate(-1n), 0n);

  assertStrictEquals(BigUint64.saturate(BigInt(Number.MIN_SAFE_INTEGER)), 0n);
  assertStrictEquals(
    BigUint64.saturate(BigInt(Number.MAX_SAFE_INTEGER)),
    BigInt(Number.MAX_SAFE_INTEGER),
  );

  const e1 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigUint64.saturate(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.saturate("0" as unknown as bigint);
    },
    TypeError,
    e1,
  );

  const e2 = "`value` must be a `bigint`.";
  assertThrows(
    () => {
      BigUint64.saturate(0 as unknown as bigint);
    },
    TypeError,
    e2,
  );
});
