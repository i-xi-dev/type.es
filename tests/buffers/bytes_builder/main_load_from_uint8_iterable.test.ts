import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers } from "../../../mod.ts";

const { BytesBuilder } = Buffers;

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint8Iterable() - Array<uint8>", () => {
  const b1 = new BytesBuilder();
  assertThrows(
    () => {
      b1.loadFromUint8Iterable(0 as unknown as Array<number>);
    },
    TypeError,
    "`value` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      b1.loadFromUint8Iterable(1 as unknown as Array<number>);
    },
    TypeError,
    "`value` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      b1.loadFromUint8Iterable([-1] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint8Iterable(["0"] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint8Iterable([256] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint8Iterable([0, 256] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint8Iterable([0, -1] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );

  b1.loadFromUint8Iterable([]);
  assertStrictEquals(b1.copyToArrayBuffer().byteLength, 0);

  b1.loadFromUint8Iterable([0, 1, 255]);
  const b1c1 = b1.copyToUint8Array();
  assertStrictEquals(b1c1.length, 3);
  assertStrictEquals(b1c1[0], 0);
  assertStrictEquals(b1c1[1], 1);
  assertStrictEquals(b1c1[2], 255);
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint8Iterable() - Uint8Array", () => {
  const b1 = new BytesBuilder();
  b1.loadFromUint8Iterable(new Uint8Array(0));
  assertStrictEquals(b1.copyToArrayBuffer().byteLength, 0);

  b1.loadFromUint8Iterable(Uint8Array.of(0, 1, 255));
  const b1c1 = b1.copyToUint8Array();
  assertStrictEquals(b1c1.length, 3);
  assertStrictEquals(b1c1[0], 0);
  assertStrictEquals(b1c1[1], 1);
  assertStrictEquals(b1c1[2], 255);
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint8Iterable() - Generator<uint8>", () => {
  const g0 = (function* () {
  })();
  const b1 = new BytesBuilder();
  b1.loadFromUint8Iterable(g0);
  assertStrictEquals(b1.copyToArrayBuffer().byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 255;
  })();
  b1.loadFromUint8Iterable(g1);
  const b1c1 = b1.copyToUint8Array();
  assertStrictEquals(b1c1.length, 3);
  assertStrictEquals(b1c1[0], 0);
  assertStrictEquals(b1c1[1], 1);
  assertStrictEquals(b1c1[2], 255);
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint8AsyncIterable()", async () => {
  const b1 = new BytesBuilder();

  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(
        0 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(
        1 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(
        [-1] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(
        ["0"] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(
        [256] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(
        [0, 256] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint8AsyncIterable() - AsyncGenerator", async () => {
  const g0 = (async function* () {
  })();
  const b1 = new BytesBuilder();

  await b1.loadFromUint8AsyncIterable(g0);
  assertStrictEquals(
    b1.copyToArrayBuffer().byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 255;
  })();

  await b1.loadFromUint8AsyncIterable(g1);
  const b1c1 = b1.copyToUint8Array();
  assertStrictEquals(b1c1.length, 3);
  assertStrictEquals(b1c1[0], 0);
  assertStrictEquals(b1c1[1], 1);
  assertStrictEquals(b1c1[2], 255);
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint8AsyncIterable() - AsyncGenerator", async () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();
  const b1 = new BytesBuilder();

  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(
        g1 as unknown as AsyncGenerator<number>,
      );
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 256;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(g2);
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );
  assertStrictEquals(b1.copyToUint8Array().length, 0);

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint8AsyncIterable(g3);
    },
    TypeError,
    "`value[*]` must be an 8-bit unsigned integer.",
  );
  assertStrictEquals(b1.copyToUint8Array().length, 0);
});
