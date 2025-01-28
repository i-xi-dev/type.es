import { assertStrictEquals, assertThrows } from "@std/assert";
import { ExtString } from "../../mod.ts";

Deno.test("ExtString.isomorphicDecode", () => {
  // decode(ArrayBuffer)
  assertStrictEquals(ExtString.isomorphicDecode(new ArrayBuffer(0)), "");
  assertStrictEquals(
    ExtString.isomorphicDecode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    "ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(ExtString.isomorphicDecode(Uint8Array.of()), "");
  assertStrictEquals(
    ExtString.isomorphicDecode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    "ABCD",
  );
  assertStrictEquals(
    ExtString.isomorphicDecode(Uint8Array.of(0x0, 0xFF)),
    "\u0000\u00FF",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  assertStrictEquals(ExtString.isomorphicDecode(new Uint8Array(c)), t);
  //console.log(performance.now() - bf);

  // decode(any)
  assertThrows(
    () => {
      ExtString.isomorphicDecode(undefined as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );

  assertThrows(
    () => {
      ExtString.isomorphicDecode([] as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );
});
