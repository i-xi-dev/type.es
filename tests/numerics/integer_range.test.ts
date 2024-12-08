import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { IntegerRange } = Numerics;

Deno.test("IntegerRange.Tuple.is() - bigint", () => {
  assertStrictEquals(IntegerRange.Tuple.is([]), false);

  assertStrictEquals(IntegerRange.Tuple.is([0n]), true);
  assertStrictEquals(IntegerRange.Tuple.is([0n, 0n]), true);
  assertStrictEquals(IntegerRange.Tuple.is([0n, 0n, 0n]), false);

  assertStrictEquals(IntegerRange.Tuple.is([0]), true);
  assertStrictEquals(IntegerRange.Tuple.is([0, 0]), true);
  assertStrictEquals(IntegerRange.Tuple.is([0, 0, 0]), false);
  assertStrictEquals(IntegerRange.Tuple.is([]), false);

  assertStrictEquals(IntegerRange.Tuple.is([0n, 0]), false);
  assertStrictEquals(IntegerRange.Tuple.is([0, 0n]), false);

  assertStrictEquals(IntegerRange.Tuple.is(undefined), false);
  assertStrictEquals(IntegerRange.Tuple.is("0"), false);
  assertStrictEquals(IntegerRange.Tuple.is({ [0]: 0n, [1]: 0n }), false);
  assertStrictEquals(IntegerRange.Tuple.is({ [0]: 0, [1]: 0 }), false);
});
