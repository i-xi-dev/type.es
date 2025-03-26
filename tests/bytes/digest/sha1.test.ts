import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../mod.ts";

function _x(arrayBuffer: ArrayBuffer): string {
  return [...new Uint8Array(arrayBuffer)].map((b) =>
    b.toString(16).toUpperCase().padStart(2, "0")
  ).join("");
}

Deno.test("Bytes.computeSha1()", async () => {
  const s1 = await Bytes.computeSha1(Uint8Array.of());
  assertStrictEquals(
    _x(s1),
    "DA39A3EE5E6B4B0D3255BFEF95601890AFD80709",
  );
});
