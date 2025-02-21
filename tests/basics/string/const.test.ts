import { assertStrictEquals } from "@std/assert";
import { String as ExString } from "../../../mod.ts";

Deno.test("String.EMPTY", () => {
  assertStrictEquals(ExString.EMPTY, "");
});
