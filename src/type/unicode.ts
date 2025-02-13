import { GeneralCategory } from "../const/unicode.ts";

export function isGeneralCategory(test: unknown): test is GeneralCategory {
  return Object.values(GeneralCategory).includes(test as GeneralCategory);
}

export function assertGeneralCategory(test: unknown, label: string): void {
  if (isGeneralCategory(test) !== true) {
    throw new TypeError(
      `\`${label}\` must be an Unicode \`General_Category\` value.`,
    );
  }
}
