import * as Type from "../type/mod.ts";
import { type script, type usvstring } from "../_typedef/mod.ts";
import { Rune } from "./mod.ts";

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
