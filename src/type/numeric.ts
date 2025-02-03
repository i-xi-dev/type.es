export function isNumeric(test: unknown): test is number | bigint {
  return (typeof test === "number") || (typeof test === "bigint");
}

export function assertNumeric(test: unknown, label: string): void {
  if (isNumeric(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\` or a \`bigint\`.`);
  }
}

export function isPositiveNumeric(test: unknown): test is number | bigint {
  return isNumeric(test) && (test > 0);
}

export function assertPositiveNumeric(test: unknown, label: string): void {
  if (isPositiveNumeric(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a positive \`number\` or a positive \`bigint\`.`,
    );
  }
}

export function isNonNegativeNumeric(test: unknown): test is number | bigint {
  return isNumeric(test) && (test >= 0);
}

export function assertNonNegativeNumeric(test: unknown, label: string): void {
  if (isNonNegativeNumeric(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a non-negative \`number\` or a non-negative \`bigint\`.`,
    );
  }
}

export function isNonPositiveNumeric(test: unknown): test is number | bigint {
  return isNumeric(test) && (test <= 0);
}

export function assertNonPositiveNumeric(test: unknown, label: string): void {
  if (isNonPositiveNumeric(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a non-positive \`number\` or a non-positive \`bigint\`.`,
    );
  }
}

//XXX isPositiveFiniteNumeric, ...
