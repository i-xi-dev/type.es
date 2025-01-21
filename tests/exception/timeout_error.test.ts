import { assertStrictEquals } from "@std/assert";
import { TimeoutError } from "../../mod.ts";

Deno.test("TimeoutError", () => {
  // new TimeoutError()
  const error1 = new TimeoutError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "TimeoutError");
  assertStrictEquals(error1.message, "");

  // new TimeoutError(string)
  const error2 = new TimeoutError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "TimeoutError");
  assertStrictEquals(error2.message, "a123");
});
