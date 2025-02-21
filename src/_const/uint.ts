import { ZERO as BIGINT_ZERO } from "./bigint.ts";
import { ZERO as NUMBER_ZERO } from "./number.ts";

export const Uint6 = {
  MIN_VALUE: NUMBER_ZERO,
  MAX_VALUE: 0x3F,
} as const;

export const Uint7 = {
  MIN_VALUE: NUMBER_ZERO,
  MAX_VALUE: 0x7F,
} as const;

export const Uint8 = {
  MIN_VALUE: NUMBER_ZERO,
  MAX_VALUE: 0xFF,
} as const;

export const Uint16 = {
  MIN_VALUE: NUMBER_ZERO,
  MAX_VALUE: 0xFFFF,
} as const;

export const Uint24 = {
  MIN_VALUE: NUMBER_ZERO,
  MAX_VALUE: 0xFFFFFF,
} as const;

export const Uint32 = {
  MIN_VALUE: NUMBER_ZERO,
  MAX_VALUE: 0xFFFFFFFF,
} as const;

export const BigUint64 = {
  MIN_VALUE: BIGINT_ZERO,
  MAX_VALUE: 0xFFFFFFFF_FFFFFFFFn,
} as const;

export const BigUint128 = {
  MIN_VALUE: BIGINT_ZERO,
  MAX_VALUE: 0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn,
} as const;
