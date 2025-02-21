import { type char } from "../type.ts";
import { type rune, type usvstring } from "../_typedef/mod.ts";

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function assertString(test: unknown, label: string): void {
  if (isString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}

export function isEmptyString(test: unknown): test is string {
  return isString(test) && (test.length === 0);
}

export function assertEmptyString(test: unknown, label: string): void {
  if (isEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be an empty string.`);
  }
}

export function isNonEmptyString(test: unknown): test is string {
  return isString(test) && (test.length > 0);
}

export function assertNonEmptyString(test: unknown, label: string): void {
  if (isNonEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty string.`);
  }
}

export function isChar(test: unknown): test is char {
  return isString(test) && (test.length === 1);
}

export function assertChar(test: unknown, label: string): void {
  if (isChar(test) !== true) {
    throw new TypeError(`\`${label}\` must be an UTF-16 code unit.`);
  }
}

export function isRune(test: unknown): test is rune {
  return isString(test) && (test.length <= 2) && ([...test].length === 1) &&
    test.isWellFormed();
}

export function assertRune(test: unknown, label: string): void {
  if (isRune(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a string representing a single code point.`,
    );
  }
}

export function isUSVString(test: unknown): test is usvstring {
  return isString(test) && test.isWellFormed();
}

export function assertUSVString(test: unknown, label: string): void {
  if (isUSVString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`USVString\`.`);
  }
}

export function isNonEmptyUSVString(test: unknown): test is usvstring {
  return isUSVString(test) && (test.length > 0);
}

export function assertNonEmptyUSVString(test: unknown, label: string): void {
  if (isNonEmptyUSVString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty \`USVString\`.`);
  }
}
