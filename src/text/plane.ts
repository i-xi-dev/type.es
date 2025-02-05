import { isSafeIntegerInRange } from "../type/number.ts";
import { type plane } from "../type.ts";

const _BMP: plane = 0;
const _SPUA_B: plane = 16;

export function is(test: unknown): test is plane {
  return isSafeIntegerInRange(test, _BMP, _SPUA_B);
}
