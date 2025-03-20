import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { type biguint64, Buffers, ByteOrder } from "../../../mod.ts";

const { ArrayBuffer: ExArrayBuffer } = Buffers;

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
