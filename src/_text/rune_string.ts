import { assertCodePoint } from "../type/code_point.ts";
import { assertIterable } from "../type/iterable.ts";
import { assertString, assertUSVString, isUSVString } from "../type/string.ts";
import {
  type codepoint,
  type rune,
  type safeint,
  type script,
  type usvstring,
} from "../type.ts";
import { EMPTY as EMPTY_STRING } from "../const/string.ts";
import { Rune } from "./mod.ts";
import { Script } from "../i18n/script.ts";
import { ZERO as NUMBER_ZERO } from "../const/number.ts";

export type AllowMalformedOptions = {
  allowMalformed?: boolean;
};

export function runeCountOf(
  value: usvstring,
  options?: AllowMalformedOptions,
): safeint {
  if (options?.allowMalformed === true) {
    assertString(value, "value");
  } else {
    assertUSVString(value, "value");
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
    assertUSVString(value, "value");
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
  assertIterable(value, "value");

  const disallowMalformed = options?.allowMalformed !== true;

  let runes = EMPTY_STRING;
  let rune: rune;
  let i = NUMBER_ZERO;
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
    assertUSVString(value, "value");
  }

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune.codePointAt(NUMBER_ZERO)!;
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
  if (Array.isArray(scripts) && (scripts.length > NUMBER_ZERO)) {
    scriptSet = [...new Set(scripts)];
    for (const script of scriptSet) {
      Script.assertUnicodePropertyValue(script, script);
    }
  } else {
    throw new TypeError("`scripts` must be an Array of script.");
  }

  if (isUSVString(test) !== true) {
    return false;
  }

  if (test.length <= NUMBER_ZERO) {
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

  let runeCount = NUMBER_ZERO;
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
