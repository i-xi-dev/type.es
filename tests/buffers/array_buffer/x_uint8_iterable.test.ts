import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers, type uint8 } from "../../../mod.ts";

const { ArrayBuffer: ExArrayBuffer } = Buffers;

Deno.test("Buffers.ArrayBuffer.fromUint8AsyncIterable(Array<uint8>)", async () => {
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        0 as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        1 as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        [-1] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        ["0"] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        [256] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        [0, 256] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Buffers.ArrayBuffer.fromUint8AsyncIterable(AsyncGenerator<uint8>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await ExArrayBuffer.fromUint8AsyncIterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 255;
  })();

  const a1 = new Uint8Array(await ExArrayBuffer.fromUint8AsyncIterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("Buffers.ArrayBuffer.fromUint8AsyncIterable(AsyncGenerator<any>)", async () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        g1 as unknown as AsyncGenerator<uint8>,
      );
    },
    TypeError,
    "`value[2]` must be an 8-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 256;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(g2);
    },
    TypeError,
    "`value[2]` must be an 8-bit unsigned integer.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  await assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(g3);
    },
    TypeError,
    "`value[2]` must be an 8-bit unsigned integer.",
  );
});

Deno.test("Buffers.ArrayBuffer.toUint8Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.toUint8Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.toUint8Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint8Iterable(Uint8Array.of().buffer),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint8Iterable(Uint8Array.of(1, 0, 3, 2).buffer),
    ]),
    "[1,0,3,2]",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 1, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    JSON.stringify([
      ...ExArrayBuffer.toUint8Iterable(b2b.buffer),
    ]),
    "[0,0,0,0,1,0,3,2,1,1,1,1]",
  );
});
