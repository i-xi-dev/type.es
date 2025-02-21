import { type radix, type roundingmode } from "../type.ts";

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
