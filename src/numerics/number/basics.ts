import * as Type from "../../type/mod.ts";
import { type numberrange } from "../../type.ts";
import { ZERO as NUMBER_ZERO } from "../../_const/number.ts";

export function normalize<T extends number>(value: T): T {
  Type.assertNumber(value, "value");
  return ((value === NUMBER_ZERO) ? (value + NUMBER_ZERO) : value) as T; // -0を0
}

//TODO 命名 toか？
export function clampToRange<T extends number>(
  value: number,
  range: numberrange<T>,
): T {
  Type.assertNumber(value, "value");
  Type.assertNumberRange(range, "range");

  const [min, max] = range;
  if (min > max) {
    throw new RangeError("`max` must be greater than or equal to `min`.");
  }
  return normalize(Math.min(Math.max(value, min), max)) as T;
}
