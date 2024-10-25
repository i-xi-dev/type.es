export function isObject(test: unknown): test is object {
  return (typeof test === "object");
}

export function isNonNull(test: unknown): test is NonNullable<object> {
  return (isObject(test) && (test !== null));
}

// deno-lint-ignore no-explicit-any
export function isIterable<T = any>(test: unknown): test is Iterable<T> {
  return isNonNull(test) && (Symbol.iterator in test);
}

// deno-lint-ignore no-explicit-any
export function isAsyncIterable<T = any>(
  test: unknown,
): test is AsyncIterable<T> {
  return isNonNull(test) && (Symbol.asyncIterator in test);
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

//   //TODO 循環参照検出
// }
