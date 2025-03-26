/**
 * Computes the digest for the byte sequence.
 *
 * @param input The input to compute the digest.
 * @returns The `Promise` that fulfills with a computed digest.
 */
export type ComputeDigest = (input: BufferSource) => Promise<ArrayBuffer>;
