import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { Buffer, ByteOrder, type uint16 } from "../../../mod.ts";

const { ArrayBuffer: ExArrayBuffer } = Buffer;

Deno.test("ExArrayBuffer.fromUint16Iterable(Array<uint16>)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.fromUint16Iterable(0 as unknown as Array<uint16>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromUint16Iterable(1 as unknown as Array<uint16>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromUint16Iterable([-1] as unknown as Array<uint16>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint16Iterable(["0"] as unknown as Array<uint16>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint16Iterable([65536] as unknown as Array<uint16>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint16Iterable(
        [0, 65536] as unknown as Array<uint16>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint16Iterable(
        [0, -1] as unknown as Array<uint16>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint16`.",
  );

  assertStrictEquals(ExArrayBuffer.fromUint16Iterable([]).byteLength, 0);

  const a1be = new Uint8Array(ExArrayBuffer.fromUint16Iterable(
    [0, 1, 65535],
    { byteOrder: "big-endian" },
  ));
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const a1le = new Uint8Array(ExArrayBuffer.fromUint16Iterable(
    [0, 1, 65535],
    { byteOrder: "little-endian" },
  ));
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const a1x = new Uint8Array(ExArrayBuffer.fromUint16Iterable([0, 1, 65535]));
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

Deno.test("ExArrayBuffer.fromUint16Iterable(Uint16Array)", () => {
  assertStrictEquals(
    ExArrayBuffer.fromUint16Iterable(Uint16Array.of()).byteLength,
    0,
  );

  const a1be = new Uint8Array(ExArrayBuffer.fromUint16Iterable(
    Uint16Array.of(0, 1, 65535),
    { byteOrder: "big-endian" },
  ));
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const a1le = new Uint8Array(ExArrayBuffer.fromUint16Iterable(
    Uint16Array.of(0, 1, 65535),
    { byteOrder: "little-endian" },
  ));
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const a1x = new Uint8Array(
    ExArrayBuffer.fromUint16Iterable(Uint16Array.of(0, 1, 65535)),
  );
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

Deno.test("ExArrayBuffer.fromUint16Iterable(Generator<uint16>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(ExArrayBuffer.fromUint16Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1be = new Uint8Array(
    ExArrayBuffer.fromUint16Iterable(g1, { byteOrder: "big-endian" }),
  );
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const g2 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1le = new Uint8Array(
    ExArrayBuffer.fromUint16Iterable(g2, { byteOrder: "little-endian" }),
  );
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const g3 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1x = new Uint8Array(ExArrayBuffer.fromUint16Iterable(g3));
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

Deno.test("ExArrayBuffer.fromUint16AsyncIterable(Array<uint16>)", () => {
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        0 as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        1 as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        [-1] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        ["0"] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        [256] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        [0, 256] as unknown as AsyncIterable<uint16>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("ExArrayBuffer.fromUint16AsyncIterable(AsyncGenerator<Uint16>)", async () => {
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

Deno.test("ExArrayBuffer.fromUint16AsyncIterable(AsyncGenerator<any>)", () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(
        g1 as unknown as AsyncGenerator<uint16>,
      );
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint16`.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x10000;
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(g2);
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint16`.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint16AsyncIterable(g3);
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint16`.",
  );
});

Deno.test("ExArrayBuffer.toUint16Iterable(Uint8Array)", () => {
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
