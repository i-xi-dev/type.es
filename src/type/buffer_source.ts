export function isBufferSource(test: unknown): test is BufferSource {
  return (test instanceof ArrayBuffer) || ArrayBuffer.isView(test);
}

export function assertBufferSource(test: unknown, label: string): void {
  if (isBufferSource(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`BufferSource\`.`);
  }
}

// isArrayBufferView → ArrayBuffer.isView

export function assertArrayBufferView(test: unknown, label: string): void {
  if (ArrayBuffer.isView(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`ArrayBufferView\`.`);
  }
}
