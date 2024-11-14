import { assertRejects, assertStrictEquals, assertThrows } from "../../deps.ts";
import { ArrayBufferType } from "../../../mod.ts";
import { uint16 } from "../../../src/_.ts";
import { BYTE_ORDER } from "../../../src/env.ts";

Deno.test("ArrayBufferType.fromUint16Iterable(Array<uint16>)", () => {
  assertThrows(
    () => {
      ArrayBufferType.fromUint16Iterable(0 as unknown as Array<uint16>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ArrayBufferType.fromUint16Iterable(1 as unknown as Array<uint16>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ArrayBufferType.fromUint16Iterable([-1] as unknown as Array<uint16>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint16Iterable(["0"] as unknown as Array<uint16>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint16Iterable([65536] as unknown as Array<uint16>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint16Iterable(
        [0, 65536] as unknown as Array<uint16>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint16`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint16Iterable(
        [0, -1] as unknown as Array<uint16>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint16`.",
  );

  assertStrictEquals(ArrayBufferType.fromUint16Iterable([]).byteLength, 0);

  const a1be = new Uint8Array(ArrayBufferType.fromUint16Iterable(
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

  const a1le = new Uint8Array(ArrayBufferType.fromUint16Iterable(
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

  const a1x = new Uint8Array(ArrayBufferType.fromUint16Iterable([0, 1, 65535]));
  assertStrictEquals(a1x.length, 6);
  if (BYTE_ORDER === "big-endian") {
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

Deno.test("ArrayBufferType.fromUint16Iterable(Uint16Array)", () => {
  assertStrictEquals(
    ArrayBufferType.fromUint16Iterable(Uint16Array.of()).byteLength,
    0,
  );

  const a1be = new Uint8Array(ArrayBufferType.fromUint16Iterable(
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

  const a1le = new Uint8Array(ArrayBufferType.fromUint16Iterable(
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
    ArrayBufferType.fromUint16Iterable(Uint16Array.of(0, 1, 65535)),
  );
  assertStrictEquals(a1x.length, 6);
  if (BYTE_ORDER === "big-endian") {
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

Deno.test("ArrayBufferType.fromUint16Iterable(Generator<uint16>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(ArrayBufferType.fromUint16Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1be = new Uint8Array(
    ArrayBufferType.fromUint16Iterable(g1, { byteOrder: "big-endian" }),
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
    ArrayBufferType.fromUint16Iterable(g2, { byteOrder: "little-endian" }),
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

  const a1x = new Uint8Array(ArrayBufferType.fromUint16Iterable(g3));
  assertStrictEquals(a1x.length, 6);
  if (BYTE_ORDER === "big-endian") {
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
