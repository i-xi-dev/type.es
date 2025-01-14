import { char, int } from "../_.ts";

/**
 * The zero-length string.
 */
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

export function charCountOf(value: string): int {
  assert(value, "value");
  return value.length;
}

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

// export type PatternOptions = {
//   noUnicodeSets?: boolean;
// };

const _flags = "v";

export function matchesPattern(test: string, pattern: string): test is string {
  return is(test) && is(pattern) &&
    (new RegExp(`^${pattern}$`, _flags)).test(test);
}

export function containsPattern(test: string, pattern: string): test is string {
  return is(test) && is(pattern) &&
    (new RegExp(`${pattern}`, _flags)).test(test);
}

export function startsWithPattern(
  test: string,
  pattern: string,
): test is string {
  return is(test) && is(pattern) &&
    (new RegExp(`^${pattern}`, _flags)).test(test);
}

export function endsWithPattern(test: string, pattern: string): test is string {
  return is(test) && is(pattern) &&
    (new RegExp(`${pattern}$`, _flags)).test(test);
}

// export type TruncateOptions = {
// };

export function truncateStart(value: string, truncatePattern: string): string {
  assert(value, "value");
  assert(truncatePattern, "truncatePattern");

  if (isEmpty(truncatePattern)) {
    return value;
  }

  return value.replace(new RegExp(`^${truncatePattern}`, _flags), EMPTY);
}

export function truncateEnd(value: string, truncatePattern: string): string {
  assert(value, "value");
  assert(truncatePattern, "truncatePattern");

  if (isEmpty(truncatePattern)) {
    return value;
  }

  return value.replace(new RegExp(`${truncatePattern}$`, _flags), EMPTY);
}

export function truncateBoth(value: string, truncatePattern: string): string {
  assert(value, "value");
  assert(truncatePattern, "truncatePattern");

  if (isEmpty(truncatePattern)) {
    return value;
  }

  return value.replace(
    new RegExp(`(?:^${truncatePattern}|${truncatePattern}$)`, _flags),
    EMPTY,
  );
}

export function collectStart(value: string, collectPattern: string): string {
  assert(value, "value");
  assert(collectPattern, "collectPattern");

  if (isEmpty(collectPattern)) {
    return EMPTY;
  }

  const results = (new RegExp(`^${collectPattern}`, _flags)).exec(value);
  if (results === null) {
    return EMPTY;
  }
  return results[0];
}

export function collectEnd(value: string, collectPattern: string): string {
  assert(value, "value");
  assert(collectPattern, "collectPattern");

  if (isEmpty(collectPattern)) {
    return EMPTY;
  }

  const results = (new RegExp(`${collectPattern}$`, _flags)).exec(value);
  if (results === null) {
    return EMPTY;
  }
  return results[0];
}
