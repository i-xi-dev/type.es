import {
  _decode,
  _encode,
  _ResolvedOptions,
  _resolveOptions,
} from "./_common.ts";
import { Decoder } from "../main.ts";
import { Base64Options } from "./options.ts";

/**
 * Base64 decoder
 *
 * @example
 * ```javascript
 * const decoder = new Base64Decoder();
 *
 * decoder.decode("AwIBAP/+/fw=");
 * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
 * ```
 * @example
 * ```javascript
 * const decoder = new Base64Decoder(Base64Options.RFC4648_URL);
 *
 * decoder.decode("AwIBAP_-_fw");
 * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
 * ```
 * @deprecated Use the `Uint8Array.fromBase64()`.
 */
export class Base64Decoder implements Decoder {
  /**
   * 未設定項目を埋めたオプション
   */
  #options: _ResolvedOptions;

  /**
   * @param options The `Base64.Options` dictionary.
   * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.padding` character is contained in the `options.rawTable`.
   */
  constructor(options?: Base64Options) {
    this.#options = _resolveOptions(options);
  }

  get [Symbol.toStringTag](): string {
    return "Base64Decoder";
  }

  /**
   * Decodes a Base64-encoded string into an `Uint8Array`.
   *
   * @param encoded The string to decode.
   * @returns An `Uint8Array` containing the decoded byte sequence.
   * @throws {TypeError} The `encoded` is not Base64-encoded string.
   */
  decode(encoded: string): Uint8Array<ArrayBuffer> {
    return _decode(encoded, this.#options);
  }
}
