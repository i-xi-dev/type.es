import {
  assertString,
  type char,
  isEmptyString,
  isString,
} from "../type/string.ts";
import { EMPTY } from "../utils/string.ts";
import { int } from "../_.ts";

export function charCountOf(value: string): int {
  assertString(value, "value");
  return value.length;
}

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

// export type PatternOptions = {
//   noUnicodeSets?: boolean;
// };

const _flags = "v";

export function matchesPattern(test: string, pattern: string): test is string {
  return isString(test) && isString(pattern) &&
    (new RegExp(`^${pattern}$`, _flags)).test(test);
}

export function containsPattern(test: string, pattern: string): test is string {
  return isString(test) && isString(pattern) &&
    (new RegExp(`${pattern}`, _flags)).test(test);
}

export function startsWithPattern(
  test: string,
  pattern: string,
): test is string {
  return isString(test) && isString(pattern) &&
    (new RegExp(`^${pattern}`, _flags)).test(test);
}

export function endsWithPattern(test: string, pattern: string): test is string {
  return isString(test) && isString(pattern) &&
    (new RegExp(`${pattern}$`, _flags)).test(test);
}

// export type TruncateOptions = {
// };

export function truncateStart(value: string, truncatePattern: string): string {
  assertString(value, "value");
  assertString(truncatePattern, "truncatePattern");

  if (isEmptyString(truncatePattern)) {
    return value;
  }

  return value.replace(new RegExp(`^${truncatePattern}`, _flags), EMPTY);
}

export function truncateEnd(value: string, truncatePattern: string): string {
  assertString(value, "value");
  assertString(truncatePattern, "truncatePattern");

  if (isEmptyString(truncatePattern)) {
    return value;
  }

  return value.replace(new RegExp(`${truncatePattern}$`, _flags), EMPTY);
}

export function truncateBoth(value: string, truncatePattern: string): string {
  assertString(value, "value");
  assertString(truncatePattern, "truncatePattern");

  if (isEmptyString(truncatePattern)) {
    return value;
  }

  return value.replace(
    new RegExp(`(?:^${truncatePattern}|${truncatePattern}$)`, _flags),
    EMPTY,
  );
}

export function collectStart(value: string, collectPattern: string): string {
  assertString(value, "value");
  assertString(collectPattern, "collectPattern");

  if (isEmptyString(collectPattern)) {
    return EMPTY;
  }

  const results = (new RegExp(`^${collectPattern}`, _flags)).exec(value);
  if (results === null) {
    return EMPTY;
  }
  return results[0];
}

export function collectEnd(value: string, collectPattern: string): string {
  assertString(value, "value");
  assertString(collectPattern, "collectPattern");

  if (isEmptyString(collectPattern)) {
    return EMPTY;
  }

  const results = (new RegExp(`${collectPattern}$`, _flags)).exec(value);
  if (results === null) {
    return EMPTY;
  }
  return results[0];
}
