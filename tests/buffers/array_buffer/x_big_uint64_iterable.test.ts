import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { type biguint64, Buffers, ByteOrder } from "../../../mod.ts";

const { ArrayBuffer: ExArrayBuffer } = Buffers;

Deno.test("Buffers.ArrayBuffer.fromBigUint64Iterable(Array<biguint64>)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.fromBigUint64Iterable(0 as unknown as Array<biguint64>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromBigUint64Iterable(1 as unknown as Array<biguint64>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromBigUint64Iterable(
        [-1] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "`value[0]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromBigUint64Iterable(
        ["0"] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "`value[0]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromBigUint64Iterable(
        [0x1_0000_0000_0000_0000n] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "`value[0]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromBigUint64Iterable(
        [0n, 0x1_0000_0000_0000_0000n] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "`value[1]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromBigUint64Iterable(
        [0n, -1n] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "`value[1]` must be a 64-bit unsigned integer.",
  );

  assertStrictEquals(ExArrayBuffer.fromBigUint64Iterable([]).byteLength, 0);

  const a1be = new Uint8Array(ExArrayBuffer.fromBigUint64Iterable(
    [0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn],
    { byteOrder: "big-endian" },
  ));
  assertStrictEquals(a1be.length, 24);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 0);
  assertStrictEquals(a1be[8], 0);
  assertStrictEquals(a1be[9], 0);
  assertStrictEquals(a1be[10], 0);
  assertStrictEquals(a1be[11], 0);
  assertStrictEquals(a1be[12], 0);
  assertStrictEquals(a1be[13], 0);
  assertStrictEquals(a1be[14], 0);
  assertStrictEquals(a1be[15], 1);
  assertStrictEquals(a1be[16], 255);
  assertStrictEquals(a1be[17], 255);
  assertStrictEquals(a1be[18], 255);
  assertStrictEquals(a1be[19], 255);
  assertStrictEquals(a1be[20], 255);
  assertStrictEquals(a1be[21], 255);
  assertStrictEquals(a1be[22], 255);
  assertStrictEquals(a1be[23], 255);

  const a1le = new Uint8Array(ExArrayBuffer.fromBigUint64Iterable(
    [0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn],
    { byteOrder: "little-endian" },
  ));
  assertStrictEquals(a1le.length, 24);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 0);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 1);
  assertStrictEquals(a1le[9], 0);
  assertStrictEquals(a1le[10], 0);
  assertStrictEquals(a1le[11], 0);
  assertStrictEquals(a1le[12], 0);
  assertStrictEquals(a1le[13], 0);
  assertStrictEquals(a1le[14], 0);
  assertStrictEquals(a1le[15], 0);
  assertStrictEquals(a1le[16], 255);
  assertStrictEquals(a1le[17], 255);
  assertStrictEquals(a1le[18], 255);
  assertStrictEquals(a1le[19], 255);
  assertStrictEquals(a1le[20], 255);
  assertStrictEquals(a1le[21], 255);
  assertStrictEquals(a1le[22], 255);
  assertStrictEquals(a1le[23], 255);

  const a1x = new Uint8Array(
    ExArrayBuffer.fromBigUint64Iterable([0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn]),
  );
  assertStrictEquals(a1x.length, 24);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 0);
    assertStrictEquals(a1x[9], 0);
    assertStrictEquals(a1x[10], 0);
    assertStrictEquals(a1x[11], 0);
    assertStrictEquals(a1x[12], 0);
    assertStrictEquals(a1x[13], 0);
    assertStrictEquals(a1x[14], 0);
    assertStrictEquals(a1x[15], 1);
    assertStrictEquals(a1x[16], 255);
    assertStrictEquals(a1x[17], 255);
    assertStrictEquals(a1x[18], 255);
    assertStrictEquals(a1x[19], 255);
    assertStrictEquals(a1x[20], 255);
    assertStrictEquals(a1x[21], 255);
    assertStrictEquals(a1x[22], 255);
    assertStrictEquals(a1x[23], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 1);
    assertStrictEquals(a1x[9], 0);
    assertStrictEquals(a1x[10], 0);
    assertStrictEquals(a1x[11], 0);
    assertStrictEquals(a1x[12], 0);
    assertStrictEquals(a1x[13], 0);
    assertStrictEquals(a1x[14], 0);
    assertStrictEquals(a1x[15], 0);
    assertStrictEquals(a1x[16], 255);
    assertStrictEquals(a1x[17], 255);
    assertStrictEquals(a1x[18], 255);
    assertStrictEquals(a1x[19], 255);
    assertStrictEquals(a1x[20], 255);
    assertStrictEquals(a1x[21], 255);
    assertStrictEquals(a1x[22], 255);
    assertStrictEquals(a1x[23], 255);
  }
});

