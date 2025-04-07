import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.fromString()", () => {
  const u0 = Uri.fromString("http://example.com/");
  assertStrictEquals(u0.toString(), "http://example.com/");

  const u1 = Uri.fromString("http://example.com/test/../");
  assertStrictEquals(u1.toString(), "http://example.com/");

  assertThrows(
    () => {
      Uri.fromString("");
    },
    TypeError,
    "`value` must be a non-empty string.",
  );
  assertThrows(
    () => {
      Uri.fromString("a");
    },
    TypeError,
    "`value` must be text representation of URL.",
  );
});
