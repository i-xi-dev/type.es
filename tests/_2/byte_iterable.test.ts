import { assertStrictEquals, assertThrows } from "../deps.ts";
import { ByteIterable } from "../../mod.ts";

Deno.test("ByteIterable.isArrayOfUint8(*)", () => {
  assertStrictEquals(ByteIterable.isArrayOfUint8([]), true);
  assertStrictEquals(ByteIterable.isArrayOfUint8([0]), true);
  assertStrictEquals(ByteIterable.isArrayOfUint8([255]), true);
  assertStrictEquals(ByteIterable.isArrayOfUint8([-0]), true);
  assertStrictEquals(ByteIterable.isArrayOfUint8([-1]), false);
  assertStrictEquals(ByteIterable.isArrayOfUint8([256]), false);
  assertStrictEquals(ByteIterable.isArrayOfUint8(0), false);
  assertStrictEquals(ByteIterable.isArrayOfUint8(256), false);
  assertStrictEquals(ByteIterable.isArrayOfUint8([0, 255]), true);
  assertStrictEquals(ByteIterable.isArrayOfUint8([0, 255, -1]), false);
  assertStrictEquals(ByteIterable.isArrayOfUint8(["0"]), false);
});

const a3 = [0, 1, 2];
const a2 = [0, 1];
const a1 = [0];
const a0 = [] as number[];

const b3 = Uint8Array.of(0, 1, 2);
const b2 = Uint8Array.of(0, 1);
const b1 = Uint8Array.of(0);
const b0 = Uint8Array.of();

function* g3() {
  yield 0;
  yield 1;
  yield 2;
}
function* g2() {
  yield 0;
  yield 1;
}
function* g1() {
  yield 0;
}
function* g0() {
}

