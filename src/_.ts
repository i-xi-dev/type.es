/**
 * String matching regular expression `/^[\u0000-\uFFFF]{1}$/`.
 * including surrogates.
 */
export type char = string;

/**
 * String matching regular expression `/^[\u{0}-\u{10FFFF}]{1}$/u`.
 * excluding any lone surrogates.
 */
export type rune = string;

export type usvstring = string;

export type int = number;

/** 0x0-0x10FFFF */
export type codepoint = int;

export type intorginint = number | bigint;

export type numeric = number | bigint;

/** Unicode plane */
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
