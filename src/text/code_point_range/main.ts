import * as Type from "../../type/mod.ts";
import {
  type codeplane,
  type codepoint,
  type intrange,
} from "../../_typedef/mod.ts";

export function ofCodePlane(codePlane: codeplane): intrange<codepoint> {
  Type.assertCodePlane(codePlane, "codePlane");
  const max = (0x10000 * (codePlane + 1)) - 1;
  const min = max - 0xFFFF;
  return [min, max];
}
