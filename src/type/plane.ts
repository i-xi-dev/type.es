import { isSafeIntInRange } from "./number.ts";
import { type plane } from "../_typedef/mod.ts";
import { Plane } from "../_const/unicode.ts";

//XXX 一般名詞すぎる
export function isPlane(test: unknown): test is plane {
  return isSafeIntInRange(test, [Plane.BMP, Plane.SPUA_B]);
}

export function assertPlane(test: unknown, label: string): void {
  if (isPlane(test) !== true) {
    throw new TypeError(`\`${label}\` must be an code point plane value.`);
  }
}
