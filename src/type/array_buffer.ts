export function isArrayBuffer(test: unknown): test is ArrayBuffer {
  return (test instanceof ArrayBuffer);
}

export function assertArrayBuffer(test: unknown, label: string): void {
  if (isArrayBuffer(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`ArrayBuffer\`.`);
  }
}
