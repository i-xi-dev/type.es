export function delay(ms: number) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });
}

export function str(v: unknown): string {
  if (v instanceof Uint8Array) {
    return JSON.stringify([...v]);
  } else if (v && Reflect.has(v, Symbol.iterator)) {
    // deno-lint-ignore no-explicit-any
    return JSON.stringify([...(v as Iterable<any>)]);
  }

  throw new Error("-- unsupported type --");
}
