import * as Type from "../../type/mod.ts";

/**
 * Computes the SHA-512 digest for the byte sequence.
 */
export function computeSha512(input: BufferSource): Promise<ArrayBuffer> {
  Type.assertBufferSource(input, "input");
  return globalThis.crypto.subtle.digest("SHA-512", input);
}