Deno.test("Buffers.ArrayBuffer.fromBigUint64Iterable(BigUint64Array)", () => {
  assertStrictEquals(
    ExArrayBuffer.fromBigUint64Iterable(BigUint64Array.of()).byteLength,
    0,
  );

  const a1be = new Uint8Array(ExArrayBuffer.fromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
    { byteOrder: "big-endian" },
  ));
  assertStrictEquals(a1be.length, 24);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 0);
  assertStrictEquals(a1be[8], 0);
  assertStrictEquals(a1be[9], 0);
  assertStrictEquals(a1be[10], 0);
  assertStrictEquals(a1be[11], 0);
  assertStrictEquals(a1be[12], 0);
  assertStrictEquals(a1be[13], 0);
  assertStrictEquals(a1be[14], 0);
  assertStrictEquals(a1be[15], 1);
  assertStrictEquals(a1be[16], 255);
  assertStrictEquals(a1be[17], 255);
  assertStrictEquals(a1be[18], 255);
  assertStrictEquals(a1be[19], 255);
  assertStrictEquals(a1be[20], 255);
  assertStrictEquals(a1be[21], 255);
  assertStrictEquals(a1be[22], 255);
  assertStrictEquals(a1be[23], 255);

  const a1le = new Uint8Array(ExArrayBuffer.fromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
    { byteOrder: "little-endian" },
  ));
  assertStrictEquals(a1le.length, 24);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 0);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 1);
  assertStrictEquals(a1le[9], 0);
  assertStrictEquals(a1le[10], 0);
  assertStrictEquals(a1le[11], 0);
  assertStrictEquals(a1le[12], 0);
  assertStrictEquals(a1le[13], 0);
  assertStrictEquals(a1le[14], 0);
  assertStrictEquals(a1le[15], 0);
  assertStrictEquals(a1le[16], 255);
  assertStrictEquals(a1le[17], 255);
  assertStrictEquals(a1le[18], 255);
  assertStrictEquals(a1le[19], 255);
  assertStrictEquals(a1le[20], 255);
  assertStrictEquals(a1le[21], 255);
  assertStrictEquals(a1le[22], 255);
  assertStrictEquals(a1le[23], 255);

  const a1x = new Uint8Array(ExArrayBuffer.fromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
  ));
  assertStrictEquals(a1x.length, 24);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 0);
    assertStrictEquals(a1x[9], 0);
    assertStrictEquals(a1x[10], 0);
    assertStrictEquals(a1x[11], 0);
    assertStrictEquals(a1x[12], 0);
    assertStrictEquals(a1x[13], 0);
    assertStrictEquals(a1x[14], 0);
    assertStrictEquals(a1x[15], 1);
    assertStrictEquals(a1x[16], 255);
    assertStrictEquals(a1x[17], 255);
    assertStrictEquals(a1x[18], 255);
    assertStrictEquals(a1x[19], 255);
    assertStrictEquals(a1x[20], 255);
    assertStrictEquals(a1x[21], 255);
    assertStrictEquals(a1x[22], 255);
    assertStrictEquals(a1x[23], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 1);
    assertStrictEquals(a1x[9], 0);
    assertStrictEquals(a1x[10], 0);
    assertStrictEquals(a1x[11], 0);
    assertStrictEquals(a1x[12], 0);
    assertStrictEquals(a1x[13], 0);
    assertStrictEquals(a1x[14], 0);
    assertStrictEquals(a1x[15], 0);
    assertStrictEquals(a1x[16], 255);
    assertStrictEquals(a1x[17], 255);
    assertStrictEquals(a1x[18], 255);
    assertStrictEquals(a1x[19], 255);
    assertStrictEquals(a1x[20], 255);
    assertStrictEquals(a1x[21], 255);
    assertStrictEquals(a1x[22], 255);
    assertStrictEquals(a1x[23], 255);
  }
});

