/**
 * String matching regular expression `/^[\u0000-\uFFFF]{1}$/`.
 * including surrogates.
 */
export type char = string;

export type int = number;

export type intorginint = number | bigint;

export type numeric = number | bigint;

/**
 * String matching regular expression `/^[\u{0}-\u{10FFFF}]{1}$/u`.
 * excluding any lone surrogates.
 */
export type rune = string;

export type usvstring = string;
