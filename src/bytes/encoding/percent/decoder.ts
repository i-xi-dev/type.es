import {
  _decode,
  _encode,
  _ResolvedOptions,
  _resolveOptions,
} from "./_common.ts";
import { Decoder } from "../main.ts";
import { PercentOptions } from "./options.ts";

/**
 * Percent decoder
 */
export class PercentDecoder implements Decoder {
  /**
   * 未設定項目を埋めたオプション
   */
  #options: _ResolvedOptions;

  /**
   * @param options The `PercentOptions` dictionary.
   * @throws {RangeError} The `options.spaceAsPlus` is `true`, but the `options.encodeSet` was not contain `0x2B`.
   */
  constructor(options?: PercentOptions) {
    this.#options = _resolveOptions(options);
  }

  /**
   * Decodes a Percent-encoded string into an `Uint8Array`.
   *
   * @param encoded The string to decode.
   * @returns An `Uint8Array` containing the decoded byte sequence.
   * @throws {TypeError} The `encoded` is not Percent-encoded string.
   */
  decode(encoded: string): Uint8Array {
    return _decode(encoded, this.#options);
  }
}
