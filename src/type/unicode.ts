import _gcs from "../../dat/unicode/gc_map.ts";
import { type gc } from "../type.ts";

export function isUnicodeGeneralCategory(test: unknown): test is gc {
  return Object.values(_gcs).includes(test as gc);
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
