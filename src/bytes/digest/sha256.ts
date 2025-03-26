import * as Type from "../../type/mod.ts";

/**
 * Computes the SHA-256 digest for the byte sequence.
 */
export function computeSha256(input: BufferSource): Promise<ArrayBuffer> {
  Type.assertBufferSource(input, "input");
  return globalThis.crypto.subtle.digest("SHA-256", input);
}
