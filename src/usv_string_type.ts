import { isString } from "./string_type.ts";

export function isUsvString(test: unknown): test is string {
  return isString(test) && test.isWellFormed();
}

export function isNonEmpty(test: unknown): test is string {
  return isUsvString(test) && (test.length > 0);
}

export function assertUsvString(test: unknown, label: string): void {
  if (isUsvString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`USVString\`.`);
  }
}

export function assertNonEmpty(test: unknown, label: string): void {
  if (isNonEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty \`USVString\`.`);
  }
}
