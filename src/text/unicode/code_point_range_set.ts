// import * as Rune from "../rune/mod.ts";
// import * as Type from "../../type/mod.ts";
// import { _PropertyValueSetBase } from "./_propval_set_base.ts";
// import { SafeIntRangeSet } from "../../numerics/mod.ts";
// import {type ArrayOrSet,
//   type codepoint,
//   type rune,
//   type safeintrange,
// } from "../../_typedef/mod.ts";

// export class CodePointRangeSet
//   extends _PropertyValueSetBase<safeintrange<codepoint>> {
//   #rangeSet: SafeIntRangeSet<codepoint>;

//   includesRune(rune: rune): boolean {
//     Type.assertRune(rune, "rune");

//     const codePoint = Rune.toCodePoint(rune);
//     return this.includesCodePoint(codePoint);
//   }

//   includesCodePoint(codePoint: codepoint): boolean {
//     Type.assertCodePoint(codePoint, "codePoint");

//     return this.#rangeSet.includesValue(codePoint);
//   }

//     unionWith(other: this | ArrayOrSet<safeintrange<codepoint>>): this {
//       let otherPlanes: Set<codeplane>;
//       if (other instanceof CodePlaneSet) {
//         otherPlanes = new Set(other.toArray());
//       } else {
//         otherPlanes = _toCodePlaneSet(other);
//       }

//       const unionedPlanes = otherPlanes.union(this);
//       return Reflect.construct(this.constructor, [unionedPlanes]);
//     }
// }
