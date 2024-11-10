import { char, int, rune } from "../_.ts";

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function isEmpty(test: unknown): test is string {
  return isString(test) && (test.length === 0);
}

export function isNonEmpty(test: unknown): test is string {
  return isString(test) && (test.length > 0);
}

export function isChar(test: unknown): test is char {
  return isString(test) && (test.length === 1);
}

export function isRune(test: unknown): test is rune {
  return isString(test) && (test.length <= 2) && ([...test].length === 1) &&
    test.isWellFormed();
}

export function assertString(test: unknown, label: string): void {
  if (isString(test) !== true) {
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
  assertString(value, "value");
  return value.length;
}

//XXX fromSubstrings
//XXX fromSubstringsAsync

//XXX fromChars
//XXX fromCharsAsync

export function toChars(value: string): IterableIterator<char, void, void> {
  assertString(value, "value");

  return (function* (s) {
    for (let i = 0; i < s.length; i++) {
      yield value.charAt(i);
    }
  })(value);
}

//XXX fromCharCodes(source: Iterable<uint16 | [uint16] | [uint16, uint16]>): string
//XXX toCharCodes(source: string): IterableIterator<[uint16] | [uint16, uint16]>
