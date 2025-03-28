import * as Type from "../type/mod.ts";
import { _utf8Decode, _utf8Encode } from "./_utils.ts";

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
