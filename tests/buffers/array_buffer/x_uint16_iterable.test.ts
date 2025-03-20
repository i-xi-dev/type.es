import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers, ByteOrder, type uint16 } from "../../../mod.ts";

const { ArrayBuffer: ExArrayBuffer } = Buffers;

Deno.test("Buffers.ArrayBuffer.fromUint16AsyncIterable(Array<uint16>)", async () => {
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        0 as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        1 as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        [-1] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        ["0"] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        [256] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        [0, 256] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Buffers.ArrayBuffer.fromUint16AsyncIterable(AsyncGenerator<Uint16>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await ExArrayBuffer.fromUint16AsyncIterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 0xFFFF;
  })();

  const a1 = new Uint16Array(await ExArrayBuffer.fromUint16AsyncIterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 0xFFFF);
});

Deno.test("Buffers.ArrayBuffer.fromUint16AsyncIterable(AsyncGenerator<any>)", async () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        g1 as unknown as AsyncGenerator<uint16>,
      );
    },
    TypeError,
    "`value[2]` must be a 16-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x10000;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(g2);
    },
    TypeError,
    "`value[2]` must be a 16-bit unsigned integer.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(g3);
    },
    TypeError,
    "`value[2]` must be a 16-bit unsigned integer.",
  );
});

Deno.test("Buffers.ArrayBuffer.toUint16Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.toUint16Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toUint16Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toUint16Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 2.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.toUint16Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 2.",
  );

  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[256,770]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[256,770,1284,1798]",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 5, 4, 7, 6, 1, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 8);
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(b2b.buffer, {
        byteOrder: "big-endian",
      }),
    ]),
    "[0,0,256,770,1284,1798,257,257]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[1,515]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[1,515,1029,1543]",
  );
  const b3 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 5, 4, 7, 6, 1, 1, 1, 1);
  const b3b = new Uint8Array(b3.buffer, 4, 8);
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(b3b.buffer, {
        byteOrder: "little-endian",
      }),
    ]),
    "[0,0,1,515,1029,1543,257,257]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint16Iterable(Uint8Array.of().buffer),
    ]),
    "[]",
  );
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[256,770]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[256,770,1284,1798]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint16Iterable(b2b.buffer),
      ]),
      "[0,0,256,770,1284,1798,257,257]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[1,515]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[1,515,1029,1543]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...ExArrayBuffer.toUint16Iterable(b3b.buffer),
      ]),
      "[0,0,1,515,1029,1543,257,257]",
    );
  }
});
