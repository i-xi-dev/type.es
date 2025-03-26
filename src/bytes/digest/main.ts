/**
 * Digest algorithm
 */
export interface DigestAlgorithm {
  /**
   * Computes the digest for the byte sequence.
   *
   * @param input The input to compute the digest.
   * @returns The `Promise` that fulfills with a computed digest.
   */
  compute: (input: BufferSource) => Promise<ArrayBuffer>;
}
