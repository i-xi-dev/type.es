import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteOrder, Bytes } from "../../../mod.ts";

Deno.test("Bytes.toUint32Iterable()", () => {
  assertThrows(
    () => {
      Bytes.toUint32Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      Bytes.toUint32Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      Bytes.toUint32Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 4.",
  );
  assertThrows(
    () => {
      Bytes.toUint32Iterable(Uint8Array.of(1, 2).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 4.",
  );
  assertThrows(
    () => {
      Bytes.toUint32Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 4.",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint32Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[16777986]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        { byteOrder: "big-endian" },
      ),
    ]),
    "[16777986,84150022]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint32Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[33751041]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        { byteOrder: "little-endian" },
      ),
    ]),
    "[33751041,101123077]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Bytes.toUint32Iterable(Uint8Array.of().buffer),
    ]),
    "[]",
  );
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[16777986]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[16777986,84150022]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[33751041]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Bytes.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[33751041,101123077]",
    );
  }
});
