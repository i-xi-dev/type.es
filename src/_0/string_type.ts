import { char, int, rune } from "../_.ts";

export const EMPTY = "";

export function is(test: unknown): test is string {
  return (typeof test === "string");
}

export function isEmpty(test: unknown): test is string {
  return is(test) && (test.length === 0);
}

export function isNonEmpty(test: unknown): test is string {
  return is(test) && (test.length > 0);
}

export function isChar(test: unknown): test is char {
  return is(test) && (test.length === 1);
}

export function isRune(test: unknown): test is rune {
  return is(test) && (test.length <= 2) && ([...test].length === 1) &&
    test.isWellFormed();
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}

export function assertEmpty(test: unknown, label: string): void {
  if (isEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be an empty string.`);
  }
}

export function assertNonEmpty(test: unknown, label: string): void {
  if (isNonEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty string.`);
  }
}

export function assertChar(test: unknown, label: string): void {
  if (isChar(test) !== true) {
    throw new TypeError(`\`${label}\` must be an UTF-16 code unit.`);
  }
}

export function assertRune(test: unknown, label: string): void {
  if (isRune(test) !== true) {
    throw new TypeError(`\`${label}\` must be an Unicode scalar value.`);
  }
}

export function charCountOf(value: string): int {
  assert(value, "value");
  return value.length;
}

//XXX fromSubstrings
//XXX fromSubstringsAsync

//XXX fromChars
//XXX fromCharsAsync

export function toChars(value: string): IterableIterator<char, void, void> {
  assert(value, "value");

  return (function* (s) {
    for (let i = 0; i < s.length; i++) {
      yield value.charAt(i);
    }
  })(value);
}

//XXX fromCharCodes(source: Iterable<uint16 | [uint16] | [uint16, uint16]>): string
//XXX toCharCodes(source: string): IterableIterator<[uint16] | [uint16, uint16]>

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

/**
 * Implementation of [isomorphic encode](https://infra.spec.whatwg.org/#isomorphic-encode) defined in WHATWG Infra Standard.
 *
 * @param input A string that does not contain code points greater than `U+00FF`.
 * @returns A byte sequence of isomorphic encoded `input`.
 */
export function isomorphicEncode(input: string): Uint8Array {
  assert(input, "input");

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
