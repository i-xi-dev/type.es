import * as Type from "../../type/mod.ts";

/**
 * Computes the SHA-1 digest for the byte sequence.
 *
 * @deprecated
 */
export function computeSha1(input: BufferSource): Promise<ArrayBuffer> {
  Type.assertBufferSource(input, "input");
  return globalThis.crypto.subtle.digest("SHA-1", input);
}
