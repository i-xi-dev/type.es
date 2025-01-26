export function isBoolean(test: unknown): test is boolean {
  return (typeof test === "boolean");
}

export function assertBoolean(test: unknown, label: string): void {
  if (isBoolean(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`boolean\`.`);
  }
}

export function isTrue(test: unknown): test is true {
  return (test === true);
}

export function assertTrue(test: unknown, label: string): void {
  if (isTrue(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`true\`.`);
  }
}

export function isFalse(test: unknown): test is false {
  return (test === false);
}

export function assertFalse(test: unknown, label: string): void {
  if (isFalse(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`false\`.`);
  }
}
