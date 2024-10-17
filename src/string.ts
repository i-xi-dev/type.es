export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function isChar(test: unknown): test is string {
  return isString(test) && (test.length === 1);
}

export function isRune(test: unknown): test is string {
  return isString(test) && (test.length <= 2) && ([...test].length === 1) &&
    test.isWellFormed();
}

export function assertString(test: unknown, label: string): void {
  if (isString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}

export function assertChar(test: unknown, label: string): void {
  if (isChar(test) !== true) {
    throw new TypeError(`\`${label}\` must be a UTF-16 code unit.`);
  }
}

export function assertRune(test: unknown, label: string): void {
  if (isRune(test) !== true) {
    throw new TypeError(`\`${label}\` must be a Unicode scalar value.`);
  }
}
