import { assertStrictEquals } from "./deps.ts";
import { Numerics } from "../mod.ts";

Deno.test("Numerics.radixPropertiesOf()", () => {
  const bp = Numerics.radixPropertiesOf(2);
  assertStrictEquals(bp.radix, 2);

  const dp = Numerics.radixPropertiesOf(10);
  assertStrictEquals(dp.radix, 10);

  const op = Numerics.radixPropertiesOf(8);
  assertStrictEquals(op.radix, 8);

  const hp = Numerics.radixPropertiesOf(16);
  assertStrictEquals(hp.radix, 16);

  const _p1 = Numerics.radixPropertiesOf(1 as 2);
  assertStrictEquals(_p1.radix, 10);
});
