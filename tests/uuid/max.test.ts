import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.max()", () => {
  const u0 = Uuid.max();
  assertStrictEquals(u0, "ffffffff-ffff-ffff-ffff-ffffffffffff");
  assertStrictEquals(Uuid.variantOf(u0), 15);
  assertStrictEquals(Uuid.versionOf(u0), 15);
});
