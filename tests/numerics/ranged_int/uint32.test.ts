import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics, type uint32 } from "../../../mod.ts";

const { Uint32 } = Numerics;

Deno.test("Numerics.Uint32.BIT_LENGTH", () => {
  assertStrictEquals(Uint32.BIT_LENGTH, 32);
});

Deno.test("Numerics.Uint32.MIN_VALUE", () => {
  assertStrictEquals(Uint32.MIN_VALUE, 0);
});

Deno.test("Numerics.Uint32.MAX_VALUE", () => {
  assertStrictEquals(Uint32.MAX_VALUE, 0xFFFFFFFF);
});

Deno.test("Numerics.Uint32.BYTE_LENGTH", () => {
  assertStrictEquals(Uint32.BYTE_LENGTH, 4);
});

const le = "little-endian";
const be = "big-endian";

const count = 16384;

const aArray1 = new Uint32Array(count);
crypto.getRandomValues(aArray1);

const bArray1 = new Uint32Array(count);
crypto.getRandomValues(bArray1);

function _bitwiseAnd(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba & bb) & 0b11111111_11111111_11111111_11111111n);
}

Deno.test("Numerics.Uint32.bitwiseAnd()", () => {
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );

  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0001,
  );

  const e1 = "`a` must be a 32-bit unsigned integer.";
  assertThrows(
    () => {
      Uint32.bitwiseAnd(0x100000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.bitwiseAnd([0] as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 32-bit unsigned integer.";
  assertThrows(
    () => {
      Uint32.bitwiseAnd(0, 0x100000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.bitwiseAnd(0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );

  for (let i = 0; i < count; i++) {
    const a = aArray1[i];
    const b = bArray1[i];
    const r1 = Uint32.bitwiseAnd(a, b);
    const r2 = _bitwiseAnd(a, b);
    //console.log(`0x${_format(a)} & 0x${_format(b)} -> ${_format(r1)} / ${_format(r2)}`,);
    assertStrictEquals(r1, r2);
  }
});

function _bitwiseOr(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba | bb) & 0b11111111_11111111_11111111_11111111n);
}

Deno.test("Numerics.Uint32.bitwiseOr()", () => {
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0001,
  );

  const e1 = "`a` must be a 32-bit unsigned integer.";
  assertThrows(
    () => {
      Uint32.bitwiseOr(0x100000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.bitwiseOr("0" as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 32-bit unsigned integer.";
  assertThrows(
    () => {
      Uint32.bitwiseOr(0, 0x100000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.bitwiseOr(0, null as unknown as number);
    },
    TypeError,
    e2,
  );

  for (let i = 0; i < count; i++) {
    const a = aArray1[i];
    const b = bArray1[i];
    const r1 = Uint32.bitwiseOr(a, b);
    const r2 = _bitwiseOr(a, b);
    //console.log(`0x${_format(a)} | 0x${_format(b)} -> ${_format(r1)} / ${_format(r2)}`,);
    assertStrictEquals(r1, r2);
  }
});

function _bitwiseXOr(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba ^ bb) & 0b11111111_11111111_11111111_11111111n);
}

Deno.test("Numerics.Uint32.bitwiseXOr()", () => {
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );

  const e1 = "`a` must be a 32-bit unsigned integer.";
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0x100000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0n as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "`b` must be a 32-bit unsigned integer.";
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0, 0x100000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0, [0] as unknown as number);
    },
    TypeError,
    e2,
  );

  for (let i = 0; i < count; i++) {
    const a = aArray1[i];
    const b = bArray1[i];
    const r1 = Uint32.bitwiseXOr(a, b);
    const r2 = _bitwiseXOr(a, b);
    //console.log(`0x${_format(a)} ^ 0x${_format(b)} -> ${_format(r1)} / ${_format(r2)}`);
    assertStrictEquals(r1, r2);
  }
});
