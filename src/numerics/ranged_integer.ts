import { type int, type safeint } from "../type.ts";
import { OverflowMode } from "./overflow_mode.ts";
import { type radix } from "../type/sp/radix.ts";
import { RoundingMode } from "../type/sp/rounding_mode.ts";

export type FromNumberOptions = {
  overflowMode?: OverflowMode;
  roundingMode?: RoundingMode;
}; // Numerics.FromNumberOptions & { overflowMode }

export type FromBigIntOptions = {
  overflowMode?: OverflowMode;
};

export type FromStringOptions = {
  overflowMode?: OverflowMode;
  radix?: radix;
}; // Numerics.FromStringOptions & { overflowMode }

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: safeint;
  radix?: radix;
}; // Numerics.ToStringOptions;

export interface UintNOperations<T extends int> {
  bitLength: safeint;
  is(value: unknown): value is T;
  assert(value: unknown, label: string): void;
  bitwiseAnd(self: T, other: T): T;
  bitwiseOr(self: T, other: T): T;
  bitwiseXOr(self: T, other: T): T;
  //XXX bitwiseNot(self: T): T;
  rotateLeft(self: T, offset: safeint): T;
  //XXX rotateRight(self: T, offset: safeint): T;
  fromNumber(value: number, options?: FromNumberOptions): T;
  toNumber(self: T): safeint;
  fromBigInt(value: bigint, options?: FromBigIntOptions): T;
  toBigInt(self: T): bigint;
  fromString(value: string, options?: FromStringOptions): T;
  toString(self: T, options?: ToStringOptions): string;
}

export const BITS_PER_BYTE = 8;

export interface Uint8xOperations<T extends int> extends UintNOperations<T> {
  byteLength: safeint;
  toBytes(self: T, littleEndian: boolean): Uint8Array;
}
