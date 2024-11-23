import { assertStrictEquals } from "../deps.ts";
import { InvalidCharacterError } from "../../mod.ts";

Deno.test("InvalidCharacterError", () => {
  // new InvalidCharacterError()
  const error1 = new InvalidCharacterError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "InvalidCharacterError");
  assertStrictEquals(error1.message, "");

  // new InvalidCharacterError(string)
  const error2 = new InvalidCharacterError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "InvalidCharacterError");
  assertStrictEquals(error2.message, "a123");
});
