import { int } from "../_.ts";
import { assertSafeInteger } from "../type/number.ts";
import { normalize as normalizeNumber } from "../type/sp/number.ts";

export function clampToNonNegative<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.max(value, 0) as T);
}

export function clampToNonPositive<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, 0) as T);
}

export function clampToNegative<T extends int>(value: T): T {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, -1) as T);
}
