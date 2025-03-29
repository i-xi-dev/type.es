let _decoderRef: WeakRef<TextDecoder> | undefined = undefined;

export function _utf8Decode(value: Uint8Array<ArrayBuffer>): string {
  let decoder = _decoderRef?.deref();

  if (!decoder) {
    decoder = new TextDecoder(undefined, {
      fatal: true,
      ignoreBOM: true,
    });
    _decoderRef = new WeakRef(decoder);
  }

  return decoder.decode(value);
}

let _encoderRef: WeakRef<TextEncoder> | undefined = undefined;

export function _utf8Encode(value: string): Uint8Array<ArrayBuffer> {
  let encoder = _encoderRef?.deref();

  if (!encoder) {
    encoder = new TextEncoder();
    _encoderRef = new WeakRef(encoder);
  }

  return encoder.encode(value) as Uint8Array<ArrayBuffer>;
}
