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
}
