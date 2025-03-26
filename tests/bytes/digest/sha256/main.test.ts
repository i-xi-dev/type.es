import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../../mod.ts";

function _x(arrayBuffer: ArrayBuffer): string {
  return [...new Uint8Array(arrayBuffer)].map((b) =>
    b.toString(16).toUpperCase().padStart(2, "0")
  ).join("");
}

Deno.test("Bytes.Sha256.compute()", async () => {
  const s1 = await Bytes.Sha256.compute(Uint8Array.of());
  assertStrictEquals(
    _x(s1),
    "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
  );
});
