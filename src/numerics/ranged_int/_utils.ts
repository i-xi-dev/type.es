import * as Byte from "../../basics/byte/mod.ts";
import { Number as ExNumber } from "../../numerics/mod.ts";
import { type safeint } from "../../_typedef/mod.ts";

export type _AFunc = (test: unknown, label: string) => void;

export function _byteLengthOf(bitLength: safeint): safeint {
  // assert (bitLength % Byte.BITS_PER_BYTE) === 0;
  return bitLength / Byte.BITS_PER_BYTE;
}

export function _normalizeOffset(offset: safeint, bitLength: safeint): safeint {
  const normalizedOffset = offset % bitLength;
  if (normalizedOffset < ExNumber.ZERO) {
    return normalizedOffset + bitLength;
  }
  return normalizedOffset;
}
