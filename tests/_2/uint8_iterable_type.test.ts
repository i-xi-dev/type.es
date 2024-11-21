import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "../deps.ts";
import { Uint8IterableType } from "../../mod.ts";

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

Deno.test("Uint8IterableType.isArrayOfUint8()", () => {
  assertStrictEquals(Uint8IterableType.isArrayOfUint8(a0), true);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8(a1), true);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8([255]), true);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8([-0]), true);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8([-1]), false);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8([256]), false);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8(0), false);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8(256), false);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8([0, 255]), true);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8([0, 255, -1]), false);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8(["0"]), false);

  assertStrictEquals(Uint8IterableType.isArrayOfUint8(b0), false);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8(b1), false);

  assertStrictEquals(Uint8IterableType.isArrayOfUint8(g0()), false);
  assertStrictEquals(Uint8IterableType.isArrayOfUint8(g1()), false);
});

Deno.test("Uint8IterableType.assertArrayOfUint8()", () => {
  try {
    Uint8IterableType.assertArrayOfUint8(a0, "test-1");
    Uint8IterableType.assertArrayOfUint8(a1, "test-1");
    Uint8IterableType.assertArrayOfUint8([255], "test-1");
    Uint8IterableType.assertArrayOfUint8([-0], "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Uint8IterableType.assertArrayOfUint8([-1], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Uint8IterableType.assertArrayOfUint8([256], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Uint8IterableType.assertArrayOfUint8(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Uint8IterableType.isUint8SizedIterable()", () => {
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(a0), true);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(a1), true);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8([255]), true);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8([-0]), true);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8([-1]), false);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8([256]), false);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(0), false);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(256), false);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8([0, 255]), true);
  assertStrictEquals(
    Uint8IterableType.isArrayLikeOfUint8([0, 255, -1]),
    false,
  );
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(["0"]), false);

  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(b0), true);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(b1), true);

  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(g0()), false);
  assertStrictEquals(Uint8IterableType.isArrayLikeOfUint8(g1()), false);
});

Deno.test("Uint8IterableType.bytesStartsWith()", () => {
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, a3), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, a2), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, a1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, b3), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, b2), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, b1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a3, b0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(g3(), b3), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g3(), b2), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g3(), b1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g3(), b0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(a2, a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a2, a2), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a2, a1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a2, a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(b2, a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b2, a2), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b2, a1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b2, a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(g2(), a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g2(), a2), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g2(), a1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g2(), a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(a1, a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a1, a2), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a1, a1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a1, a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(b1, a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b1, a2), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b1, a1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b1, a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(g1(), a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g1(), a2), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g1(), a1), true);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g1(), a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(a0, a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a0, a2), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a0, a1), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(a0, a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(b0, a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b0, a2), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b0, a1), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(b0, a0), true);

  assertStrictEquals(Uint8IterableType.elementsStartsWith(g0(), a3), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g0(), a2), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g0(), a1), false);
  assertStrictEquals(Uint8IterableType.elementsStartsWith(g0(), a0), true);

  const e1 = "`self` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      Uint8IterableType.elementsStartsWith(
        undefined as unknown as Uint8Array,
        [],
      );
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `self[0]` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8IterableType.elementsStartsWith([256], [0]);
    },
    TypeError,
    e2,
  );

  const e3 =
    "`other` must be (`Array<uint8> | Uint8Array | Uint8ClampedArray`).";
  assertThrows(
    () => {
      Uint8IterableType.elementsStartsWith(
        [0],
        undefined as unknown as Uint8Array,
      );
    },
    TypeError,
    e3,
  );
  assertThrows(
    () => {
      Uint8IterableType.elementsStartsWith([0], [256]);
    },
    TypeError,
    e3,
  );
});

Deno.test("Uint8IterableType.bytesEquals()", () => {
  assertStrictEquals(Uint8IterableType.elementsEquals(a3, a3), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(a3, a2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a3, a1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a3, a0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(a3, b3), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(a3, b2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a3, b1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a3, b0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(g3(), b3), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(g3(), b2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g3(), b1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g3(), b0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(a2, a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a2, a2), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(a2, a1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a2, a0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(b2, a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(b2, a2), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(b2, a1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(b2, a0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(g2(), a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g2(), a2), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(g2(), a1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g2(), a0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(a1, a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a1, a2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a1, a1), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(a1, a0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(b1, a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(b1, a2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(b1, a1), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(b1, a0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(g1(), a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g1(), a2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g1(), a1), true);
  assertStrictEquals(Uint8IterableType.elementsEquals(g1(), a0), false);

  assertStrictEquals(Uint8IterableType.elementsEquals(a0, a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a0, a2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a0, a1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(a0, a0), true);

  assertStrictEquals(Uint8IterableType.elementsEquals(b0, a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(b0, a2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(b0, a1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(b0, a0), true);

  assertStrictEquals(Uint8IterableType.elementsEquals(g0(), a3), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g0(), a2), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g0(), a1), false);
  assertStrictEquals(Uint8IterableType.elementsEquals(g0(), a0), true);

  const e1 = "`self` must implement `Symbol.iterator`.";
  assertThrows(
    () => {
      Uint8IterableType.elementsEquals(undefined as unknown as Uint8Array, []);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `self[0]` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8IterableType.elementsEquals([256], [0]);
    },
    TypeError,
    e2,
  );

  const e3 =
    "`other` must be (`Array<uint8> | Uint8Array | Uint8ClampedArray`).";
  assertThrows(
    () => {
      Uint8IterableType.elementsEquals([0], undefined as unknown as Uint8Array);
    },
    TypeError,
    e3,
  );
  assertThrows(
    () => {
      Uint8IterableType.elementsEquals([0], [256]);
    },
    TypeError,
    e3,
  );
});
