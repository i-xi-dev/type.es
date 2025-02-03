import { type radix } from "../type/sp/radix.ts";
import { RoundingMode } from "../type/sp/rounding_mode.ts";

//XXX Integer.FromNumberOptions or IntegerFromNumberOptions
export type FromNumberOptions = {
  roundingMode?: RoundingMode;
};

export type FromStringOptions = {
  radix?: radix;
};

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: radix;
};
