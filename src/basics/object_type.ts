export function is(test: unknown): test is object {
  return (typeof test === "object");
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Object\`.`);
  }
}

export function isNonNull(test: unknown): test is NonNullable<object> {
  return (is(test) && (test !== null));
  // is()によってundefinedは弾かれる。よってisNonNull(undefined)はfalseとなる
}

export function assertNonNull(test: unknown, label: string): void {
  if (isNonNull(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Object\` except \`null\`.`);
  }
}

export function isNull(test: unknown): test is null {
  return (test === null);
}

export function isNullOrUndefined(test: unknown): test is null | undefined {
  return (test === null) || (test === undefined);
}

// deno-lint-ignore no-explicit-any
export function isIterable<T = any>(test: unknown): test is Iterable<T> {
  return isNonNull(test) && (Symbol.iterator in test);
}

// deno-lint-ignore no-explicit-any
export function assertIterable<T = any>(test: unknown, label: string): void {
  if (isIterable<T>(test) !== true) {
    throw new TypeError(`\`${label}\` must implement \`Symbol.iterator\`.`);
  }
}

// deno-lint-ignore no-explicit-any
export function isAsyncIterable<T = any>(
  test: unknown,
): test is AsyncIterable<T> {
  return isNonNull(test) && (Symbol.asyncIterator in test);
}

// deno-lint-ignore no-explicit-any
export function assertAsyncIterable<T = any>(
  test: unknown,
  label: string,
): void {
  if (isAsyncIterable<T>(test) !== true) {
    throw new TypeError(
      `\`${label}\` must implement \`Symbol.asyncIterator\`.`,
    );
  }
}

// // deno-lint-ignore no-explicit-any
// export function equalsEntries(a: any, b: any): boolean {
//   const aType = (typeof a);
//   if (aType !== (typeof b)) {
//     return false;
//   }
//   if (aType !== "object") {
//     return false;
//   }

//   const aEntries = Object.entries(a);
//   const bEntries = Object.entries(b);

//   if (aEntries.length !== bEntries.length) {
//     return false;
//   }

//   //XXX 循環参照検出
// }
