import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { ByteOrder, Bytes } from "../../../mod.ts";

const { Builder } = Bytes;

// Deno.test(" - 1", () => {
//   const s1 = performance.now();
//   const b1 = new Builder();
//   const src = new Uint16Array(65535).fill(0x1234, 0, 65535);
//   b1.loadFromUint16Iterable(src, { byteOrder: "little-endian" });
//   console.log(performance.now() - s1);
// });

Deno.test("Bytes.Builder.prototype.loadFromUint16Iterable() - Array", () => {
  const b1 = new Builder();
  assertThrows(
    () => {
      b1.loadFromUint16Iterable(0 as unknown as Array<number>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      b1.loadFromUint16Iterable(1 as unknown as Array<number>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      b1.loadFromUint16Iterable([-1] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint16Iterable(["0"] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint16Iterable([65536] as unknown as Array<number>);
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint16Iterable(
        [0, 65536] as unknown as Array<number>,
      );
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromUint16Iterable(
        [0, -1] as unknown as Array<number>,
      );
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );

  b1.loadFromUint16Iterable([]);
  assertStrictEquals(b1.duplicateAsUint8Array().byteLength, 0);

  b1.loadFromUint16Iterable([0, 1, 65535], { byteOrder: "big-endian" });
  const a1be = b1.duplicateAsUint8Array();
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const b2 = new Builder();
  b2.loadFromUint16Iterable([0, 1, 65535], { byteOrder: "little-endian" });
  const a1le = b2.duplicateAsUint8Array();
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const b3 = new Builder();
  b3.loadFromUint16Iterable([0, 1, 65535]);
  const a1x = b3.duplicateAsUint8Array();
  assertStrictEquals(a1x.length, 6);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 1);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 1);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  }
});

Deno.test("Bytes.Builder.prototype.loadFromUint16Iterable() - Uint16Array", () => {
  const b1 = new Builder();
  b1.loadFromUint16Iterable(Uint16Array.of());
  assertStrictEquals(
    b1.duplicateAsUint8Array().byteLength,
    0,
  );

  const b2 = new Builder();
  b2.loadFromUint16Iterable(Uint16Array.of(0, 1, 65535), {
    byteOrder: "big-endian",
  });
  const a1be = b2.duplicateAsUint8Array();
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const b3 = new Builder();
  b3.loadFromUint16Iterable(Uint16Array.of(0, 1, 65535), {
    byteOrder: "little-endian",
  });
  const a1le = b3.duplicateAsUint8Array();
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const b4 = new Builder();
  b4.loadFromUint16Iterable(Uint16Array.of(0, 1, 65535));
  const a1x = b4.duplicateAsUint8Array();
  assertStrictEquals(a1x.length, 6);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 1);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 1);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  }
});

Deno.test("Bytes.Builder.prototype.loadFromUint16Iterable() - Generator", () => {
  const b1 = new Builder();
  const g0 = (function* () {
  })();
  b1.loadFromUint16Iterable(g0);
  assertStrictEquals(b1.duplicateAsUint8Array().byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();
  b1.loadFromUint16Iterable(g1, { byteOrder: "big-endian" });

  const a1be = b1.duplicateAsUint8Array();
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const b2 = new Builder();
  const g2 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();
  b2.loadFromUint16Iterable(g2, { byteOrder: "little-endian" });

  const a1le = b2.duplicateAsUint8Array();
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const b3 = new Builder();
  const g3 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();
  b3.loadFromUint16Iterable(g3);

  const a1x = b3.duplicateAsUint8Array();
  assertStrictEquals(a1x.length, 6);
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 1);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 1);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  }
});

Deno.test("Bytes.Builder.prototype.loadFromUint16AsyncIterable() - Array", async () => {
  const b1 = new Builder();
  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(
        0 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(
        1 as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(
        [-1] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(
        ["0"] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(
        [256] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(
        [0, 256] as unknown as AsyncIterable<number>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Bytes.Builder.prototype.loadFromUint16AsyncIterable() - AsyncGenerator", async () => {
  const b1 = new Builder();
  const g0 = (async function* () {
  })();
  await b1.loadFromUint16AsyncIterable(g0);
  assertStrictEquals(b1.duplicateAsUint8Array().byteLength, 0);

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 0xFFFF;
  })();
  await b1.loadFromUint16AsyncIterable(g1);

  const a1 = new Uint16Array(b1.duplicateAsArrayBuffer());
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 0xFFFF);
});

Deno.test("Bytes.Builder.prototype.loadFromUint16AsyncIterable() - AsyncGenerator", async () => {
  const b1 = new Builder();
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(
        g1 as unknown as AsyncGenerator<number>,
      );
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x10000;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(g2);
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromUint16AsyncIterable(g3);
    },
    TypeError,
    "`value[*]` must be a 16-bit unsigned integer.",
  );
});
