import {
  _FORM_URLENCODED_OPTIONS,
  _MIN_OPTIONS,
  _URI_COMPONENT_OPTIONS,
  _URI_FRAGMENT_OPTIONS,
  _URI_PATH_OPTIONS,
  _URI_QUERY_OPTIONS,
  _URI_SPECIAL_QUERY_OPTIONS,
  _URI_USERINFO_OPTIONS,
} from "./_common.ts";

/**
 * The object with the following optional fields.
 */
export type PercentOptions = {
  /**
   * The byte set to be encoded except 0x00-0x1F, 0x25, 0x7F-0xFF.
   * The default is 0x20-0x24, 0x26-0x7E.
   *
   * The following restrictions apply:
   * - The `encodeSet` must not contain duplicate bytes.
   *
   * @see [https://url.spec.whatwg.org/#percent-encoded-bytes](https://url.spec.whatwg.org/#percent-encoded-bytes)
   */
  encodeSet?: Readonly<Array<number>>;

  /**
   * Whether to output 0x20 as `"+"`.
   * The default is `false`.
   *
   * The following restrictions apply:
   * - If `true`, `encodeSet` must contain `0x2B`.
   */
  spaceAsPlus?: boolean;
};

export namespace PercentOptions {
  /**
   * The options for the C0 controls percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[]` |
   * | `spaceAsPlus` | `false` |
   */
  export const C0: PercentOptions = _MIN_OPTIONS;

  /**
   * The options for the URL fragment percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[ 0x20, 0x22, 0x3C, 0x3E, 0x60 ]` |
   * | `spaceAsPlus` | `false` |
   */
  export const URI_FRAGMENT: PercentOptions = _URI_FRAGMENT_OPTIONS;

  /**
   * The options for the URL query percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x3C, 0x3E ]` |
   * | `spaceAsPlus` | `false` |
   */
  export const URI_QUERY: PercentOptions = _URI_QUERY_OPTIONS;

  /**
   * The options for the URL special-query percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x27, 0x3C, 0x3E ]` |
   * | `spaceAsPlus` | `false` |
   */
  export const URI_SPECIAL_QUERY: PercentOptions = _URI_SPECIAL_QUERY_OPTIONS;

  /**
   * The options for the URL path percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60, 0x7B, 0x7D ]` |
   * | `spaceAsPlus` | `false` |
   */
  export const URI_PATH: PercentOptions = _URI_PATH_OPTIONS;

  /**
   * The options for the URL userinfo percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]` |
   * | `spaceAsPlus` | `false` |
   */
  export const URI_USERINFO: PercentOptions = _URI_USERINFO_OPTIONS;

  /**
   * The options for the URL component percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[ 0x20, 0x22, 0x23, 0x24, 0x26, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D ]` |
   * | `spaceAsPlus` | `false` |
   */
  export const URI_COMPONENT: PercentOptions = _URI_COMPONENT_OPTIONS;

  /**
   * The options for the application/x-www-form-urlencoded percent-encode
   *
   * | field | value |
   * | :--- | :--- |
   * | `encodeSet` | `[ 0x20, 0x21, 0x22, 0x23, 0x24, 0x26, 0x27, 0x28, 0x29, 0x2B, 0x2C, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x60, 0x7B, 0x7C, 0x7D, 0x7E ]` |
   * | `spaceAsPlus` | `true` |
   */
  export const FORM_URLENCODED: PercentOptions = _FORM_URLENCODED_OPTIONS;
}
