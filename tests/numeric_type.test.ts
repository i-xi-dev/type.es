import { assertStrictEquals } from "./deps.ts";
import { NumericType } from "../mod.ts";

Deno.test("NumericType.radixPropertiesOf()", () => {
  const bp = NumericType.radixPropertiesOf(2);
  assertStrictEquals(bp.radix, 2);

  const dp = NumericType.radixPropertiesOf(10);
  assertStrictEquals(dp.radix, 10);

  const op = NumericType.radixPropertiesOf(8);
  assertStrictEquals(op.radix, 8);

  const hp = NumericType.radixPropertiesOf(16);
  assertStrictEquals(hp.radix, 16);

  const _p1 = NumericType.radixPropertiesOf(1 as 2);
  assertStrictEquals(_p1.radix, 10);
});
