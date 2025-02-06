import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { ExArrayBuffer, type uint32 } from "../../mod.ts";
import { BYTE_ORDER } from "../../src/env.ts";

Deno.test("ExArrayBuffer.fromUint32Iterable(Array<uint32>)", () => {
  assertThrows(
    () => {
      ExArrayBuffer.fromUint32Iterable(0 as unknown as Array<uint32>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromUint32Iterable(1 as unknown as Array<uint32>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ExArrayBuffer.fromUint32Iterable([-1] as unknown as Array<uint32>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint32`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint32Iterable(["0"] as unknown as Array<uint32>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint32`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint32Iterable(
        [0x100000000] as unknown as Array<uint32>,
      );
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint32`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint32Iterable(
        [0, 0x100000000] as unknown as Array<uint32>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint32`.",
  );
  assertThrows(
    () => {
      ExArrayBuffer.fromUint32Iterable(
        [0, -1] as unknown as Array<uint32>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint32`.",
  );

  assertStrictEquals(ExArrayBuffer.fromUint32Iterable([]).byteLength, 0);

  const a1be = new Uint8Array(ExArrayBuffer.fromUint32Iterable(
    [0, 1, 0xFFFFFFFF],
    { byteOrder: "big-endian" },
  ));
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

  const a1le = new Uint8Array(ExArrayBuffer.fromUint32Iterable(
    [0, 1, 0xFFFFFFFF],
    { byteOrder: "little-endian" },
  ));
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

  const a1x = new Uint8Array(
    ExArrayBuffer.fromUint32Iterable([0, 1, 0xFFFFFFFF]),
  );
  assertStrictEquals(a1x.length, 12);
  if (BYTE_ORDER === "big-endian") {
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

Deno.test("ExArrayBuffer.fromUint32Iterable(Uint32Array)", () => {
  assertStrictEquals(
    ExArrayBuffer.fromUint32Iterable(Uint32Array.of()).byteLength,
    0,
  );

  const a1be = new Uint8Array(ExArrayBuffer.fromUint32Iterable(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
    { byteOrder: "big-endian" },
  ));
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

  const a1le = new Uint8Array(ExArrayBuffer.fromUint32Iterable(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
    { byteOrder: "little-endian" },
  ));
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

  const a1x = new Uint8Array(ExArrayBuffer.fromUint32Iterable(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
  ));
  assertStrictEquals(a1x.length, 12);
  if (BYTE_ORDER === "big-endian") {
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

Deno.test("ExArrayBuffer.fromUint32Iterable(Generator<uint32>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(ExArrayBuffer.fromUint32Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1be = new Uint8Array(
    ExArrayBuffer.fromUint32Iterable(g1, { byteOrder: "big-endian" }),
  );
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

  const g2 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1le = new Uint8Array(
    ExArrayBuffer.fromUint32Iterable(g2, { byteOrder: "little-endian" }),
  );
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

  const g3 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1x = new Uint8Array(ExArrayBuffer.fromUint32Iterable(g3));
  assertStrictEquals(a1x.length, 12);
  if (BYTE_ORDER === "big-endian") {
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

Deno.test("ExArrayBuffer.fromUint32AsyncIterable(Array<uint32>)", () => {
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        0 as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        1 as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        [-1] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        ["0"] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        [256] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        [0, 256] as unknown as AsyncIterable<uint32>,
      );
    },
    TypeError,
    "`value` must implement `Symbol.asyncIterator`.",
  );
});

Deno.test("ExArrayBuffer.fromUint32AsyncIterable(AsyncGenerator<uint32>)", async () => {
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

Deno.test("ExArrayBuffer.fromUint32AsyncIterable(AsyncGenerator<any>)", () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(
        g1 as unknown as AsyncGenerator<uint32>,
      );
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint32`.",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x100000000;
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(g2);
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint32`.",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  assertRejects(
    async () => {
      await ExArrayBuffer.fromUint32AsyncIterable(g3);
    },
    TypeError,
    "The type of `value[2]` does not match the type of `uint32`.",
  );
});

Deno.test("ExArrayBuffer.toUint32Iterable(Uint8Array)", () => {
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
  if (BYTE_ORDER === "big-endian") {
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
