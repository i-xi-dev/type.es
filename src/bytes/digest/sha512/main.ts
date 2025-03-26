import * as Type from "../../../type/mod.ts";
import { type DigestAlgorithm } from "../main.ts";

/**
 * SHA-512 digest algorithm
 */
export const Sha512: DigestAlgorithm = {
  /**
   * Computes the SHA-512 digest for the byte sequence.
   */
  compute(input: BufferSource): Promise<ArrayBuffer> {
    Type.assertBufferSource(input, "input");
    return globalThis.crypto.subtle.digest("SHA-512", input);
  },
};
