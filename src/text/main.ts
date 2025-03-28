import * as Type from "../type/mod.ts";
import { _utf8Decode, _utf8Encode } from "./_utils.ts";
import { type rune, type safeint } from "../_typedef/mod.ts";

// allow malformed-string
export function runeCountOf(value: string): safeint {
  Type.assertString(value, "value");
  return [...value].length;
}

//XXX fromRunes
//XXX fromRunesAsync

// allow malformed-string
export function toRunes(value: string): Iterable<rune> {
  Type.assertString(value, "value");
  return value[Symbol.iterator]();
}

// UTF-8 (without BOM)
export function fromBytes(bytes: Uint8Array<ArrayBuffer>): string {
  Type.assertUint8Array(bytes, "bytes");
  return _utf8Decode(bytes); // throws TypeError if decoding-error
}

// UTF-8 (without BOM)
export function toBytes(text: string): Uint8Array<ArrayBuffer> {
  Type.assertString(text, "text");
  return _utf8Encode(text);
}

//TODO fromBytesStream(fromBytesIterable/Async)
//TODO toRunes
//TODO toGraphemes

//XXX TextBuilder?
//      loadFromStringIterable()
//      loadFromStringAsyncIterable()
