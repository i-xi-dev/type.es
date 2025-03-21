import * as Type from "../type/mod.ts";
import {
  type codepoint,
  type rune,
  type script,
  type usvstring,
} from "../_typedef/mod.ts";
import { EMPTY as EMPTY_STRING } from "../_const/string.ts";
import { Rune } from "./mod.ts";
import { type safeint } from "../_typedef/mod.ts";

export type AllowMalformedOptions = {
  allowMalformed?: boolean;
};

export function runeCountOf(
  value: usvstring,
  options?: AllowMalformedOptions,
): safeint {
  if (options?.allowMalformed === true) {
    Type.assertString(value, "value");
  } else {
    Type.assertUSVString(value, "value");
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
    Type.assertString(value, "value");
  } else {
    Type.assertUSVString(value, "value");
  }

  return (function* (runes) {
    for (const rune of runes) {
      yield rune;
    }
  })(value);
}

export function fromCodePoints(
  value: Iterable<codepoint>,
  options?: AllowMalformedOptions,
): string {
  Type.assertIterable(value, "value");

  const disallowMalformed = options?.allowMalformed !== true;

  let runes = EMPTY_STRING;
  let rune: rune;
  let i = 0;
  for (const codePoint of value) {
    Type.assertCodePoint(codePoint, `value[${i}]`);
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
    Type.assertString(value, "value");
  } else {
    Type.assertUSVString(value, "value");
  }

  return (function* (runes) {
    for (const rune of runes) {
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

//TODO ScriptSetにふくめる
export function belongsToScripts(
  test: unknown,
  scripts: script[],
  options?: BelongsToScriptsOptions,
): test is usvstring {
  let scriptSet: script[];
  if (Array.isArray(scripts) && (scripts.length > 0)) {
    scriptSet = [...new Set(scripts)];
    for (const script of scriptSet) {
      Type.assertUnicodeScript(script, script);
    }
  } else {
    throw new TypeError("`scripts` must be an Array of script.");
  }

  if (Type.isUSVString(test) !== true) {
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
  for (const rune of test) {
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
