import _blocks from "../../dat/unicode/block_map.ts";
import _gcs from "../../dat/unicode/gc_map.ts";
// import {
//   type codeplane,
//   type codepoint,
//   type gc,
//   type safeintrange,
// } from "../type.ts";

export const CodePlane /* : Record<string, codeplane> */ = {
  BMP: 0,
  SMP: 1,
  SIP: 2,
  TIP: 3,
  SSP: 14,
  SPUA_A: 15,
  SPUA_B: 16,
} as const;

export const UnicodeGeneralCategory /* : Record<string, gc> */ = _gcs;

export const UnicodeBlock /* : Record<string, safeintrange<codepoint>> */ =
  _blocks;
