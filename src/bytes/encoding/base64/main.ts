import {
  _decode,
  _encode,
  _ResolvedOptions,
  _resolveOptions,
} from "./_common.ts";
import { Base64Options } from "./options.ts";

/**
 * Decodes a Base64-encoded string into an `Uint8Array`.
 *
 * @param encoded The string to decode.
 * @param options The `Base64.Options` dictionary.
 * @returns An `Uint8Array` containing the decoded byte sequence.
 * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.paddingChar` character is contained in the `options.rawTable`.
 * @throws {TypeError} The `encoded` is not Base64-encoded string.
 * @example
 * ```javascript
 * Base64.decode("AwIBAP/+/fw=");
 * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
 * ```
 * @example
 * ```javascript
 * const rfc4648urlOptions = Base64.Options.RFC4648URL;
 * Base64.decode("AwIBAP_-_fw", rfc4648urlOptions);
 * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
 * ```
 */
export function base64Decode(
  encoded: string,
  options?: Base64Options,
): Uint8Array<ArrayBuffer> {
  const resolvedOptions = _resolveOptions(options);
  return _decode(encoded, resolvedOptions);
}

/**
 * Encodes the specified byte sequence into a string.
 *
 * @param toEncode The byte sequence to encode.
 * @param options The `Base64.Options` dictionary.
 * @returns A string containing the Base64-encoded characters.
 * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.paddingChar` character is contained in the `options.rawTable`.
 * @example
 * ```javascript
 * Base64.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
 * // → "AwIBAP/+/fw="
 * ```
 * @example
 * ```javascript
 * const rfc4648urlOptions = Base64.Options.RFC4648URL;
 * Base64.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC), rfc4648urlOptions);
 * // → "AwIBAP_-_fw"
 * ```
 */
export function base64Encode(
  toEncode: Uint8Array<ArrayBuffer>,
  options?: Base64Options,
): string {
  const resolvedOptions = _resolveOptions(options);
  return _encode(toEncode, resolvedOptions);
}
