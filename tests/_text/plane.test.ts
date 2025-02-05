import { assertStrictEquals } from "@std/assert";
import { Text } from "../../mod.ts";

const { Plane } = Text;

Deno.test("Plane.is()", () => {
  assertStrictEquals(Plane.is(-1), false);
  assertStrictEquals(Plane.is(-0), true);
  assertStrictEquals(Plane.is(0), true);
  assertStrictEquals(Plane.is(16), true);
  assertStrictEquals(Plane.is(17), false);

  assertStrictEquals(Plane.is(undefined), false);
  assertStrictEquals(Plane.is("0"), false);
});