Deno.test("Buffers.ArrayBuffer.fromBigUint64Iterable(Generator<biguint64>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(ExArrayBuffer.fromBigUint64Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1be = new Uint8Array(
    ExArrayBuffer.fromBigUint64Iterable(g1, { byteOrder: "big-endian" }),
  );
  assertStrictEquals(a1be.length, 24);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 0);
  assertStrictEquals(a1be[8], 0);
  assertStrictEquals(a1be[9], 0);
  assertStrictEquals(a1be[10], 0);
  assertStrictEquals(a1be[11], 0);
  assertStrictEquals(a1be[12], 0);
  assertStrictEquals(a1be[13], 0);
  assertStrictEquals(a1be[14], 0);
  assertStrictEquals(a1be[15], 1);
  assertStrictEquals(a1be[16], 255);
  assertStrictEquals(a1be[17], 255);
  assertStrictEquals(a1be[18], 255);
  assertStrictEquals(a1be[19], 255);
  assertStrictEquals(a1be[20], 255);
  assertStrictEquals(a1be[21], 255);
  assertStrictEquals(a1be[22], 255);
  assertStrictEquals(a1be[23], 255);

  const g2 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1le = new Uint8Array(
    ExArrayBuffer.fromBigUint64Iterable(g2, { byteOrder: "little-endian" }),
  );
  assertStrictEquals(a1le.length, 24);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 0);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 1);
  assertStrictEquals(a1le[9], 0);
  assertStrictEquals(a1le[10], 0);
  assertStrictEquals(a1le[11], 0);
  assertStrictEquals(a1le[12], 0);
  assertStrictEquals(a1le[13], 0);
  assertStrictEquals(a1le[14], 0);
  assertStrictEquals(a1le[15], 0);
  assertStrictEquals(a1le[16], 255);
  assertStrictEquals(a1le[17], 255);
  assertStrictEquals(a1le[18], 255);
  assertStrictEquals(a1le[19], 255);
  assertStrictEquals(a1le[20], 255);
  assertStrictEquals(a1le[21], 255);
  assertStrictEquals(a1le[22], 255);
  assertStrictEquals(a1le[23], 255);

  const g3 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1x = new Uint8Array(ExArrayBuffer.fromBigUint64Iterable(g3));
  assertStrictEquals(a1x.length, 24);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 0);
    assertStrictEquals(a1x[9], 0);
    assertStrictEquals(a1x[10], 0);
    assertStrictEquals(a1x[11], 0);
    assertStrictEquals(a1x[12], 0);
    assertStrictEquals(a1x[13], 0);
    assertStrictEquals(a1x[14], 0);
    assertStrictEquals(a1x[15], 1);
    assertStrictEquals(a1x[16], 255);
    assertStrictEquals(a1x[17], 255);
    assertStrictEquals(a1x[18], 255);
    assertStrictEquals(a1x[19], 255);
    assertStrictEquals(a1x[20], 255);
    assertStrictEquals(a1x[21], 255);
    assertStrictEquals(a1x[22], 255);
    assertStrictEquals(a1x[23], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 1);
    assertStrictEquals(a1x[9], 0);
    assertStrictEquals(a1x[10], 0);
    assertStrictEquals(a1x[11], 0);
    assertStrictEquals(a1x[12], 0);
    assertStrictEquals(a1x[13], 0);
    assertStrictEquals(a1x[14], 0);
    assertStrictEquals(a1x[15], 0);
    assertStrictEquals(a1x[16], 255);
    assertStrictEquals(a1x[17], 255);
    assertStrictEquals(a1x[18], 255);
    assertStrictEquals(a1x[19], 255);
    assertStrictEquals(a1x[20], 255);
    assertStrictEquals(a1x[21], 255);
    assertStrictEquals(a1x[22], 255);
    assertStrictEquals(a1x[23], 255);
  }
});

