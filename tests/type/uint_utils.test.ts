import { assertStrictEquals, fail, unreachable } from "@std/assert";
import { Type } from "../../mod.ts";

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

Deno.test("Type.isArrayOfUint8()", () => {
  assertStrictEquals(Type.isArrayOfUint8(a0), true);
  assertStrictEquals(Type.isArrayOfUint8(a1), true);
  assertStrictEquals(Type.isArrayOfUint8([255]), true);
  assertStrictEquals(Type.isArrayOfUint8([-0]), true);
  assertStrictEquals(Type.isArrayOfUint8([-1]), false);
  assertStrictEquals(Type.isArrayOfUint8([256]), false);
  assertStrictEquals(Type.isArrayOfUint8(0), false);
  assertStrictEquals(Type.isArrayOfUint8(256), false);
  assertStrictEquals(Type.isArrayOfUint8([0, 255]), true);
  assertStrictEquals(Type.isArrayOfUint8([0, 255, -1]), false);
  assertStrictEquals(Type.isArrayOfUint8(["0"]), false);

  assertStrictEquals(Type.isArrayOfUint8(b0), false);
  assertStrictEquals(Type.isArrayOfUint8(b1), false);

  assertStrictEquals(Type.isArrayOfUint8(g0()), false);
  assertStrictEquals(Type.isArrayOfUint8(g1()), false);
});

Deno.test("Type.assertArrayOfUint8()", () => {
  try {
    Type.assertArrayOfUint8(a0, "test-1");
    Type.assertArrayOfUint8(a1, "test-1");
    Type.assertArrayOfUint8([255], "test-1");
    Type.assertArrayOfUint8([-0], "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertArrayOfUint8([-1], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayOfUint8([256], "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertArrayOfUint8(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});
