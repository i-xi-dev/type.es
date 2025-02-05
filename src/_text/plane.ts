import { isSafeIntegerInRange } from "../type/number.ts";
import { type plane } from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

const _BMP: plane = NUMBER_ZERO;
const _SPUA_B: plane = 16;

export function is(test: unknown): test is plane {
  return isSafeIntegerInRange(test, _BMP, _SPUA_B);
}
