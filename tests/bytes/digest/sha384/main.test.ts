import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../../mod.ts";

function _x(arrayBuffer: ArrayBuffer): string {
  return [...new Uint8Array(arrayBuffer)].map((b) =>
    b.toString(16).toUpperCase().padStart(2, "0")
  ).join("");
}

Deno.test("Bytes.Sha384.compute()", async () => {
  const s1 = await Bytes.Sha384.compute(Uint8Array.of());
  assertStrictEquals(
    _x(s1),
    "38B060A751AC96384CD9327EB1B1E36A21FDB71114BE07434C0CC7BF63F6E1DA274EDEBFE76F65FBD51AD2F14898B95B",
  );
});
