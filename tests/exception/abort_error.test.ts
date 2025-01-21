import { assertStrictEquals } from "@std/assert";
import { AbortError } from "../../mod.ts";

Deno.test("AbortError", () => {
  // new AbortError()
  const error1 = new AbortError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "AbortError");
  assertStrictEquals(error1.message, "");

  // new AbortError(string)
  const error2 = new AbortError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "AbortError");
  assertStrictEquals(error2.message, "a123");
});
