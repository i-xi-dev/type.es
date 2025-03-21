import { type safeint } from "../../_typedef/mod.ts";

export type _AFunc = (test: unknown, label: string) => void;

export function _normalizeOffset(offset: safeint, bitLength: safeint): safeint {
  const normalizedOffset = offset % bitLength;
  if (normalizedOffset < 0) {
    return normalizedOffset + bitLength;
  }
  return normalizedOffset;
}
