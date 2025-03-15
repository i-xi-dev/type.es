import { assertStrictEquals } from "@std/assert";
import { QuotaExceededError } from "../../../mod.ts";

Deno.test("QuotaExceededError", () => {
  // new QuotaExceededError()
  const error1 = new QuotaExceededError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "QuotaExceededError");
  assertStrictEquals(error1.message, "");

  // new QuotaExceededError(string)
  const error2 = new QuotaExceededError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "QuotaExceededError");
  assertStrictEquals(error2.message, "a123");
});
