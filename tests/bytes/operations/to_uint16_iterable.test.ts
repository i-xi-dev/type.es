import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteOrder, Bytes } from "../../../mod.ts";

Deno.test("Bytes.toUint16Iterable()", () => {
  assertThrows(
    () => {
      Bytes.toUint16Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      Bytes.toUint16Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      Bytes.toUint16Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 2.",
  );
  assertThrows(
    () => {
      Bytes.toUint16Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 2.",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint16Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[256,770]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint16Iterable(
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
      ...Bytes.toUint16Iterable(b2b.buffer, {
        byteOrder: "big-endian",
      }),
    ]),
    "[0,0,256,770,1284,1798,257,257]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint16Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[1,515]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint16Iterable(
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
      ...Bytes.toUint16Iterable(b3b.buffer, {
        byteOrder: "little-endian",
      }),
    ]),
    "[0,0,1,515,1029,1543,257,257]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint16Iterable(Uint8Array.of().buffer),
    ]),
    "[]",
  );
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[256,770]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[256,770,1284,1798]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint16Iterable(b2b.buffer),
      ]),
      "[0,0,256,770,1284,1798,257,257]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[1,515]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[1,515,1029,1543]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint16Iterable(b3b.buffer),
      ]),
      "[0,0,1,515,1029,1543,257,257]",
    );
  }
});
