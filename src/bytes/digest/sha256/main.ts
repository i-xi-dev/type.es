import * as Type from "../../../type/mod.ts";
import { type DigestAlgorithm } from "../main.ts";

/**
 * SHA-256 digest algorithm
 */
export const Sha256: DigestAlgorithm = {
  /**
   * Computes the SHA-256 digest for the byte sequence.
   */
  compute(input: BufferSource): Promise<ArrayBuffer> {
    Type.assertBufferSource(input, "input");
    return globalThis.crypto.subtle.digest("SHA-256", input);
  },
};
