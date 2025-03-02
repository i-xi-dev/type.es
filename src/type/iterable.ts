import { isNonNullObject } from "./object.ts";

// deno-lint-ignore no-explicit-any
export function isIterable<T = any>(test: unknown): test is Iterable<T> { //XXX stringがfalseなので命名が良くない
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
