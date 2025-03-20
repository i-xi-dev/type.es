import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers, ByteOrder, type uint32 } from "../../../mod.ts";

const { ArrayBuffer: ExArrayBuffer } = Buffers;

Deno.test("Buffers.ArrayBuffer.fromUint32AsyncIterable(Array<uint32>)", async () => {
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        0 as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        1 as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        [-1] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        ["0"] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        [256] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        [0, 256] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Buffers.ArrayBuffer.fromUint32AsyncIterable(AsyncGenerator<uint32>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await ExArrayBuffer.fromUint32AsyncIterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1 = new Uint32Array(await ExArrayBuffer.fromUint32AsyncIterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 0xFFFFFFFF);
});

Deno.test("Buffers.ArrayBuffer.fromUint32AsyncIterable(AsyncGenerator<any>)", async () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        g1 as unknown as AsyncGenerator<uint32>,
      );
    },
    TypeError,
    "`value[2]` must be a 32-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x100000000;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(g2);
    },
    TypeError,
    "`value[2]` must be a 32-bit unsigned integer.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(g3);
    },
    TypeError,
    "`value[2]` must be a 32-bit unsigned integer.",
  );
});

Deno.test("Buffers.ArrayBuffer.toUint32Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.toUint32Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toUint32Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toUint32Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 4.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toUint32Iterable(Uint8Array.of(1, 2).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 4.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toUint32Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 4.",
  );

  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint32Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[16777986]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[16777986,84150022]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint32Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[33751041]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[33751041,101123077]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint32Iterable(Uint8Array.of().buffer),
    ]),
    "[]",
  );
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[16777986]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[16777986,84150022]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[33751041]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[33751041,101123077]",
    );
  }
});
