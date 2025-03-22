import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { ByteOrder, Bytes } from "../../../mod.ts";

const { Builder } = Bytes;

Deno.test("Bytes.Builder.prototype.loadFromBigUint64Iterable() - Array", () => {
  const b1 = Builder.create();
  assertThrows(
    () => {
      b1.loadFromBigUint64Iterable(0 as unknown as Array<bigint>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      b1.loadFromBigUint64Iterable(1 as unknown as Array<bigint>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      b1.loadFromBigUint64Iterable(
        [-1] as unknown as Array<bigint>,
      );
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromBigUint64Iterable(
        ["0"] as unknown as Array<bigint>,
      );
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromBigUint64Iterable(
        [0x1_0000_0000_0000_0000n] as unknown as Array<bigint>,
      );
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromBigUint64Iterable(
        [0n, 0x1_0000_0000_0000_0000n] as unknown as Array<bigint>,
      );
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );
  assertThrows(
    () => {
      b1.loadFromBigUint64Iterable(
        [0n, -1n] as unknown as Array<bigint>,
      );
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );

  b1.loadFromBigUint64Iterable([]);
  assertStrictEquals(b1.duplicateAsArrayBuffer().byteLength, 0);

  b1.loadFromBigUint64Iterable([0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn], {
    byteOrder: "big-endian",
  });
  const a1be = b1.duplicateAsUint8Array();
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

  const b2 = Builder.create();
  b2.loadFromBigUint64Iterable([0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn], {
    byteOrder: "little-endian",
  });
  const a1le = b2.duplicateAsUint8Array();
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

  const b3 = Builder.create();
  b3.loadFromBigUint64Iterable([0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn]);
  const a1x = b3.duplicateAsUint8Array();
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

Deno.test("Bytes.Builder.prototype.loadFromBigUint64Iterable() - BigUint64Array", () => {
  const b1 = Builder.create();
  b1.loadFromBigUint64Iterable(BigUint64Array.of());
  assertStrictEquals(b1.duplicateAsUint8Array().byteLength, 0);

  b1.loadFromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
    { byteOrder: "big-endian" },
  );
  const a1be = b1.duplicateAsUint8Array();
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

  const b2 = Builder.create();
  b2.loadFromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
    { byteOrder: "little-endian" },
  );
  const a1le = b2.duplicateAsUint8Array();
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

  const b3 = Builder.create();
  b3.loadFromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
  );
  const a1x = b3.duplicateAsUint8Array();
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

Deno.test("Bytes.Builder.prototype.loadFromBigUint64Iterable() - Generator", () => {
  const b1 = Builder.create();
  const g0 = (function* () {
  })();
  b1.loadFromBigUint64Iterable(g0);
  assertStrictEquals(b1.duplicateAsArrayBuffer().byteLength, 0);

  const g1 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();
  b1.loadFromBigUint64Iterable(g1, { byteOrder: "big-endian" });

  const a1be = b1.duplicateAsUint8Array();
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

  const b2 = Builder.create();
  const g2 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();
  b2.loadFromBigUint64Iterable(g2, { byteOrder: "little-endian" });

  const a1le = b2.duplicateAsUint8Array();
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

  const b3 = Builder.create();
  const g3 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();
  b3.loadFromBigUint64Iterable(g3);

  const a1x = b3.duplicateAsUint8Array();
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

Deno.test("Bytes.Builder.prototype.loadFromBigUint64AsyncIterable() - Array", async () => {
  const b1 = Builder.create();
  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(
        0 as unknown as AsyncIterable<bigint>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(
        1 as unknown as AsyncIterable<bigint>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(
        [-1] as unknown as AsyncIterable<bigint>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(
        ["0"] as unknown as AsyncIterable<bigint>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(
        [256] as unknown as AsyncIterable<bigint>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(
        [0, 256] as unknown as AsyncIterable<bigint>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("Bytes.Builder.prototype.loadFromBigUint64AsyncIterable() - AsyncGenerator", async () => {
  const b1 = Builder.create();
  const g0 = (async function* () {
  })();
  await b1.loadFromBigUint64AsyncIterable(g0);
  assertStrictEquals(b1.duplicateAsArrayBuffer().byteLength, 0);

  const g1 = (async function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();
  await b1.loadFromBigUint64AsyncIterable(g1);

  const a1 = new BigUint64Array(b1.duplicateAsArrayBuffer());
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0n);
  assertStrictEquals(a1[1], 1n);
  assertStrictEquals(a1[2], 0xFFFF_FFFF_FFFF_FFFFn);
});

Deno.test("Bytes.Builder.prototype.loadFromBigUint64AsyncIterable() - AsyncGenerator", async () => {
  const b1 = Builder.create();
  const g1 = (async function* () {
    yield 0n;
    yield 1n;
    yield "a";
  })();

  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(g1 as AsyncIterable<bigint>);
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );

  const g2 = (async function* () {
    yield 0n;
    yield 1n;
    yield 0x1_0000_0000_0000_0000n;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(g2);
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );

  const g3 = (async function* () {
    yield 0n;
    yield 1n;
    yield -1n;
  })();

  await assertRejects(
    async () => {
      await b1.loadFromBigUint64AsyncIterable(g3);
    },
    TypeError,
    "`value[*]` must be a 64-bit unsigned integer.",
  );
});
