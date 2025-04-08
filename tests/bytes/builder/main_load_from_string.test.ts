import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../mod.ts";

const { BytesBuilder } = Bytes;

Deno.test("Bytes.BytesBuilder.prototype.loadFromString()", () => {
  const b1 = BytesBuilder.create();
  assertThrows(
    () => {
      b1.loadFromString(0 as unknown as string);
    },
    TypeError,
    "`bytesAsString` must be a `string`.",
  );

  assertThrows(
    () => {
      b1.loadFromString(["0"] as unknown as string);
    },
    TypeError,
    "`bytesAsString` must be a `string`.",
  );

  assertThrows(
    () => {
      b1.loadFromString("0" as unknown as string);
    },
    RangeError,
    "`bytesAsString` must be text representation of byte sequence.",
  );

  assertThrows(
    () => {
      b1.loadFromString("001" as unknown as string);
    },
    RangeError,
    "`bytesAsString` must be text representation of byte sequence.",
  );

  assertThrows(
    () => {
      b1.loadFromString("-1" as unknown as string);
    },
    RangeError,
    "`bytesAsString` must be text representation of byte sequence.",
  );

  assertThrows(
    () => {
      b1.loadFromString("FG" as unknown as string);
    },
    RangeError,
    "`bytesAsString` must be text representation of byte sequence.",
  );

  b1.loadFromString("");
  assertStrictEquals(b1.duplicateAsArrayBuffer().byteLength, 0);

  b1.loadFromString("0001fF");
  const b1c1 = b1.duplicateAsUint8Array();
  assertStrictEquals(b1c1.length, 3);
  assertStrictEquals(b1c1[0], 0);
  assertStrictEquals(b1c1[1], 1);
  assertStrictEquals(b1c1[2], 255);
});
