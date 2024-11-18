import { assertRejects, assertStrictEquals, assertThrows } from "../../deps.ts";
import { ArrayBufferType } from "../../../mod.ts";
import { biguint64 } from "../../../src/_.ts";
import { BYTE_ORDER } from "../../../src/env.ts";

Deno.test("ArrayBufferType.fromBigUint64Iterable(Array<biguint64>)", () => {
  assertThrows(
    () => {
      ArrayBufferType.fromBigUint64Iterable(0 as unknown as Array<biguint64>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ArrayBufferType.fromBigUint64Iterable(1 as unknown as Array<biguint64>);
    },
    TypeError,
    "`value` must implement \`Symbol.iterator\`.",
  );

  assertThrows(
    () => {
      ArrayBufferType.fromBigUint64Iterable(
        [-1] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint64`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromBigUint64Iterable(
        ["0"] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint64`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromBigUint64Iterable(
        [0x1_0000_0000_0000_0000n] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint64`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromBigUint64Iterable(
        [0n, 0x1_0000_0000_0000_0000n] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint64`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromBigUint64Iterable(
        [0n, -1n] as unknown as Array<biguint64>,
      );
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint64`.",
  );

  assertStrictEquals(ArrayBufferType.fromBigUint64Iterable([]).byteLength, 0);

  const a1be = new Uint8Array(ArrayBufferType.fromBigUint64Iterable(
    [0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn],
    { byteOrder: "big-endian" },
  ));
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

  const a1le = new Uint8Array(ArrayBufferType.fromBigUint64Iterable(
    [0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn],
    { byteOrder: "little-endian" },
  ));
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

  const a1x = new Uint8Array(
    ArrayBufferType.fromBigUint64Iterable([0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn]),
  );
  assertStrictEquals(a1x.length, 24);
  if (BYTE_ORDER === "big-endian") {
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

Deno.test("ArrayBufferType.fromBigUint64Iterable(BigUint64Array)", () => {
  assertStrictEquals(
    ArrayBufferType.fromBigUint64Iterable(BigUint64Array.of()).byteLength,
    0,
  );

  const a1be = new Uint8Array(ArrayBufferType.fromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
    { byteOrder: "big-endian" },
  ));
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

  const a1le = new Uint8Array(ArrayBufferType.fromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
    { byteOrder: "little-endian" },
  ));
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

  const a1x = new Uint8Array(ArrayBufferType.fromBigUint64Iterable(
    BigUint64Array.of(0n, 1n, 0xFFFF_FFFF_FFFF_FFFFn),
  ));
  assertStrictEquals(a1x.length, 24);
  if (BYTE_ORDER === "big-endian") {
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

Deno.test("ArrayBufferType.fromBigUint64Iterable(Generator<BigUint64>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(ArrayBufferType.fromBigUint64Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1be = new Uint8Array(
    ArrayBufferType.fromBigUint64Iterable(g1, { byteOrder: "big-endian" }),
  );
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

  const g2 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1le = new Uint8Array(
    ArrayBufferType.fromBigUint64Iterable(g2, { byteOrder: "little-endian" }),
  );
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

  const g3 = (function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1x = new Uint8Array(ArrayBufferType.fromBigUint64Iterable(g3));
  assertStrictEquals(a1x.length, 24);
  if (BYTE_ORDER === "big-endian") {
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
