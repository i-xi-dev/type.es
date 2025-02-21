import * as ExNumber from "../numerics/number/mod.ts";
import * as Type from "../type/mod.ts";
import {
  type codepoint,
  type rune,
  type safeint,
  type script,
  type usvstring,
} from "../type.ts";
import { EMPTY as EMPTY_STRING } from "../_const/string.ts";
import { Rune } from "./mod.ts";

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
  Type.assertIterable(value, "value");

  const disallowMalformed = options?.allowMalformed !== true;

  let runes = EMPTY_STRING;
  let rune: rune;
  let i = ExNumber.ZERO;
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

  return (function* (s) {
    for (const rune of [...s]) {
      yield rune.codePointAt(ExNumber.ZERO)!;
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
  if (Array.isArray(scripts) && (scripts.length > ExNumber.ZERO)) {
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

  if (test.length <= ExNumber.ZERO) {
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

  let runeCount = ExNumber.ZERO;
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
