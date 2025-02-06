import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { ExArrayBuffer, type uint8 } from "../../mod.ts";

Deno.test("ExArrayBuffer.fromUint8Iterable(Array<uint8>)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.fromUint8Iterable(0 as unknown as Array<uint8>);
    },
    TypeError,
    "`value` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromUint8Iterable(1 as unknown as Array<uint8>);
    },
    TypeError,
    "`value` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromUint8Iterable([-1] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint8Iterable(["0"] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint8Iterable([256] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint8Iterable([0, 256] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint8Iterable([0, -1] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint8`.",
  );

  assertStrictEquals(ExArrayBuffer.fromUint8Iterable([]).byteLength, 0);

  const a1 = new Uint8Array(ExArrayBuffer.fromUint8Iterable([0, 1, 255]));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("ExArrayBuffer.fromUint8Iterable(Uint8Array)", () => {
  assertStrictEquals(
    ExArrayBuffer.fromUint8Iterable(new Uint8Array(0)).byteLength,
    0,
  );

  const a1 = new Uint8Array(
    ExArrayBuffer.fromUint8Iterable(Uint8Array.from([0, 1, 255])),
  );
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("ExArrayBuffer.fromUint8Iterable(Generator<uint8>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(ExArrayBuffer.fromUint8Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 255;
  })();

  const a1 = new Uint8Array(ExArrayBuffer.fromUint8Iterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("ExArrayBuffer.fromUint8AsyncIterable(Array<uint8>)", () => {
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        0 as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        1 as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        [-1] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        ["0"] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        [256] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        [0, 256] as unknown as AsyncIterable<uint8>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("ExArrayBuffer.fromUint8AsyncIterable(AsyncGenerator<uint8>)", async () => {
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

Deno.test("ExArrayBuffer.fromUint8AsyncIterable(AsyncGenerator<any>)", () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(
        g1 as unknown as AsyncGenerator<uint8>,
      );
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint8`.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 256;
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(g2);
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint8`.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint8AsyncIterable(g3);
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint8`.",
  );
});

Deno.test("ExArrayBuffer.toUint8Iterable(Uint8Array)", () => {
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
