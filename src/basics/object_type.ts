import { isNonNullObject } from "../type/object.ts";

// deno-lint-ignore no-explicit-any
export function isIterable<T = any>(test: unknown): test is Iterable<T> {
  return isNonNullObject(test) && (Symbol.iterator in test);
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
  return isNonNullObject(test) && (Symbol.asyncIterator in test);
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
