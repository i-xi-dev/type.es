import { type radix } from "../type.ts";
import { type roundingmode } from "../_typedef/mod.ts";

//XXX Integer.FromNumberOptions or IntegerFromNumberOptions
export type FromNumberOptions = {
  roundingMode?: roundingmode;
};

export type FromStringOptions = {
  radix?: radix;
};

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: radix;
};
