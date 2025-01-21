import { isChar, isEmptyString, isNonEmptyString, isString } from "./type.ts";

export function string(test: unknown, label: string): void {
  if (isString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}

export function emptyString(test: unknown, label: string): void {
  if (isEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be an empty string.`);
  }
}

export function nonEmptyString(test: unknown, label: string): void {
  if (isNonEmptyString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty string.`);
  }
}

export function char(test: unknown, label: string): void {
  if (isChar(test) !== true) {
    throw new TypeError(`\`${label}\` must be an UTF-16 code unit.`);
  }
}
