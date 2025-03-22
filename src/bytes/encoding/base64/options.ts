import { _Options, _RFC4648_OPTIONS, _RFC4648URL_OPTIONS } from "./_common.ts";

export type Base64Options = _Options;

export namespace Base64Options {
  /**
   * The options for [RFC 4648 Base64](https://datatracker.ietf.org/doc/html/rfc4648#section-4).
   *
   * | field | value |
   * | :--- | :--- |
   * | `rawTable` | `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]` |
   * | `noPadding` | `false` |
   * | `paddingChar` | `"="` |
   */
  export const RFC4648: Base64Options = _RFC4648_OPTIONS;

  /**
   * The options for [RFC 4648 Base64url](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
   *
   * | field | value |
   * | :--- | :--- |
   * | `rawTable` | `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_" ]` |
   * | `noPadding` | `true` |
   * | `paddingChar` | `"="` |
   */
  export const RFC4648_URL: Base64Options = _RFC4648URL_OPTIONS;
}
