import { type codeplane } from "../_typedef/mod.ts";
import { CodePlane } from "../_const/unicode.ts";
import { isSafeIntInRange } from "./number.ts";

export function isCodePlane(test: unknown): test is codeplane {
  return isSafeIntInRange(test, [CodePlane.BMP, CodePlane.SPUA_B]);
}

export function assertCodePlane(test: unknown, label: string): void {
  if (isCodePlane(test) !== true) {
    throw new TypeError(`\`${label}\` must be an code point plane value.`);
  }
}
