import { type numeric } from "../type.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export function isNumeric(test: unknown): test is numeric {
  return (typeof test === "number") || (typeof test === "bigint");
}

export function assertNumeric(test: unknown, label: string): void {
  if (isNumeric(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`number\` or a \`bigint\`.`);
  }
}

export function isPositiveNumeric(test: unknown): test is numeric {
  return isNumeric(test) && (test > NUMBER_ZERO);
}

export function assertPositiveNumeric(test: unknown, label: string): void {
  if (isPositiveNumeric(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a positive \`number\` or a positive \`bigint\`.`,
    );
  }
}

export function isNonNegativeNumeric(test: unknown): test is numeric {
  return isNumeric(test) && (test >= NUMBER_ZERO);
}

export function assertNonNegativeNumeric(test: unknown, label: string): void {
  if (isNonNegativeNumeric(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a non-negative \`number\` or a non-negative \`bigint\`.`,
    );
  }
}

export function isNonPositiveNumeric(test: unknown): test is numeric {
  return isNumeric(test) && (test <= NUMBER_ZERO);
}

export function assertNonPositiveNumeric(test: unknown, label: string): void {
  if (isNonPositiveNumeric(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a non-positive \`number\` or a non-positive \`bigint\`.`,
    );
  }
}

export function isNegativeNumeric(test: unknown): test is numeric {
  return isNumeric(test) && (test < NUMBER_ZERO);
}

export function assertNegativeNumeric(test: unknown, label: string): void {
  if (isNegativeNumeric(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be a negative \`number\` or a negative \`bigint\`.`,
    );
  }
}

//XXX isPositiveFiniteNumeric, ...
