import _blocks from "../../dat/unicode/block_map.ts";
import _gcs from "../../dat/unicode/gc_map.ts";
// import {
//   type codepoint,
//   type gc,
//   type safeintrange,
// } from "../type.ts";

export const UnicodeGeneralCategory /* : Record<string, gc> */ = _gcs;

export const UnicodeBlock /* : Record<string, safeintrange<codepoint>> */ =
  _blocks;
