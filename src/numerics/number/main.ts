import * as Type from "../../type/mod.ts";
import { type numberrange } from "../../_typedef/mod.ts";
import { ZERO as NUMBER_ZERO } from "../../_const/number.ts";

export function normalize(value: number): number {
  Type.assertNumber(value, "value");
  return ((value === NUMBER_ZERO) ? (value + NUMBER_ZERO) : value); // -0を0
}

//TODO 命名 toか？
export function clampToRange(value: number, range: numberrange): number {
  Type.assertNumber(value, "value");
  Type.assertNumberRange(range, "range");

  const [min, max] = range;
  return normalize(Math.min(Math.max(value, min), max));
}
