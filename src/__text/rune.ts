import * as Type from "../type/mod.ts";
import { type rune } from "../_typedef/mod.ts";

let _commonSc: WeakRef<RegExp> | null = null;

export function matchesCommonScript(test: unknown): test is rune {
  let commonSc = _commonSc?.deref();
  if (!commonSc) {
    commonSc = new RegExp(`^\\p{sc=Zyyy}$`, "v");
    _commonSc = new WeakRef(commonSc);
  }
  return Type.isRune(test) && commonSc.test(test);
}

let _inheritedSc: WeakRef<RegExp> | null = null;

export function matchesInheritedScript(test: unknown): test is rune {
  let inheritedSc = _inheritedSc?.deref();
  if (!inheritedSc) {
    inheritedSc = new RegExp(`^(?:\\p{sc=Zinh})$`, "v");
    _inheritedSc = new WeakRef(inheritedSc);
  }
  return Type.isRune(test) && inheritedSc.test(test);
}
