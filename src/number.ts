export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isSafeInteger(test: unknown): test is number {
  return Number.isSafeInteger(test);
}

export function assertNumber(test: unknown, label: string): void {
  if (isNumber(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\`.`);
  }
}

export function assertSafeInteger(test: unknown, label: string): void {
  if (Number.isSafeInteger(test) !== true) {
    throw new TypeError(`\`${label}\` must be a safe integer.`);
  }
}
