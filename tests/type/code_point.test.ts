import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Type } from "../../mod.ts";

Deno.test("Type.isCodePoint()", () => {
  assertStrictEquals(Type.isCodePoint(-1), false);
  assertStrictEquals(Type.isCodePoint(-0), true);
  assertStrictEquals(Type.isCodePoint(0), true);
  assertStrictEquals(Type.isCodePoint(63), true);
  assertStrictEquals(Type.isCodePoint(64), true);
  assertStrictEquals(Type.isCodePoint(127), true);
  assertStrictEquals(Type.isCodePoint(128), true);
  assertStrictEquals(Type.isCodePoint(255), true);
  assertStrictEquals(Type.isCodePoint(256), true);
  assertStrictEquals(Type.isCodePoint(65535), true);
  assertStrictEquals(Type.isCodePoint(65536), true);
  assertStrictEquals(Type.isCodePoint(0x10FFFF), true);
  assertStrictEquals(Type.isCodePoint(0x110000), false);
  assertStrictEquals(Type.isCodePoint(0xFFFFFFFF), false);
  assertStrictEquals(Type.isCodePoint(0x100000000), false);
  assertStrictEquals(Type.isCodePoint(0.1), false);

  assertStrictEquals(Type.isCodePoint("0"), false);
  assertStrictEquals(Type.isCodePoint("255"), false);
  assertStrictEquals(Type.isCodePoint(true), false);
  assertStrictEquals(Type.isCodePoint({}), false);
  assertStrictEquals(Type.isCodePoint([]), false);
  assertStrictEquals(Type.isCodePoint([0]), false);
  assertStrictEquals(Type.isCodePoint(undefined), false);
  assertStrictEquals(Type.isCodePoint(null), false);
});

Deno.test("Type.assertCodePoint()", () => {
  try {
    Type.assertCodePoint(-0, "test-1");
    Type.assertCodePoint(0, "test-1");
    Type.assertCodePoint(0x10FFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertCodePoint(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertCodePoint(0x110000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertCodePoint(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isHighSurrogateCodePoint()", () => {
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xD7FF), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xD800), true);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xDBFF), true);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xDC00), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xDFFF), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0xE000), false);

  assertStrictEquals(Type.isHighSurrogateCodePoint(-1), false);
  assertStrictEquals(Type.isHighSurrogateCodePoint(0x110000), false);
});

Deno.test("Type.assertHighSurrogateCodePoint()", () => {
  try {
    Type.assertHighSurrogateCodePoint(0xD800, "test-1");
    Type.assertHighSurrogateCodePoint(0xDBFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertHighSurrogateCodePoint(0xDC00, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertHighSurrogateCodePoint(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertHighSurrogateCodePoint(0x110000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertHighSurrogateCodePoint(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isLowSurrogateCodePoint()", () => {
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xD7FF), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xD800), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xDBFF), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xDC00), true);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xDFFF), true);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0xE000), false);

  assertStrictEquals(Type.isLowSurrogateCodePoint(-1), false);
  assertStrictEquals(Type.isLowSurrogateCodePoint(0x110000), false);
});

Deno.test("Type.assertLowSurrogateCodePoint()", () => {
  try {
    Type.assertLowSurrogateCodePoint(0xDC00, "test-1");
    Type.assertLowSurrogateCodePoint(0xDFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertLowSurrogateCodePoint(0xD800, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertLowSurrogateCodePoint(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertLowSurrogateCodePoint(0x110000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertLowSurrogateCodePoint(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isSurrogateCodePoint()", () => {
  assertStrictEquals(Type.isSurrogateCodePoint(0xD7FF), false);
  assertStrictEquals(Type.isSurrogateCodePoint(0xD800), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xDBFF), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xDC00), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xDFFF), true);
  assertStrictEquals(Type.isSurrogateCodePoint(0xE000), false);

  assertStrictEquals(Type.isSurrogateCodePoint(-1), false);
  assertStrictEquals(Type.isSurrogateCodePoint(0x110000), false);
});

Deno.test("Type.assertSurrogateCodePoint()", () => {
  try {
    Type.assertSurrogateCodePoint(0xDC00, "test-1");
    Type.assertSurrogateCodePoint(0xDFFF, "test-1");
    Type.assertSurrogateCodePoint(0xD800, "test-1");
    Type.assertSurrogateCodePoint(0xDBFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertSurrogateCodePoint(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertSurrogateCodePoint(0x110000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertSurrogateCodePoint(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isVariationSelectorCodePoint()", () => {
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xFDFF), false);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xFE00), true);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xFE0F), true);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xFE10), false);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xE00FF), false);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xE0100), true);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xE01EF), true);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0xE01F0), false);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0x180A), false);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0x180B), true);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0x180F), true);
  assertStrictEquals(Type.isVariationSelectorCodePoint(0x1810), false);
});

