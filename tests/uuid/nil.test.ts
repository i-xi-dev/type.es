import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.nil()", () => {
  const u0 = Uuid.nil();
  assertStrictEquals(u0, "00000000-0000-0000-0000-000000000000");
  assertStrictEquals(Uuid.variantOf(u0), 0);
  assertStrictEquals(Uuid.versionOf(u0), 0);
});
