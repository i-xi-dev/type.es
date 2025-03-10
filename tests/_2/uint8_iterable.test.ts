import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uint8Iterable } from "../../mod.ts";

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

Deno.test("Uint8Iterable.bytesStartsWith()", () => {
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, a3), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, a2), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, a1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, b3), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, b2), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, b1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a3, b0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(g3(), b3), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g3(), b2), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g3(), b1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g3(), b0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(a2, a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a2, a2), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a2, a1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a2, a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(b2, a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b2, a2), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b2, a1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b2, a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(g2(), a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g2(), a2), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g2(), a1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g2(), a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(a1, a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a1, a2), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a1, a1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a1, a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(b1, a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b1, a2), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b1, a1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b1, a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(g1(), a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g1(), a2), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g1(), a1), true);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g1(), a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(a0, a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a0, a2), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a0, a1), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(a0, a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(b0, a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b0, a2), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b0, a1), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(b0, a0), true);

  assertStrictEquals(Uint8Iterable.elementsStartsWith(g0(), a3), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g0(), a2), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g0(), a1), false);
  assertStrictEquals(Uint8Iterable.elementsStartsWith(g0(), a0), true);

  const e1 = "`self` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      Uint8Iterable.elementsStartsWith(
        undefined as unknown as Uint8Array,
        [],
      );
    },
    TypeError,
    e1,
  );

  const e2 = "`self[0]` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8Iterable.elementsStartsWith([256], [0]);
    },
    TypeError,
    e2,
  );

  const e3 =
    "`other` must be a `Array<uint8>` or `Uint8Array` or `Uint8ClampedArray`.";
  assertThrows(
    () => {
      Uint8Iterable.elementsStartsWith(
        [0],
        undefined as unknown as Uint8Array<ArrayBuffer>,
      );
    },
    TypeError,
    e3,
  );
  assertThrows(
    () => {
      Uint8Iterable.elementsStartsWith([0], [256]);
    },
    TypeError,
    e3,
  );
});

Deno.test("Uint8Iterable.bytesEquals()", () => {
  assertStrictEquals(Uint8Iterable.elementsEquals(a3, a3), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(a3, a2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a3, a1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a3, a0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(a3, b3), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(a3, b2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a3, b1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a3, b0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(g3(), b3), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(g3(), b2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g3(), b1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g3(), b0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(a2, a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a2, a2), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(a2, a1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a2, a0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(b2, a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(b2, a2), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(b2, a1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(b2, a0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(g2(), a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g2(), a2), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(g2(), a1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g2(), a0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(a1, a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a1, a2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a1, a1), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(a1, a0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(b1, a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(b1, a2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(b1, a1), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(b1, a0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(g1(), a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g1(), a2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g1(), a1), true);
  assertStrictEquals(Uint8Iterable.elementsEquals(g1(), a0), false);

  assertStrictEquals(Uint8Iterable.elementsEquals(a0, a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a0, a2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a0, a1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(a0, a0), true);

  assertStrictEquals(Uint8Iterable.elementsEquals(b0, a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(b0, a2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(b0, a1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(b0, a0), true);

  assertStrictEquals(Uint8Iterable.elementsEquals(g0(), a3), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g0(), a2), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g0(), a1), false);
  assertStrictEquals(Uint8Iterable.elementsEquals(g0(), a0), true);

  const e1 = "`self` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      Uint8Iterable.elementsEquals(undefined as unknown as Uint8Array, []);
    },
    TypeError,
    e1,
  );

  const e2 = "`self[0]` must be an 8-bit unsigned integer.";
  assertThrows(
    () => {
      Uint8Iterable.elementsEquals([256], [0]);
    },
    TypeError,
    e2,
  );

  const e3 =
    "`other` must be a `Array<uint8>` or `Uint8Array` or `Uint8ClampedArray`.";
  assertThrows(
    () => {
      Uint8Iterable.elementsEquals(
        [0],
        undefined as unknown as Uint8Array<ArrayBuffer>,
      );
    },
    TypeError,
    e3,
  );
  assertThrows(
    () => {
      Uint8Iterable.elementsEquals([0], [256]);
    },
    TypeError,
    e3,
  );
});
