import { assertStrictEquals } from "@std/assert";
import { Numerics } from "../../mod.ts";

const { RadixProperties } = Numerics;

Deno.test("RadixProperties.of()", () => {
  const bp = RadixProperties.of(2);
  assertStrictEquals(bp.radix, 2);

  const dp = RadixProperties.of(10);
  assertStrictEquals(dp.radix, 10);

  const op = RadixProperties.of(8);
  assertStrictEquals(op.radix, 8);

  const hp = RadixProperties.of(16);
  assertStrictEquals(hp.radix, 16);

  const _p1 = RadixProperties.of(1 as 2);
  assertStrictEquals(_p1.radix, 10);
});
