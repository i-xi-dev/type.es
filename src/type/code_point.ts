import { type codepoint } from "../type.ts";
import { isSafeIntegerInRange } from "./number.ts";
import {
  MAX_VALUE as MAX_CODE_POINT,
  MIN_VALUE as MIN_CODE_POINT,
} from "../const/code_point.ts";

export function isCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(test, MIN_CODE_POINT, MAX_CODE_POINT);
}

export function assertCodePoint(test: unknown, label: string): void {
  if (isCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a code point.`);
  }
}
