import * as Type from "../../type/mod.ts";
import { type char, type safeint } from "../../type.ts";
import { type uint16 } from "../../_typedef/mod.ts";

export function charCountOf(value: string): safeint {
  Type.assertString(value, "value");
  return value.length;
}

//XXX fromChars
//XXX fromCharsAsync

export function toChars(value: string): IterableIterator<char, void, void> {
  Type.assertString(value, "value");

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
  Type.assertString(value, "value");

  return (function* (s) {
    for (let i = 0; i < s.length; i++) {
      yield value.charCodeAt(i);
    }
  })(value);
}
