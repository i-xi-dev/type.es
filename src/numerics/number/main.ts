import * as Type from "../../type/mod.ts";
import { type numberrange } from "../../_typedef/mod.ts";

export function normalize(value: number): number {
  Type.assertNumber(value, "value");
  return ((value === 0) ? (value + 0) : value); // -0を0
}

export function clampToRange(value: number, range: numberrange): number {
  Type.assertNumber(value, "value");
  Type.assertNumberRange(range, "range");

  const [min, max] = range;
  return normalize(Math.min(Math.max(value, min), max));
}
