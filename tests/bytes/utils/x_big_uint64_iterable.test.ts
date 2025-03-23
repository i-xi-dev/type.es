import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteOrder, Bytes } from "../../../mod.ts";

const { BytesUtils } = Bytes;

Deno.test("Bytes.BytesUtils.toBigUint64Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(Uint8Array.of(1, 2).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(Uint8Array.of(1, 2, 3, 4).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(Uint8Array.of(1, 2, 3, 4, 5).buffer);
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(
        Uint8Array.of(1, 2, 3, 4, 5, 6).buffer,
      );
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );
  assertThrows(
    () => {
      BytesUtils.toBigUint64Iterable(
        Uint8Array.of(1, 2, 3, 4, 5, 6, 7).buffer,
      );
    },
    RangeError,
    "The byte length of `value` must be divisible by 8.",
  );

  assertStrictEquals(
    [
      ...BytesUtils.toBigUint64Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "big-endian" },
      ),
    ].join(","),
    "",
  );
  assertStrictEquals(
    [
      ...BytesUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "big-endian" },
      ),
    ].join(","),
    "72060901162745856",
  );
  assertStrictEquals(
    [
      ...BytesUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "big-endian" },
      ),
    ].join(","),
    "72060901246895878,72060901162745856",
  );

  assertStrictEquals(
    [
      ...BytesUtils.toBigUint64Iterable(
        Uint8Array.of().buffer,
        { byteOrder: "little-endian" },
      ),
    ].join(","),
    "",
  );
  assertStrictEquals(
    [
      ...BytesUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "little-endian" },
      ),
    ].join(","),
    "33751041",
  );
  assertStrictEquals(
    [
      ...BytesUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        { byteOrder: "little-endian" },
      ),
    ].join(","),
    "434320308619640833,33751041",
  );

  assertStrictEquals(
    [
      ...BytesUtils.toBigUint64Iterable(Uint8Array.of().buffer),
    ].join(","),
    "",
  );
  if (ByteOrder.nativeOrder === "big-endian") {
    assertStrictEquals(
      [
        ...BytesUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "72060901162745856",
    );
    assertStrictEquals(
      [
        ...BytesUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "72060901246895878,72060901162745856",
    );
  } else {
    assertStrictEquals(
      [
        ...BytesUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "33751041",
    );
    assertStrictEquals(
      [
        ...BytesUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "434320308619640833,33751041",
    );
  }
});
