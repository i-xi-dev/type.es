export function isObject(test: unknown): test is object | null {
  return (typeof test === "object");
}

export function assertObject(test: unknown, label: string): void {
  if (isObject(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Object\`.`);
  }
}

export function isNonNullObject(test: unknown): test is NonNullable<object> {
  return (isObject(test) && (test !== null));
  // is()によってundefinedは弾かれる。よってisNonNull(undefined)はfalseとなる
}

export function assertNonNullObject(test: unknown, label: string): void {
  if (isNonNullObject(test) !== true) {
    throw new TypeError(`\`${label}\` must be an \`Object\` except \`null\`.`);
  }
}

export function isNull(test: unknown): test is null {
  return (test === null);
}

export function assertNull(test: unknown, label: string): void {
  if (isNull(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`null\`.`);
  }
}

export function isNullOrUndefined(test: unknown): test is null | undefined {
  return (test === null) || (test === undefined);
}

export function assertNullOrUndefined(test: unknown, label: string): void {
  if (isNullOrUndefined(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`null\` or an \`undefined\`.`);
  }
}
