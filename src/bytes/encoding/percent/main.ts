import {
  _decode,
  _encode,
  _ResolvedOptions,
  _resolveOptions,
} from "./_common.ts";
import { PercentOptions } from "./options.ts";

// デコード結果が文字符号化した結果のバイト列かどうかには関知しない
// URLのパーセントデコードを実施したい場合は、戻り値をUTF-8デコードする必要がある
/**
 * Decodes a Percent-encoded string into an `Uint8Array`.
 *
 * @param encoded The string to decode.
 * @param options The `PercentOptions` dictionary.
 * @returns An `Uint8Array` containing the decoded byte sequence.
 * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
 * @throws {TypeError} The `encoded` is not Percent-encoded string.
 * @example
 * ```javascript
 * percentDecode("%61%62%00%FF");
 * // → Uint8Array[ 0x61, 0x62, 0x0, 0xFF ]
 *
 * percentDecode("ab%00%FF");
 * // → Uint8Array[ 0x61, 0x62, 0x0, 0xFF ]
 * ```
 */
export function percentDecode(
  encoded: string,
  options?: PercentOptions,
): Uint8Array {
  const resolvedOptions = _resolveOptions(options);
  return _decode(encoded, resolvedOptions);
}

// toEncodeが文字符号化した結果のバイト列かどうかには関知しない
// URLのパーセントエンコードを実施したい場合は、toEncodeには、UTF-8エンコードした結果のバイト列を渡す必要がある
// （@exampleの例の2つ目だと"ab%00%C3%BF"にはならない）
/**
 * Encodes the specified byte sequence into a string.
 *
 * @param toEncode The byte sequence to encode.
 * @param options The `PercentOptions` dictionary.
 * @returns A string containing the Percent-encoded characters.
 * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
 * @example
 * ```javascript
 * percentEncode(Uint8Array.of(0x61, 0x62, 0x0, 0xFF));
 * // → "%61%62%00%FF"
 *
 * percentEncode(Uint8Array.of(0x61, 0x62, 0x0, 0xFF), PercentOptions.URI_COMPONENT);
 * // → "ab%00%FF"
 * ```
 */
export function percentEncode(
  toEncode: Uint8Array,
  options?: PercentOptions,
): string {
  const resolvedOptions = _resolveOptions(options);
  return _encode(toEncode, resolvedOptions);
}
