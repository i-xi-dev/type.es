import { assertStrictEquals, assertThrows } from "@std/assert";
import { xText } from "../../mod.ts";

// Deno.test("Rune.isInScript()", () => {
//   const opEx = { excludeScx: true } as const;

//   assertStrictEquals(Rune.isInScript("ア", "Kana"), true);
//   assertStrictEquals(Rune.isInScript("ア", "Hira"), false);
//   //assertStrictEquals(Rune.isInScript("ア", "Kana", opEx), true);
//   //assertStrictEquals(Rune.isInScript("ア", "Hira", opEx), false);

//   assertStrictEquals(Rune.isInScript("あ", "Kana"), false);
//   assertStrictEquals(Rune.isInScript("あ", "Hira"), true);
//   //assertStrictEquals(Rune.isInScript("あ", "Kana", opEx), false);
//   //assertStrictEquals(Rune.isInScript("あ", "Hira", opEx), true);

//   assertStrictEquals(Rune.isInScript("ー", "Kana"), true);
//   assertStrictEquals(Rune.isInScript("ー", "Hira"), true);
//   //assertStrictEquals(Rune.isInScript("ー","Kana", opEx), false);
//   //assertStrictEquals(Rune.isInScript("ー","Hira", opEx), false);

//   // "か\u3099"
//   assertStrictEquals(Rune.isInScript("\u3099", "Kana"), true);
//   assertStrictEquals(Rune.isInScript("\u3099", "Hira"), true);

//   // "カ\u3099"

//   // assertThrows(
//   //   () => {
//   //     Rune.isInScript("", "Latn");
//   //   },
//   //   RangeError,
//   //   "xxx.",
//   // );
//   assertStrictEquals(Rune.isInScript("", "Latn"), false);

//   assertStrictEquals(Rune.isInScript("a", "Latn"), true);
//   //assertStrictEquals(Rune.isInScript("a","Latn", opEx), true);
//   //assertStrictEquals(Rune.isInScript("a",["Latn", "Zyyy"], opEx), true);

//   // assertThrows(
//   //   () => {
//   //     Rune.isInScript("aa", "Latn");
//   //   },
//   //   RangeError,
//   //   "xxx.",
//   // );
//   assertStrictEquals(Rune.isInScript("aa", "Latn"), false);

//   assertThrows(
//     () => {
//       Rune.isInScript("a", "Zsym");
//     },
//     RangeError,
//     "`Zsym` is not supported in Unicode property.",
//   );
// });
