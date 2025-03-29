import * as Type from "../type/mod.ts";
import { _utf8Decode, _utf8Encode } from "./_utils.ts";
import { type codepoint, type rune, type safeint } from "../_typedef/mod.ts";
import { String as ExString } from "../basics/mod.ts";

const { EMPTY } = ExString;

export type Options = {
  allowMalformed?: boolean;
};

function _assert(value: string, label: string, options?: Options): void {
  if (options?.allowMalformed === true) {
    Type.assertString(value, label);
  } else {
    Type.assertUSVString(value, label);
  }
}

export function runeCountOf(value: string, options?: Options): safeint {
  _assert(value, "value", options);
  return [...value].length;
}

//XXX fromRunes
//XXX fromRunesAsync

export function toRunes(value: string, options?: Options): Iterable<rune> {
  _assert(value, "value", options);
  return value[Symbol.iterator]();
}

export function fromCodePoints(
  value: Iterable<codepoint>,
  options?: Options,
): string {
  Type.assertIterable(value, "value");

  let runes = EMPTY;
  let rune: rune;
  let i = 0;
  for (const codePoint of value) {
    Type.assertCodePoint(codePoint, `value[${i}]`);
    rune = String.fromCodePoint(codePoint);

    if ((options?.allowMalformed !== true) && (rune.isWellFormed() !== true)) {
      throw new RangeError(
        "`value` must not contain lone surrogate code points.",
      );
    }
    runes += rune;
    i++;
  }

  return runes;
}

//XXX fromCodePointsAsync(value: AsyncIterable<codepoint>): Promise<string>

export function toCodePoints(
  value: string,
  options?: Options,
): Iterable<codepoint> {
  _assert(value, "value", options);

  return (function* (runes) {
    for (const rune of runes) {
      yield rune.codePointAt(0)!;
    }
  })(value);
}

// UTF-8 (without BOM)
// lone surrogateはそもそもTextDecoderが受け付けないのでoptions.allowMalformedは必要ない
export function fromBytes(bytes: Uint8Array<ArrayBuffer>): string {
  Type.assertUint8Array(bytes, "bytes");
  return _utf8Decode(bytes); // throws TypeError if decoding-error
}

// UTF-8 (without BOM)
// 注: allowMalformed:trueにした場合、lone surrogateは0xFFFDにされる
export function toBytes(
  text: string,
  options?: Options,
): Uint8Array<ArrayBuffer> {
  _assert(text, "text", options);
  return _utf8Encode(text);
}

//TODO fromBytesStream(fromBytesIterable/Async)
//TODO toRunes
//TODO toGraphemes

//XXX TextBuilder?
//      loadFromStringIterable()
//      loadFromStringAsyncIterable()
