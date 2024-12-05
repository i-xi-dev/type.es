import { assertStrictEquals } from "@std/assert";
import { Basics } from "../../mod.ts";

const { InvalidStateError } = Basics;

Deno.test("InvalidStateError", () => {
  // new InvalidStateError()
  const error1 = new InvalidStateError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "InvalidStateError");
  assertStrictEquals(error1.message, "");

  // new InvalidStateError(string)
  const error2 = new InvalidStateError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "InvalidStateError");
  assertStrictEquals(error2.message, "a123");
});
