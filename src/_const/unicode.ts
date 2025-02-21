import _blocks from "../../dat/unicode/block_map.ts";
import _gcs from "../../dat/unicode/gc_map.ts";
// import {
//   type codepoint,
//   type gc,
//   type plane,
//   type safeintrange,
// } from "../type.ts";

export const Plane /* : Record<string, plane> */ = {
  BMP: 0,
  SMP: 1,
  SIP: 2,
  TIP: 3,
  SSP: 14,
  SPUA_A: 15,
  SPUA_B: 16,
} as const;

export const GeneralCategory /* : Record<string, gc> */ = _gcs;

export const Block /* : Record<string, safeintrange<codepoint>> */ = _blocks;
