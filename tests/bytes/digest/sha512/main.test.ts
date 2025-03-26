import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../../mod.ts";

function _x(arrayBuffer: ArrayBuffer): string {
  return [...new Uint8Array(arrayBuffer)].map((b) =>
    b.toString(16).toUpperCase().padStart(2, "0")
  ).join("");
}

Deno.test("Bytes.Sha512.compute()", async () => {
  const s1 = await Bytes.Sha512.compute(Uint8Array.of());
  assertStrictEquals(
    _x(s1),
    "CF83E1357EEFB8BDF1542850D66D8007D620E4050B5715DC83F4A921D36CE9CE47D0D13C5D85F2B0FF8318D2877EEC2F63B931BD47417A81A538327AF927DA3E",
  );
});