Deno.test("Buffers.ArrayBuffer.fromBigUint64AsyncIterable(Array<biguint64>)", async () => {
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(
        0 as unknown as AsyncIterable<biguint64>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(
        1 as unknown as AsyncIterable<biguint64>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(
        [-1] as unknown as AsyncIterable<biguint64>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(
        ["0"] as unknown as AsyncIterable<biguint64>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(
        [256] as unknown as AsyncIterable<biguint64>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(
        [0, 256] as unknown as AsyncIterable<biguint64>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Buffers.ArrayBuffer.fromBigUint64AsyncIterable(AsyncGenerator<BigUint64>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await ExArrayBuffer.fromBigUint64AsyncIterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1 = new BigUint64Array(
    await ExArrayBuffer.fromBigUint64AsyncIterable(g1),
  );
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0n);
  assertStrictEquals(a1[1], 1n);
  assertStrictEquals(a1[2], 0xFFFF_FFFF_FFFF_FFFFn);
});

Deno.test("Buffers.ArrayBuffer.fromBigUint64AsyncIterable(AsyncGenerator<any>)", async () => {
  const g1 = (async function* () {
    yield 0n;
    yield 1n;
    yield "a";
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(
        g1 as unknown as AsyncGenerator<biguint64>,
      );
    },
    TypeError,
    "`value[2]` must be a 64-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0n;
    yield 1n;
    yield 0x1_0000_0000_0000_0000n;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(g2);
    },
    TypeError,
    "`value[2]` must be a 64-bit unsigned integer.",
  );

  const g3 = (async function* () {
    yield 0n;
    yield 1n;
    yield -1n;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromBigUint64AsyncIterable(g3);
    },
    TypeError,
    "`value[2]` must be a 64-bit unsigned integer.",
  );
});

Deno.test("Buffers.ArrayBuffer.toBigUint64Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(Uint8Array.of(1, 2).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(Uint8Array.of(1, 2, 3, 4).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(Uint8Array.of(1, 2, 3, 4, 5).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of(1, 2, 3, 4, 5, 6).buffer,
      );
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of(1, 2, 3, 4, 5, 6, 7).buffer,
      );
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );

  assertStrictEquals(
    [
      ...ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "big-endian" },
      ),
    ].join(","),
    "",
  );
  assertStrictEquals(
    [
      ...ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "big-endian" },
      ),
    ].join(","),
    "72060901162745856",
  );
  assertStrictEquals(
    [
      ...ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "big-endian" },
      ),
    ].join(","),
    "72060901246895878,72060901162745856",
  );

  assertStrictEquals(
    [
      ...ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "little-endian" },
      ),
    ].join(","),
    "",
  );
  assertStrictEquals(
    [
      ...ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "little-endian" },
      ),
    ].join(","),
    "33751041",
  );
  assertStrictEquals(
    [
      ...ExArrayBuffer.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "little-endian" },
      ),
    ].join(","),
    "434320308619640833,33751041",
  );

  assertStrictEquals(
    [
      ...ExArrayBuffer.toBigUint64Iterable(Uint8Array.of().buffer),
    ].join(","),
    "",
  );
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(
      [
        ...ExArrayBuffer.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "72060901162745856",
    );
    assertStrictEquals(
      [
        ...ExArrayBuffer.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "72060901246895878,72060901162745856",
    );
  } else {
    assertStrictEquals(
      [
        ...ExArrayBuffer.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "33751041",
    );
    assertStrictEquals(
      [
        ...ExArrayBuffer.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "434320308619640833,33751041",
    );
  }
});
