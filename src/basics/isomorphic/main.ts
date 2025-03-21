import * as ExString from "../string/mod.ts";
import * as Type from "../../type/mod.ts";

const { EMPTY } = ExString;

/**
 * Implementation of [isomorphic decode](https://infra.spec.whatwg.org/#isomorphic-decode) defined in WHATWG Infra Standard.
 *
 * @param input A byte sequence.
 * @returns A string that represents a byte sequence by the code point.
 */
export function decode(input: BufferSource): string {
  let bytes: Uint8Array<ArrayBuffer> | undefined;
  if (Type.isArrayBufferView(input)) {
    bytes = new Uint8Array(input.buffer);
  } else if (input instanceof ArrayBuffer) {
    bytes = new Uint8Array(input);
  }
  if (!bytes) {
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

/**
 * Implementation of [isomorphic encode](https://infra.spec.whatwg.org/#isomorphic-encode) defined in WHATWG Infra Standard.
 *
 * @param input A string that does not contain code points greater than `U+00FF`.
 * @returns A byte sequence of isomorphic encoded `input`.
 */
export function encode(input: string): Uint8Array<ArrayBuffer> {
  Type.assertString(input, "input");

  // deno-lint-ignore no-control-regex
  if (/^[\u{0}-\u{FF}]*$/u.test(input) !== true) {
    throw new RangeError(
      "Code point of `input` must be less than or equal to 255.",
    );
  }

  const bytes = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i++) {
    bytes[i] = input.charCodeAt(i);
  }
  return bytes;
}
