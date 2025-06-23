import { _encode, _ResolvedOptions, _resolveOptions } from "./_common.ts";
import { Encoder } from "../main.ts";
import { Base64Options } from "./options.ts";

/**
 * Base64 encoder
 *
 * @example
 * ```javascript
 * const encoder = new Base64Encoder();
 *
 * encoder.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
 * // → "AwIBAP/+/fw="
 * ```
 * @example
 * ```javascript
 * const encoder = new Base64Encoder(Base64Options.RFC4648_URL);
 *
 * encoder.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
 * // → "AwIBAP_-_fw"
 * ```
 * @deprecated Use the `Uint8Array.prototype.toBase64()`.
 */
export class Base64Encoder implements Encoder {
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
    return "Base64Encoder";
  }

  /**
   * Encodes the specified byte sequence into a string.
   *
   * @param toEncode The byte sequence to encode.
   * @returns A string containing the Base64-encoded characters.
   */
  encode(toEncode: Uint8Array<ArrayBuffer>): string {
    return _encode(toEncode, this.#options);
  }
}
