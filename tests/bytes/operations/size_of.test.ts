import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../mod.ts";

Deno.test("Bytes.sizeOf()", () => {
  assertThrows(
    () => {
      Bytes.sizeOf(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertThrows(
    () => {
      Bytes.sizeOf(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertStrictEquals(Bytes.sizeOf(Uint8Array.of().buffer).valueOf(), 0);
  assertStrictEquals(
    Bytes.sizeOf(Uint8Array.of(1, 0, 3, 2).buffer).valueOf(),
    4,
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 1, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    Bytes.sizeOf(b2b.buffer).valueOf(),
    12,
  );
});
