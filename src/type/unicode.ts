import _gcs from "../../dat/unicode/gc_map.ts";
import _scripts from "../../dat/i18n/script_map.json" with { type: "json" };
import { type gc, type rune, type script } from "../type.ts";
import { isNonEmptyString, isRune } from "../type/string.ts";

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

const _PVA_INDEX = 1;

export function isUnicodeScript(test: unknown): test is script {
  if (isNonEmptyString(test)) {
    const info = _scripts[test as script];
    return info ? isNonEmptyString(info[_PVA_INDEX]) : false;
  }
  return false;
}

export function assertUnicodeScript(test: unknown, label: string): void {
  if (isUnicodeScript(test) !== true) {
    throw new TypeError(
      `\`${label}\` is not supported script in Unicode property.`,
    );
  }
}

export function isRuneInGeneralCategory(
  test: unknown,
  category: gc,
): test is rune {
  assertUnicodeGeneralCategory(category, "category");
  return isRune(test) && (new RegExp(`^\\p{gc=${category}}$`, "v")).test(test);
}

export function assertRuneInGeneralCategory(
  test: unknown,
  label: string,
  category: gc,
): void {
  if (isRuneInGeneralCategory(test, category) !== true) {
    throw new TypeError(
      `\`${label}\` is not rune in the \`${category}\` General_Category.`,
    );
  }
}

export type RuneInScriptOptions = {
  excludeScx?: boolean;
};

export function isRuneInScript(
  test: unknown,
  script: script,
  options?: RuneInScriptOptions,
): test is rune {
  assertUnicodeScript(script, script);

  const or = [];
  or.push(`\\p{sc=${script}}`);
  if (options?.excludeScx !== true) {
    or.push(`\\p{scx=${script}}`);
  }
  const pattern = or.join("|");

  return isRune(test) && (new RegExp(`^(?:${pattern})$`, "v")).test(test);
}

export function assertRuneInScript(
  test: unknown,
  label: string,
  script: script,
  options?: RuneInScriptOptions,
): void {
  if (isRuneInScript(test, script, options) !== true) {
    throw new TypeError(
      `\`${label}\` is not rune in the \`${script}\` Script.`,
    );
  }
}