Deno.test("ByteIterable.bytesStartsWith()", () => {
  assertStrictEquals(ByteIterable.bytesStartsWith(a3, a3), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a3, a2), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a3, a1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a3, a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(a3, b3), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a3, b2), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a3, b1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a3, b0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(g3(), b3), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(g3(), b2), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(g3(), b1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(g3(), b0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(a2, a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(a2, a2), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a2, a1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a2, a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(b2, a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(b2, a2), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(b2, a1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(b2, a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(g2(), a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(g2(), a2), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(g2(), a1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(g2(), a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(a1, a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(a1, a2), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(a1, a1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(a1, a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(b1, a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(b1, a2), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(b1, a1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(b1, a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(g1(), a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(g1(), a2), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(g1(), a1), true);
  assertStrictEquals(ByteIterable.bytesStartsWith(g1(), a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(a0, a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(a0, a2), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(a0, a1), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(a0, a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(b0, a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(b0, a2), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(b0, a1), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(b0, a0), true);

  assertStrictEquals(ByteIterable.bytesStartsWith(g0(), a3), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(g0(), a2), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(g0(), a1), false);
  assertStrictEquals(ByteIterable.bytesStartsWith(g0(), a0), true);

  const e1 = "`self` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      ByteIterable.bytesStartsWith(undefined as unknown as Uint8Array, []);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `self[0]` does not match the type of `uint8`.";
  assertThrows(
    () => {
      ByteIterable.bytesStartsWith([256], [0]);
    },
    TypeError,
    e2,
  );

  const e3 =
    "`other` must be (`Array<uint8> | Uint8Array | Uint8ClampedArray`).";
  assertThrows(
    () => {
      ByteIterable.bytesStartsWith([0], undefined as unknown as Uint8Array);
    },
    TypeError,
    e3,
  );
  assertThrows(
    () => {
      ByteIterable.bytesStartsWith([0], [256]);
    },
    TypeError,
    e3,
  );
});

Deno.test("ByteIterable.bytesEquals()", () => {
  assertStrictEquals(ByteIterable.bytesEquals(a3, a3), true);
  assertStrictEquals(ByteIterable.bytesEquals(a3, a2), false);
  assertStrictEquals(ByteIterable.bytesEquals(a3, a1), false);
  assertStrictEquals(ByteIterable.bytesEquals(a3, a0), false);

  assertStrictEquals(ByteIterable.bytesEquals(a3, b3), true);
  assertStrictEquals(ByteIterable.bytesEquals(a3, b2), false);
  assertStrictEquals(ByteIterable.bytesEquals(a3, b1), false);
  assertStrictEquals(ByteIterable.bytesEquals(a3, b0), false);

  assertStrictEquals(ByteIterable.bytesEquals(g3(), b3), true);
  assertStrictEquals(ByteIterable.bytesEquals(g3(), b2), false);
  assertStrictEquals(ByteIterable.bytesEquals(g3(), b1), false);
  assertStrictEquals(ByteIterable.bytesEquals(g3(), b0), false);

  assertStrictEquals(ByteIterable.bytesEquals(a2, a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(a2, a2), true);
  assertStrictEquals(ByteIterable.bytesEquals(a2, a1), false);
  assertStrictEquals(ByteIterable.bytesEquals(a2, a0), false);

  assertStrictEquals(ByteIterable.bytesEquals(b2, a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(b2, a2), true);
  assertStrictEquals(ByteIterable.bytesEquals(b2, a1), false);
  assertStrictEquals(ByteIterable.bytesEquals(b2, a0), false);

  assertStrictEquals(ByteIterable.bytesEquals(g2(), a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(g2(), a2), true);
  assertStrictEquals(ByteIterable.bytesEquals(g2(), a1), false);
  assertStrictEquals(ByteIterable.bytesEquals(g2(), a0), false);

  assertStrictEquals(ByteIterable.bytesEquals(a1, a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(a1, a2), false);
  assertStrictEquals(ByteIterable.bytesEquals(a1, a1), true);
  assertStrictEquals(ByteIterable.bytesEquals(a1, a0), false);

  assertStrictEquals(ByteIterable.bytesEquals(b1, a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(b1, a2), false);
  assertStrictEquals(ByteIterable.bytesEquals(b1, a1), true);
  assertStrictEquals(ByteIterable.bytesEquals(b1, a0), false);

  assertStrictEquals(ByteIterable.bytesEquals(g1(), a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(g1(), a2), false);
  assertStrictEquals(ByteIterable.bytesEquals(g1(), a1), true);
  assertStrictEquals(ByteIterable.bytesEquals(g1(), a0), false);

  assertStrictEquals(ByteIterable.bytesEquals(a0, a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(a0, a2), false);
  assertStrictEquals(ByteIterable.bytesEquals(a0, a1), false);
  assertStrictEquals(ByteIterable.bytesEquals(a0, a0), true);

  assertStrictEquals(ByteIterable.bytesEquals(b0, a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(b0, a2), false);
  assertStrictEquals(ByteIterable.bytesEquals(b0, a1), false);
  assertStrictEquals(ByteIterable.bytesEquals(b0, a0), true);

  assertStrictEquals(ByteIterable.bytesEquals(g0(), a3), false);
  assertStrictEquals(ByteIterable.bytesEquals(g0(), a2), false);
  assertStrictEquals(ByteIterable.bytesEquals(g0(), a1), false);
  assertStrictEquals(ByteIterable.bytesEquals(g0(), a0), true);

  const e1 = "`self` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      ByteIterable.bytesEquals(undefined as unknown as Uint8Array, []);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `self[0]` does not match the type of `uint8`.";
  assertThrows(
    () => {
      ByteIterable.bytesEquals([256], [0]);
    },
    TypeError,
    e2,
  );

  const e3 =
    "`other` must be (`Array<uint8> | Uint8Array | Uint8ClampedArray`).";
  assertThrows(
    () => {
      ByteIterable.bytesEquals([0], undefined as unknown as Uint8Array);
    },
    TypeError,
    e3,
  );
  assertThrows(
    () => {
      ByteIterable.bytesEquals([0], [256]);
    },
    TypeError,
    e3,
  );
});
