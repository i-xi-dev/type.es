import * as Type from "../../../type/mod.ts";
import { type DigestAlgorithm } from "../main.ts";

/**
 * SHA-384 digest algorithm
 */
export const Sha384: DigestAlgorithm = {
  /**
   * Computes the SHA-384 digest for the byte sequence.
   */
  compute(input: BufferSource): Promise<ArrayBuffer> {
    Type.assertBufferSource(input, "input");
    return globalThis.crypto.subtle.digest("SHA-384", input);
  },
};
