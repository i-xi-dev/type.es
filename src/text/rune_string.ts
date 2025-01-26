import { assert as assertCodePoint } from "./code_point.ts";
import { assertString, isString } from "../type/string.ts";
import { EMPTY } from "../basics/string_type.ts";
import { assertIterable as assertIterableObject } from "../basics/object_type.ts";
import { codepoint, int, rune, script, usvstring } from "../_.ts";
import { Rune } from "./mod.ts";
import { Script } from "../i18n/script.ts";

export function is(test: unknown): test is usvstring {
  return isString(test) && test.isWellFormed();
}

export function isNonEmpty(test: unknown): test is usvstring {
  return is(test) && (test.length > 0);
}

export function assert(test: unknown, label: string): void {
  if (is(test) !== true) {
    throw new TypeError(`\`${label}\` must be a \`USVString\`.`);
  }
}

export function assertNonEmpty(test: unknown, label: string): void {
  if (isNonEmpty(test) !== true) {
    throw new TypeError(`\`${label}\` must be a non-empty \`USVString\`.`);
  }
}

export type AllowMalformedOptions = {
  allowMalformed?: boolean;
};

export function runeCountOf(
  value: usvstring,
  options?: AllowMalformedOptions,
): int {
  if (options?.allowMalformed === true) {
    assertString(value, "value");
  } else {
    assert(value, "value");
  }
  return [...value].length;
}

//XXX fromSubstrings
//XXX fromSubstringsAsync

//XXX fromRunes
//XXX fromRunesAsync

export function toRunes(
  value: usvstring,
  options?: AllowMalformedOptions,
): IterableIterator<rune, void, void> {
  if (options?.allowMalformed === true) {
    assertString(value, "value");
  } else {
    assert(value, "value");
  }

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune;
    }
  })(value);
}

export function fromCodePoints(
  value: Iterable<codepoint>,
  options?: AllowMalformedOptions,
): string {
  assertIterableObject(value, "value");

  const disallowMalformed = options?.allowMalformed !== true;

  let runes = EMPTY;
  let rune: rune;
  let i = 0;
  for (const codePoint of value) {
    assertCodePoint(codePoint, `value[${i}]`);
    rune = String.fromCodePoint(codePoint);

    if (disallowMalformed && (rune.isWellFormed() !== true)) {
      throw new RangeError(
        "`value` must not contain lone surrogate code points.",
      );
    }
    runes += rune;
    i++;
  }

  return runes;
}

//XXX fromCodePointsAsync(value: AsyncIterable<codepoint>): Promise<string>

export function toCodePoints(
  value: string,
  options?: AllowMalformedOptions,
): IterableIterator<codepoint, void, void> {
  if (options?.allowMalformed === true) {
    assertString(value, "value");
  } else {
    assert(value, "value");
  }

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune.codePointAt(0)!;
    }
  })(value);
}

export type BelongsToScriptsOptions = {
  excludeCommon?: boolean;
  excludeInherited?: boolean;
  checkScx?: boolean;
  //TODO okとみなすrune配列オプション
  //XXX 1つめのruneのscがInheritまたはgcがMe|Mnの場合 okにするか否か
};

//TODO
export function belongsToScripts(
  test: unknown,
  scripts: script[],
  options?: BelongsToScriptsOptions,
): test is usvstring {
  let scriptSet: script[];
  if (Array.isArray(scripts) && (scripts.length > 0)) {
    scriptSet = [...new Set(scripts)];
    for (const script of scriptSet) {
      Script.assertUnicodePropertyValue(script, script);
    }
  } else {
    throw new TypeError("`scripts` must be an Array of script.");
  }

  if (is(test) !== true) {
    return false;
  }

  if (test.length <= 0) {
    // Array#every等に合わせた
    return true;
  }

  const orSc = [];
  const orScx = [];
  for (const script of scriptSet) {
    orSc.push(`\\p{sc=${script}}`);
    orScx.push(`\\p{scx=${script}}`);
  }
  const specifiedScRegex = new RegExp(`^(?:${orSc.join("|")})$`, "v");
  const specifiedScxRegex = new RegExp(`^(?:${orScx.join("|")})$`, "v");
  const inheritedScRegex = new RegExp(
    `^(?:\\p{sc=Zinh}|\\p{gc=Me}|\\p{gc=Mn})$`,
    "v",
  );

  let runeCount = 0;
  for (const rune of [...test]) {
    runeCount += 1;

    if (specifiedScRegex.test(rune)) {
      // scがscriptsのいずれかに一致: ok
      continue;
    }

    if (options?.excludeCommon !== true) {
      if (Rune.matchesCommonScript(rune)) {
        // scがCommon: ok
        if ((options?.checkScx === true) && specifiedScxRegex.test(rune)) {
          continue;
        } else {
          continue;
        }
      }
    }

    if (options?.excludeInherited !== true) {
      if ((runeCount > 1) && inheritedScRegex.test(rune)) {
        // scがInherited or gcがMe|Mn: ok
        if ((options?.checkScx === true) && specifiedScxRegex.test(rune)) {
          continue;
        } else {
          continue;
        }
      }
    }

    return false;
  }

  return false;
}
