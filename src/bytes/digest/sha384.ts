import * as Type from "../../type/mod.ts";

/**
 * Computes the SHA-384 digest for the byte sequence.
 */
export function computeSha384(input: BufferSource): Promise<ArrayBuffer> {
  Type.assertBufferSource(input, "input");
  return globalThis.crypto.subtle.digest("SHA-384", input);
}
