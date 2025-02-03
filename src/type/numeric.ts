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

//XXX isPositiveFiniteNumeric, ...
