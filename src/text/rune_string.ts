import { assert as assertCodePoint } from "./code_point.ts";
import { assertIterable as assertIterableObject } from "../basics/object_type.ts";
import { codepoint, int, rune, usvstring } from "../_.ts";
import {
  assert as assertString,
  EMPTY,
  is as isString,
} from "../basics/string_type.ts";

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

//TODO
// export type ScriptOptions = {
//   inherited?: script;
// };

// export function isInScript(
//   test: unknown,
//   script: script,
//   options?: ScriptOptions,
// ): test is rune {
//   Script.assert(script, "script");
//   _assertScriptHasPva(script);

//   if (is(test) !== true) {
//     return false;
//   }

//   let tester = new RegExp(`^\\p{sc=${script}}*$`, "v");
//   if (tester.test(test)) {
//     // sc一致 → ok
//     return true;
//   }

//   tester = new RegExp(`^\\p{sc=Zyyy}*$`, "v");
//   if (tester.test(test)) {
//     // scがCommonの場合

//     tester = new RegExp(`^\\p{scx=${script}}*$`, "v");
//     if (tester.test(test)) {
//       // scx一致 → ok
//       return true;
//     }
//     //else if () {
//     //  // testがoptions?.「一致とみなすruneリスト」のいずれかに合致 → ok
//     //  return false;//TODO
//     //}
//     return false;
//   }

//   tester = new RegExp(`^(?:\\p{sc=Zinh}|\\p{gc=Me}|\\p{gc=Mn})*$`, "v");
//   if (tester.test(test)) {
//     // scがInheritの場合 or gcがMe|Mnの場合

//     tester = new RegExp(`^\\p{scx=${script}}*$`, "v");
//     if (tester.test(test)) {
//       // scx一致 → ok
//       return true;
//     }

//     if (Script.is(options?.inherited)) {
//       _assertScriptHasPva(options.inherited);
//       tester = new RegExp(`^\\p{scx=${options.inherited}}*$`, "v");
//       if (tester.test(test)) {
//         // scxがoptions.inheritedに一致 → ok
//         return true;
//       }
//     }

//     //else if () {
//     //  // testがoptions?.「一致とみなすruneリスト」のいずれかに合致 → ok
//     //  return false;//TODO
//     //}
//   }

//   return false;
// }
