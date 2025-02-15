import { assertStrictEquals } from "@std/assert";
import { ExNumber } from "../../mod.ts";

Deno.test("ExNumber.ZERO", () => {
  assertStrictEquals(ExNumber.ZERO, 0);
});
