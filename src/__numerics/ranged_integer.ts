import {
  type int,
  type radix,
  type roundingmode,
  type safeint,
} from "../_typedef/mod.ts";
import { OverflowMode } from "./overflow_mode.ts";

export type FromNumberOptions = {
  overflowMode?: OverflowMode;
  roundingMode?: roundingmode;
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
  //bitwiseAnd(self: T, other: T): T;
  //bitwiseOr(self: T, other: T): T;
  //bitwiseXOr(self: T, other: T): T;
  //rotateLeft(self: T, offset: safeint): T;
  fromNumber(value: number, options?: FromNumberOptions): T;
  fromBigInt(value: bigint, options?: FromBigIntOptions): T;
  //toBigInt(self: T): bigint;
  fromString(value: string, options?: FromStringOptions): T;
  toString(self: T, options?: ToStringOptions): string;
}

export interface Uint8xOperations<T extends int> extends UintNOperations<T> {
  byteLength: safeint;
}
