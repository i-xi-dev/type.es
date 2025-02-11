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

const _MIN_HIGH_SURROGATE: codepoint = 0xD800;
const _MAX_HIGH_SURROGATE: codepoint = 0xDBFF;

export function isHighSurrogateCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    _MIN_HIGH_SURROGATE,
    _MAX_HIGH_SURROGATE,
  );
}

export function assertHighSurrogateCodePoint(
  test: unknown,
  label: string,
): void {
  if (isHighSurrogateCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a high-surrogate code point.`);
  }
}

const _MIN_LOW_SURROGATE: codepoint = 0xDC00;
const _MAX_LOW_SURROGATE: codepoint = 0xDFFF;

export function isLowSurrogateCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    _MIN_LOW_SURROGATE,
    _MAX_LOW_SURROGATE,
  );
}

export function assertLowSurrogateCodePoint(
  test: unknown,
  label: string,
): void {
  if (isLowSurrogateCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a low-surrogate code point.`);
  }
}

export function isSurrogateCodePoint(test: unknown): test is codepoint {
  return isSafeIntegerInRange(
    test,
    _MIN_HIGH_SURROGATE,
    _MAX_LOW_SURROGATE,
  );
}

export function assertSurrogateCodePoint(
  test: unknown,
  label: string,
): void {
  if (isSurrogateCodePoint(test) !== true) {
    throw new TypeError(`\`${label}\` must be a surrogate code point.`);
  }
}
