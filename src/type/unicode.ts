import { GeneralCategory, Plane } from "../const/unicode.ts";
import { isSafeIntegerInRange } from "../type/number.ts";
import { type plane } from "../type.ts";

export function isUnicodePlane(test: unknown): test is plane {
  return isSafeIntegerInRange(test, Plane.BMP, Plane.SPUA_B);
}

export function assertUnicodePlane(test: unknown, label: string): void {
  if (isUnicodePlane(test) !== true) {
    throw new TypeError(`\`${label}\` must be an Unicode plane value.`);
  }
}

export function isUnicodeGeneralCategory(
  test: unknown,
): test is GeneralCategory {
  return Object.values(GeneralCategory).includes(test as GeneralCategory);
}

export function assertUnicodeGeneralCategory(
  test: unknown,
  label: string,
): void {
  if (isUnicodeGeneralCategory(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be an Unicode \`General_Category\` value.`,
    );
  }
}
