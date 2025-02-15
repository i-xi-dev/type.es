import { assertStrictEquals } from "@std/assert";
import { ExBigInt } from "../../mod.ts";

Deno.test("ExBigInt.ZERO", () => {
  assertStrictEquals(ExBigInt.ZERO, 0n);
});
