import * as Type from "../type/mod.ts";
import { type ArrayOrSet } from "../type.ts";
import { EMPTY as EMPTY_STRING } from "../const/string.ts";

type _IsT<T> = (i: unknown) => i is T;

//TODO プロパティの命名
type _AssertOptions<T> = {
  isT: _IsT<T>;
  elementDesc: string;
};

export function isArray<T>(test: unknown, isT?: _IsT<T>): test is Array<T> {
  if (Array.isArray(test)) {
    if (typeof isT === "function") {
      return test.every((i) => isT(i));
    } else {
      return true;
    }
  }

  return false;
}

export function assertArray<T>(
  test: unknown,
  label: string,
  options?: _AssertOptions<T>,
): void {
  if (isArray(test, options?.isT) !== true) {
    const elementDesc = Type.isNonEmptyString(options?.elementDesc)
      ? ` of ${options?.elementDesc}`
      : EMPTY_STRING;
    throw new TypeError(
      `\`${label}\` must be an \`Array\`${elementDesc}.`,
    );
  }
}

export function isSet<T>(test: unknown, isT?: _IsT<T>): test is Set<T> {
  if (test instanceof Set) {
    if (typeof isT === "function") {
      return [...test].every((i) => isT(i));
    } else {
      return true;
    }
  }

  return false;
}

export function assertSet<T>(
  test: unknown,
  label: string,
  options?: _AssertOptions<T>,
): void {
  if (isSet(test, options?.isT) !== true) {
    const elementDesc = Type.isNonEmptyString(options?.elementDesc)
      ? ` of ${options?.elementDesc}`
      : EMPTY_STRING;
    throw new TypeError(`\`${label}\` must be a \`Set\`${elementDesc}.`);
  }
}

export function isArrayOrSet<T>(
  test: unknown,
  isT?: _IsT<T>,
): test is ArrayOrSet<T> {
  if (Array.isArray(test)) {
    return isArray(test, isT);
  }
  return isSet(test, isT);
}

export function assertArrayOrSet<T>(
  test: unknown,
  label: string,
  options?: _AssertOptions<T>,
): void {
  if (isArrayOrSet(test, options?.isT) !== true) {
    const elementDesc = Type.isNonEmptyString(options?.elementDesc)
      ? ` of ${options?.elementDesc}`
      : EMPTY_STRING;
    throw new TypeError(
      `\`${label}\` must be an \`Array\`${elementDesc} or a \`Set\`${elementDesc}.`,
    );
  }
}

//XXX
// isArrayLike
// isSetLike
// ...
