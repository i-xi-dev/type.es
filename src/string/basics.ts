import { assertString } from "../type/string.ts";
import { type char, type safeint, type uint16 } from "../type.ts";

export function charCountOf(value: string): safeint {
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

export function toCharCodes(
  value: string,
): IterableIterator<uint16, void, void> {
  assertString(value, "value");

  return (function* (s) {
    for (let i = 0; i < s.length; i++) {
      yield value.charCodeAt(i);
    }
  })(value);
}
