import { type safeint } from "../_typedef/mod.ts";

/**
 * The loading options.
 */
export type Options = {
  /** The total length of loading, if loading has a computable length. Otherwise `undefined`. */
  total?: safeint;

  /** The `AbortSignal` to abort loading. */
  signal?: AbortSignal;
};
