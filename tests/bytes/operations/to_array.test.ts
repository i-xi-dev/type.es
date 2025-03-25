import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../mod.ts";

Deno.test("Bytes.toArray()", () => {
  assertThrows(
    () => {
      Bytes.toArray(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertThrows(
    () => {
      Bytes.toArray(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertStrictEquals(
    JSON.stringify(Bytes.toArray(Uint8Array.of().buffer)),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify(Bytes.toArray(Uint8Array.of(1, 0, 3, 2).buffer)),
    "[1,0,3,2]",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 1, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    JSON.stringify(Bytes.toArray(b2b.buffer)),
    "[0,0,0,0,1,0,3,2,1,1,1,1]",
  );
});
