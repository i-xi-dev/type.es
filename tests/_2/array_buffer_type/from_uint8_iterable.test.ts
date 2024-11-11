import { assertStrictEquals, assertThrows } from "../../deps.ts";
import { ArrayBufferType } from "../../../mod.ts";
import { uint8 } from "../../../src/_.ts";

Deno.test("ArrayBufferType.fromUint8Iterable(Array<uint8>)", () => {
  assertThrows(
    () => {
      ArrayBufferType.fromUint8Iterable(0 as unknown as Array<uint8>);
    },
    TypeError,
    "`value` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      ArrayBufferType.fromUint8Iterable(1 as unknown as Array<uint8>);
    },
    TypeError,
    "`value` must implement `Symbol.iterator`.",
  );

  assertThrows(
    () => {
      ArrayBufferType.fromUint8Iterable([-1] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint8Iterable(["0"] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint8Iterable([256] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[0]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint8Iterable([0, 256] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint8`.",
  );
  assertThrows(
    () => {
      ArrayBufferType.fromUint8Iterable([0, -1] as unknown as Array<uint8>);
    },
    TypeError,
    "The type of `value[1]` does not match the type of `uint8`.",
  );

  assertStrictEquals(ArrayBufferType.fromUint8Iterable([]).byteLength, 0);

  const a1 = new Uint8Array(ArrayBufferType.fromUint8Iterable([0, 1, 255]));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("ArrayBufferType.fromUint8Iterable(Uint8Array)", () => {
  assertStrictEquals(
    ArrayBufferType.fromUint8Iterable(new Uint8Array(0)).byteLength,
    0,
  );

  const a1 = new Uint8Array(
    ArrayBufferType.fromUint8Iterable(Uint8Array.from([0, 1, 255])),
  );
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("ArrayBufferType.fromUint8Iterable(Generator<uint8>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(ArrayBufferType.fromUint8Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 255;
  })();

  const a1 = new Uint8Array(ArrayBufferType.fromUint8Iterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});
