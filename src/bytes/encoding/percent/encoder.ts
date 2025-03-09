import { _encode, _ResolvedOptions, _resolveOptions } from "./_common.ts";
import { Encoder } from "../main.ts";
import { PercentOptions } from "./options.ts";

/**
 * Percent encoder
 */
export class PercentEncoder implements Encoder {
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
    Object.freeze(this);
  }

  /**
   * Encodes the specified byte sequence into a string.
   *
   * @param toEncode The byte sequence to encode.
   * @returns A string containing the Percent-encoded characters.
   */
  encode(toEncode: Uint8Array): string {
    return _encode(toEncode, this.#options);
  }
}
