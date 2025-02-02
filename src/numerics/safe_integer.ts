import * as ExtNumber from "../utils/number.ts";
import { int } from "../_.ts";
import { assertSafeInteger } from "../type/number.ts";

export function clampToPositive<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.max(value, 1) as T);
}

export function clampToNonNegative<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.max(value, 0) as T);
}

export function clampToNonPositive<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.min(value, 0) as T);
}

export function clampToNegative<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return ExtNumber.normalize(Math.min(value, -1) as T);
}
