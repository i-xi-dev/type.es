import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers, ByteOrder } from "../../../mod.ts";

const { BytesBuilder } = Buffers;

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint32Iterable() - Array<uint32>", () => {
  const b1 = new BytesBuilder();
  assertThrows(
    () => {
      b1.loadFromUint32Iterable(0 as unknown as Array<number>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      b1.loadFromUint32Iterable(1 as unknown as Array<number>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      b1.loadFromUint32Iterable([-1] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint32Iterable(["0"] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint32Iterable(
        [0x100000000] as unknown as Array<number>,
      );
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint32Iterable(
        [0, 0x100000000] as unknown as Array<number>,
      );
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint32Iterable(
        [0, -1] as unknown as Array<number>,
      );
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );

  assertStrictEquals(b1.copyToArrayBuffer().byteLength, 0);

  b1.loadFromUint32Iterable([0, 1, 0xFFFFFFFF], { byteOrder: "big-endian" });
  const a1be = b1.copyToUint8Array();
  assertStrictEquals(a1be.length, 12);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 1);
  assertStrictEquals(a1be[8], 255);
  assertStrictEquals(a1be[9], 255);
  assertStrictEquals(a1be[10], 255);
  assertStrictEquals(a1be[11], 255);

  const b2 = new BytesBuilder();
  b2.loadFromUint32Iterable(
    [0, 1, 0xFFFFFFFF],
    { byteOrder: "little-endian" },
  );
  const a1le = b2.copyToUint8Array();
  assertStrictEquals(a1le.length, 12);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 1);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 255);
  assertStrictEquals(a1le[9], 255);
  assertStrictEquals(a1le[10], 255);
  assertStrictEquals(a1le[11], 255);

  const b3 = new BytesBuilder();
  b3.loadFromUint32Iterable([0, 1, 0xFFFFFFFF]);
  const a1x = b3.copyToUint8Array();
  assertStrictEquals(a1x.length, 12);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 1);
    assertStrictEquals(a1x[8], 255);
    assertStrictEquals(a1x[9], 255);
    assertStrictEquals(a1x[10], 255);
    assertStrictEquals(a1x[11], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 1);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 255);
    assertStrictEquals(a1x[9], 255);
    assertStrictEquals(a1x[10], 255);
    assertStrictEquals(a1x[11], 255);
  }
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint32Iterable() - Uint32Array", () => {
  const b1 = new BytesBuilder();
  b1.loadFromUint32Iterable(Uint32Array.of());
  assertStrictEquals(b1.copyToUint8Array().byteLength, 0);

  b1.loadFromUint32Iterable(Uint32Array.of(0, 1, 0xFFFFFFFF), {
    byteOrder: "big-endian",
  });
  const a1be = b1.copyToUint8Array();
  assertStrictEquals(a1be.length, 12);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 1);
  assertStrictEquals(a1be[8], 255);
  assertStrictEquals(a1be[9], 255);
  assertStrictEquals(a1be[10], 255);
  assertStrictEquals(a1be[11], 255);

  const b2 = new BytesBuilder();
  b2.loadFromUint32Iterable(Uint32Array.of(0, 1, 0xFFFFFFFF), {
    byteOrder: "little-endian",
  });
  const a1le = b2.copyToUint8Array();
  assertStrictEquals(a1le.length, 12);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 1);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 255);
  assertStrictEquals(a1le[9], 255);
  assertStrictEquals(a1le[10], 255);
  assertStrictEquals(a1le[11], 255);

  const b3 = new BytesBuilder();
  b3.loadFromUint32Iterable(Uint32Array.of(0, 1, 0xFFFFFFFF));
  const a1x = b3.copyToUint8Array();
  assertStrictEquals(a1x.length, 12);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 1);
    assertStrictEquals(a1x[8], 255);
    assertStrictEquals(a1x[9], 255);
    assertStrictEquals(a1x[10], 255);
    assertStrictEquals(a1x[11], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 1);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 255);
    assertStrictEquals(a1x[9], 255);
    assertStrictEquals(a1x[10], 255);
    assertStrictEquals(a1x[11], 255);
  }
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint32Iterable() - Generator<uint32>", () => {
  const b1 = new BytesBuilder();
  const g0 = (function* () {
  })();
  b1.loadFromUint32Iterable(g0);
  assertStrictEquals(b1.copyToUint8Array().byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();
  b1.loadFromUint32Iterable(g1, { byteOrder: "big-endian" });

  const a1be = b1.copyToUint8Array();
  assertStrictEquals(a1be.length, 12);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 1);
  assertStrictEquals(a1be[8], 255);
  assertStrictEquals(a1be[9], 255);
  assertStrictEquals(a1be[10], 255);
  assertStrictEquals(a1be[11], 255);

  const b2 = new BytesBuilder();
  const g2 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();
  b2.loadFromUint32Iterable(g2, { byteOrder: "little-endian" });

  const a1le = b2.copyToUint8Array();
  assertStrictEquals(a1le.length, 12);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 1);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 255);
  assertStrictEquals(a1le[9], 255);
  assertStrictEquals(a1le[10], 255);
  assertStrictEquals(a1le[11], 255);

  const b3 = new BytesBuilder();
  const g3 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();
  b3.loadFromUint32Iterable(g3);

  const a1x = b3.copyToUint8Array();
  assertStrictEquals(a1x.length, 12);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 0);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 1);
    assertStrictEquals(a1x[8], 255);
    assertStrictEquals(a1x[9], 255);
    assertStrictEquals(a1x[10], 255);
    assertStrictEquals(a1x[11], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 1);
    assertStrictEquals(a1x[5], 0);
    assertStrictEquals(a1x[6], 0);
    assertStrictEquals(a1x[7], 0);
    assertStrictEquals(a1x[8], 255);
    assertStrictEquals(a1x[9], 255);
    assertStrictEquals(a1x[10], 255);
    assertStrictEquals(a1x[11], 255);
  }
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint32AsyncIterable() - Array<uint32>", async () => {
  const b1 = new BytesBuilder();
  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(
        0 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(
        1 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(
        [-1] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(
        ["0"] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(
        [256] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(
        [0, 256] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint32AsyncIterable() - AsyncGenerator<uint32>", async () => {
  const b1 = new BytesBuilder();
  const g0 = (async function* () {
  })();
  await b1.loadFromUint32AsyncIterable(g0);
  assertStrictEquals(b1.copyToUint8Array().byteLength, 0);

  const b2 = new BytesBuilder();
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();
  await b2.loadFromUint32AsyncIterable(g1);

  const a1 = new Uint32Array(b2.copyToArrayBuffer());
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 0xFFFFFFFF);
});

Deno.test("Buffers.BytesBuilder.prototype.loadFromUint32AsyncIterable() - AsyncGenerator", async () => {
  const b1 = new BytesBuilder();
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(
        g1 as unknown as AsyncGenerator<number>,
      );
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x100000000;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(g2);
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint32AsyncIterable(g3);
    },
    TypeError,
    "`value[*]` must be a 32-bit unsigned integer.",
  );
});
