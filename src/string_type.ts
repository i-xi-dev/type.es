export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function isEmpty(test: unknown): test is string {
  return isString(test) && (test.length === 0);
}

export function isNonEmpty(test: unknown): test is string {
  return isString(test) && (test.length > 0);
}

export function assertString(test: unknown, label: string): void {
  if (isString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}

export function assertEmpty(test: unknown, label: string): void {
  if (isEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be an empty string.`);
  }
}

export function assertNonEmpty(test: unknown, label: string): void {
  if (isNonEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty string.`);
  }
}
