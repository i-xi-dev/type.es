export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function assertString(test: unknown, label: string): void {
  if (isString(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`string\`.`);
  }
}
