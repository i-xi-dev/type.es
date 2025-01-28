/**
 * The zero-length string.
 */
export const EMPTY = "";

/**
 * Implementation of [isomorphic decode](https://infra.spec.whatwg.org/#isomorphic-decode) defined in WHATWG Infra Standard.
 *
 * @param input A byte sequence.
 * @returns A string that represents a byte sequence by the code point.
 */
export function isomorphicDecode(input: BufferSource): string {
  let bytes: Uint8Array;
  if (ArrayBuffer.isView(input)) {
    bytes = new Uint8Array(input.buffer);
  } else if (input instanceof ArrayBuffer) {
    bytes = new Uint8Array(input);
  } else {
    throw new TypeError("`input` must be a `BufferSource`.");
  }

  // A: Bの2倍以上遅い（Node.js）
  // let chars: string = EMPTY;
  // for (const byte of bytes) {
  //   chars = chars + String.fromCharCode(byte);
  // }
  // return chars;

  // B:
  const chars = Array.from(bytes, (byte) => {
    return String.fromCharCode(byte);
  });
  return chars.join(EMPTY);
}
