export type byteorder = "big-endian" | "little-endian";

/**
 * String matching regular expression `/^[\u0000-\uFFFF]{1}$/`.
 * including surrogates.
 */
export type char = string;

// 2,8,10,16にしているのはstringからbigintへのパースが面倒になるからというだけ
export type radix = 2 | 8 | 10 | 16;