Deno.test("Type.assertVariationSelectorCodePoint()", () => {
  try {
    Type.assertVariationSelectorCodePoint(0xFE00, "test-1");
    Type.assertVariationSelectorCodePoint(0xFE0F, "test-1");
    Type.assertVariationSelectorCodePoint(0xE0100, "test-1");
    Type.assertVariationSelectorCodePoint(0xE01EF, "test-1");
    Type.assertVariationSelectorCodePoint(0x180B, "test-1");
    Type.assertVariationSelectorCodePoint(0x180F, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertVariationSelectorCodePoint(0xFDFF, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertVariationSelectorCodePoint(0xE01F0, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertVariationSelectorCodePoint(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Type.isCodePointInRange()", () => {
  assertStrictEquals(Type.isCodePointInRange(0, 0, 10), true);
  assertStrictEquals(Type.isCodePointInRange(10, 0, 10), true);
  assertStrictEquals(Type.isCodePointInRange(9, 10, 11), false);
  assertStrictEquals(Type.isCodePointInRange(12, 10, 11), false);
  assertStrictEquals(
    Type.isCodePointInRange(0x10FFFF, 0x10FFF0, 0x10FFFF),
    true,
  );
  assertStrictEquals(
    Type.isCodePointInRange(0x10FFF0, 0x10FFF0, 0x10FFFF),
    true,
  );
  assertStrictEquals(
    Type.isCodePointInRange(0x10FFEF, 0x10FFF0, 0x10FFFF),
    false,
  );
  assertStrictEquals(Type.isCodePointInRange(-1, 0, 0x10FFFF), false);
  assertStrictEquals(Type.isCodePointInRange(0x110000, 0, 0x10FFFF), false);

  assertThrows(
    () => {
      Type.isCodePointInRange(0, 0, 0x110000);
    },
    TypeError,
    "`max` must be a code point.",
  );

  assertThrows(
    () => {
      Type.isCodePointInRange(0, -1, 0x10FFFF);
    },
    TypeError,
    "`min` must be a code point.",
  );

  assertStrictEquals(Type.isCodePointInRange(0, 0x10FFFF, 0), false); //XXX 負のレンジはエラーにすべき？
});

Deno.test("Type.assertCodePointInRange()", () => {
  try {
    Type.assertCodePointInRange(0, "test-1", 0, 0);
    Type.assertCodePointInRange(0, "test-1", 0, 1);
    Type.assertCodePointInRange(1, "test-1", 0, 1);
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertCodePointInRange(1, "test-1", 2, 3);
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertCodePointInRange(1, "test-1", 3, 0);
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertCodePointInRange(undefined, "test-1", 0, 0x10FFFF);
    unreachable();
  } catch {
    //
  }
});

// Deno.test("CodePoint.isInRanges()", () => {
//   const blocks0: Array<[number] | [number, number]> = [];
//
//   assertStrictEquals(CodePoint.isInRanges(0x0, blocks0), false);
//   assertStrictEquals(CodePoint.isInRanges(0x7F, blocks0), false);
//   assertStrictEquals(CodePoint.isInRanges(0x80, blocks0), false);
//   assertStrictEquals(CodePoint.isInRanges(0xFF, blocks0), false);
//   assertStrictEquals(CodePoint.isInRanges(0x100, blocks0), false);
//
//   const blocks1 = [
//     [0x0, 0x7F],
//     [0x80, 0xFF],
//   ] as [number, number][];
//
//   assertStrictEquals(CodePoint.isInRanges(0x0, blocks1), true);
//   assertStrictEquals(CodePoint.isInRanges(0x7F, blocks1), true);
//   assertStrictEquals(CodePoint.isInRanges(0x80, blocks1), true);
//   assertStrictEquals(CodePoint.isInRanges(0xFF, blocks1), true);
//   assertStrictEquals(CodePoint.isInRanges(0x100, blocks1), false);
//
//   const blocks2 = [
//     [0x80, 0xFF],
//     [0x0, 0x7F],
//   ] as [number, number][];
//
//   assertStrictEquals(CodePoint.isInRanges(0x0, blocks2), true);
//   assertStrictEquals(CodePoint.isInRanges(0x7F, blocks2), true);
//   assertStrictEquals(CodePoint.isInRanges(0x80, blocks2), true);
//   assertStrictEquals(CodePoint.isInRanges(0xFF, blocks2), true);
//   assertStrictEquals(CodePoint.isInRanges(0x100, blocks2), false);
//
//   assertStrictEquals(CodePoint.isInRanges(-1, blocks1), false);
//   assertStrictEquals(CodePoint.isInRanges(0x110000, blocks1), false);
//
//   const ea = "`ranges` must be an `Array`.";
//   assertThrows(
//     () => {
//       CodePoint.isInRanges(0, undefined as unknown as []);
//     },
//     TypeError,
//     ea,
//   );
//
//   assertThrows(
//     () => {
//       CodePoint.isInRanges(0, 0 as unknown as []);
//     },
//     TypeError,
//     ea,
//   );
//
//   const eai = "`ranges[0]` must be a `SafeIntegerRange.Like`.";
//   assertThrows(
//     () => {
//       CodePoint.isInRanges(0, [0 as unknown as [0]]);
//     },
//     TypeError,
//     eai,
//   );
//
//   const eai1 = "`ranges[1]` must be a `SafeIntegerRange.Like`.";
//   assertThrows(
//     () => {
//       CodePoint.isInRanges(0, [
//         [0x1, 0x7F],
//         0 as unknown as [0],
//       ]);
//     },
//     TypeError,
//     eai1,
//   );
//
//   // assertThrows(
//   //   () => {
//   //     CodePoint.isInRanges(0, [
//   //       [0x0, 0x7F],
//   //       0 as unknown as [0],
//   //     ]);
//   //   },
//   //   TypeError,
//   //   eai,
//   // );
//   assertStrictEquals(
//     CodePoint.isInRanges(0, [[0x0, 0x7F], 0 as unknown as [0]]),
//     true,
//   );
//
//   assertThrows(
//     () => {
//       CodePoint.isInRanges(0, [
//         0 as unknown as [0],
//         [0x0, 0x7F],
//       ]);
//     },
//     TypeError,
//     eai,
//   );
// });

Deno.test("Type.isBmpCodePoint()", () => {
  assertStrictEquals(Type.isBmpCodePoint(0x0), true);
  assertStrictEquals(Type.isBmpCodePoint(0xFFFF), true);
  assertStrictEquals(Type.isBmpCodePoint(0x10000), false);
  assertStrictEquals(Type.isBmpCodePoint(0x10FFFF), false);

  assertStrictEquals(Type.isBmpCodePoint(-1), false);
  assertStrictEquals(Type.isBmpCodePoint(0x110000), false);
});

Deno.test("Type.assertCodePoint()", () => {
  try {
    Type.assertBmpCodePoint(-0, "test-1");
    Type.assertBmpCodePoint(0, "test-1");
    Type.assertBmpCodePoint(0xFFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Type.assertBmpCodePoint(0x10000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertBmpCodePoint(0x10FFFF, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Type.assertBmpCodePoint(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertBmpCodePoint(0x110000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    Type.assertBmpCodePoint(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});
