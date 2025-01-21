import { type char } from "../_.ts";

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function isEmptyString(test: unknown): test is string {
  return isString(test) && (test.length === 0);
}

export function isNonEmptyString(test: unknown): test is string {
  return isString(test) && (test.length > 0);
}

export function isChar(test: unknown): test is char {
  return isString(test) && (test.length === 1);
}
