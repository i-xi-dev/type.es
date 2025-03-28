export function delay(ms: number) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });
}

export function str(v: unknown): string {
  if (v instanceof Uint8Array) {
    return JSON.stringify([...v]);
  }

  throw new Error("-- unsupported type --");
}
