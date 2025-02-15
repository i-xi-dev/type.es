import { assertStrictEquals } from "@std/assert";
import { ExString } from "../../mod.ts";

Deno.test("ExString.EMPTY", () => {
  assertStrictEquals(ExString.EMPTY, "");
});
