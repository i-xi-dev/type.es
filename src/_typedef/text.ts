import { type safeint } from "../type.ts";

/** 0x0-0x10FFFF */
export type codepoint = safeint;

/**
 * A group of code points.
 */
export type plane =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

/**
 * String matching regular expression `/^[\u{0}-\u{10FFFF}]{1}$/u`.
 * excluding any lone surrogates.
 */
export type rune = string;

/**
 * A rune sequence.
 */
export type usvstring = string;

/**
 * A grapheme cluster.
 */
export type grapheme = usvstring;
