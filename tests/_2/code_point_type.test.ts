import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "../deps.ts";
import { CodePointType } from "../../mod.ts";

Deno.test("CodePointType.is()", () => {
  assertStrictEquals(CodePointType.is(-1), false);
  assertStrictEquals(CodePointType.is(-0), true);
  assertStrictEquals(CodePointType.is(0), true);
  assertStrictEquals(CodePointType.is(63), true);
  assertStrictEquals(CodePointType.is(64), true);
  assertStrictEquals(CodePointType.is(127), true);
  assertStrictEquals(CodePointType.is(128), true);
  assertStrictEquals(CodePointType.is(255), true);
  assertStrictEquals(CodePointType.is(256), true);
  assertStrictEquals(CodePointType.is(65535), true);
  assertStrictEquals(CodePointType.is(65536), true);
  assertStrictEquals(CodePointType.is(0x10FFFF), true);
  assertStrictEquals(CodePointType.is(0x110000), false);
  assertStrictEquals(CodePointType.is(0xFFFFFFFF), false);
  assertStrictEquals(CodePointType.is(0x100000000), false);
  assertStrictEquals(CodePointType.is(0.1), false);

  assertStrictEquals(CodePointType.is("0"), false);
  assertStrictEquals(CodePointType.is("255"), false);
  assertStrictEquals(CodePointType.is(true), false);
  assertStrictEquals(CodePointType.is({}), false);
  assertStrictEquals(CodePointType.is([]), false);
  assertStrictEquals(CodePointType.is([0]), false);
  assertStrictEquals(CodePointType.is(undefined), false);
  assertStrictEquals(CodePointType.is(null), false);
});

Deno.test("CodePointType.assert()", () => {
  try {
    CodePointType.assert(-0, "test-1");
    CodePointType.assert(0, "test-1");
    CodePointType.assert(0x10FFFF, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    CodePointType.assert(-1, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    CodePointType.assert(0x110000, "test-1");
    unreachable();
  } catch {
    //
  }
  try {
    CodePointType.assert(undefined, "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("CodePointType.toString()", () => {
  assertStrictEquals(CodePointType.toString(-0x0), "U+0000");
  assertStrictEquals(CodePointType.toString(0x0), "U+0000");
  assertStrictEquals(CodePointType.toString(0xFFFF), "U+FFFF");
  assertStrictEquals(CodePointType.toString(0x10000), "U+10000");
  assertStrictEquals(CodePointType.toString(0x10FFFF), "U+10FFFF");

  assertThrows(
    () => {
      CodePointType.toString(-1);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePointType.toString(0x110000);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePointType.toString("0" as unknown as number);
    },
    TypeError,
    "codePoint",
  );
});

Deno.test("CodePointType.planeOf()", () => {
  assertStrictEquals(CodePointType.planeOf(0x0), 0);
  assertStrictEquals(CodePointType.planeOf(0xFFFF), 0);
  assertStrictEquals(CodePointType.planeOf(0x10000), 1);
  assertStrictEquals(CodePointType.planeOf(0x1FFFF), 1);
  assertStrictEquals(CodePointType.planeOf(0x20000), 2);
  assertStrictEquals(CodePointType.planeOf(0x2FFFF), 2);
  assertStrictEquals(CodePointType.planeOf(0x30000), 3);
  assertStrictEquals(CodePointType.planeOf(0x3FFFF), 3);
  assertStrictEquals(CodePointType.planeOf(0x40000), 4);
  assertStrictEquals(CodePointType.planeOf(0x4FFFF), 4);
  assertStrictEquals(CodePointType.planeOf(0x50000), 5);
  assertStrictEquals(CodePointType.planeOf(0x5FFFF), 5);
  assertStrictEquals(CodePointType.planeOf(0x60000), 6);
  assertStrictEquals(CodePointType.planeOf(0x6FFFF), 6);
  assertStrictEquals(CodePointType.planeOf(0x70000), 7);
  assertStrictEquals(CodePointType.planeOf(0x7FFFF), 7);
  assertStrictEquals(CodePointType.planeOf(0x80000), 8);
  assertStrictEquals(CodePointType.planeOf(0x8FFFF), 8);
  assertStrictEquals(CodePointType.planeOf(0x90000), 9);
  assertStrictEquals(CodePointType.planeOf(0x9FFFF), 9);
  assertStrictEquals(CodePointType.planeOf(0xA0000), 10);
  assertStrictEquals(CodePointType.planeOf(0xAFFFF), 10);
  assertStrictEquals(CodePointType.planeOf(0xB0000), 11);
  assertStrictEquals(CodePointType.planeOf(0xBFFFF), 11);
  assertStrictEquals(CodePointType.planeOf(0xC0000), 12);
  assertStrictEquals(CodePointType.planeOf(0xCFFFF), 12);
  assertStrictEquals(CodePointType.planeOf(0xD0000), 13);
  assertStrictEquals(CodePointType.planeOf(0xDFFFF), 13);
  assertStrictEquals(CodePointType.planeOf(0xE0000), 14);
  assertStrictEquals(CodePointType.planeOf(0xEFFFF), 14);
  assertStrictEquals(CodePointType.planeOf(0xF0000), 15);
  assertStrictEquals(CodePointType.planeOf(0xFFFFF), 15);
  assertStrictEquals(CodePointType.planeOf(0x100000), 16);
  assertStrictEquals(CodePointType.planeOf(0x10FFFF), 16);

  assertThrows(
    () => {
      CodePointType.planeOf(-1);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePointType.planeOf(0x110000);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePointType.planeOf("0" as unknown as number);
    },
    TypeError,
    "codePoint",
  );
});

Deno.test("CodePointType.isBmp()", () => {
  assertStrictEquals(CodePointType.isBmp(0x0), true);
  assertStrictEquals(CodePointType.isBmp(0xFFFF), true);
  assertStrictEquals(CodePointType.isBmp(0x10000), false);
  assertStrictEquals(CodePointType.isBmp(0x10FFFF), false);

  assertStrictEquals(CodePointType.isBmp(-1), false);
  assertStrictEquals(CodePointType.isBmp(0x110000), false);
});

Deno.test("CodePointType.isInPlanes()", () => {
  assertStrictEquals(CodePointType.isInPlanes(0x0, []), false);

  assertStrictEquals(CodePointType.isInPlanes(0x0, [0]), true);
  assertStrictEquals(CodePointType.isInPlanes(0xFFFF, [0]), true);
  assertStrictEquals(CodePointType.isInPlanes(0x0, [1]), false);
  assertStrictEquals(CodePointType.isInPlanes(0x100000, [16]), true);
  assertStrictEquals(CodePointType.isInPlanes(0x10FFFF, [16]), true);

  assertStrictEquals(CodePointType.isInPlanes(0x0, [0, 16]), true);
  assertStrictEquals(CodePointType.isInPlanes(0xFFFF, [0, 16]), true);
  assertStrictEquals(CodePointType.isInPlanes(0x0, [1, 16]), false);
  assertStrictEquals(CodePointType.isInPlanes(0x100000, [0, 16]), true);
  assertStrictEquals(CodePointType.isInPlanes(0x10FFFF, [0, 16]), true);

  assertThrows(
    () => {
      CodePointType.isInPlanes(-1, []);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePointType.isInPlanes(0.5, []);
    },
    TypeError,
    "codePoint",
  );

  assertThrows(
    () => {
      CodePointType.isInPlanes(0x110000, []);
    },
    TypeError,
    "codePoint",
  );

  //assertStrictEquals(CodePointType.isInPlanes(0x0, [1, 16]), false);
  assertThrows(
    () => {
      CodePointType.isInPlanes(0, undefined as unknown as []);
    },
    TypeError,
    "planes",
  );

  assertThrows(
    () => {
      CodePointType.isInPlanes(0, "0" as unknown as []);
    },
    TypeError,
    "planes",
  );

  const epa = "`planes` must be a array of planes.";
  assertThrows(
    () => {
      CodePointType.isInPlanes(0, [-1] as unknown as []);
    },
    TypeError,
    epa,
  );

  assertThrows(
    () => {
      CodePointType.isInPlanes(0, [17] as unknown as []);
    },
    TypeError,
    epa,
  );
});

Deno.test("CodePointType.isHighSurrogate()", () => {
  assertStrictEquals(CodePointType.isHighSurrogate(0xD7FF), false);
  assertStrictEquals(CodePointType.isHighSurrogate(0xD800), true);
  assertStrictEquals(CodePointType.isHighSurrogate(0xDBFF), true);
  assertStrictEquals(CodePointType.isHighSurrogate(0xDC00), false);
  assertStrictEquals(CodePointType.isHighSurrogate(0xDFFF), false);
  assertStrictEquals(CodePointType.isHighSurrogate(0xE000), false);

  assertStrictEquals(CodePointType.isHighSurrogate(-1), false);
  assertStrictEquals(CodePointType.isHighSurrogate(0x110000), false);
});

Deno.test("CodePointType.isLowSurrogate()", () => {
  assertStrictEquals(CodePointType.isLowSurrogate(0xD7FF), false);
  assertStrictEquals(CodePointType.isLowSurrogate(0xD800), false);
  assertStrictEquals(CodePointType.isLowSurrogate(0xDBFF), false);
  assertStrictEquals(CodePointType.isLowSurrogate(0xDC00), true);
  assertStrictEquals(CodePointType.isLowSurrogate(0xDFFF), true);
  assertStrictEquals(CodePointType.isLowSurrogate(0xE000), false);

  assertStrictEquals(CodePointType.isLowSurrogate(-1), false);
  assertStrictEquals(CodePointType.isLowSurrogate(0x110000), false);
});

Deno.test("CodePointType.isSurrogate()", () => {
  assertStrictEquals(CodePointType.isSurrogate(0xD7FF), false);
  assertStrictEquals(CodePointType.isSurrogate(0xD800), true);
  assertStrictEquals(CodePointType.isSurrogate(0xDBFF), true);
  assertStrictEquals(CodePointType.isSurrogate(0xDC00), true);
  assertStrictEquals(CodePointType.isSurrogate(0xDFFF), true);
  assertStrictEquals(CodePointType.isSurrogate(0xE000), false);

  assertStrictEquals(CodePointType.isSurrogate(-1), false);
  assertStrictEquals(CodePointType.isSurrogate(0x110000), false);
});

Deno.test("CodePointType.isVariationSelector()", () => {
  assertStrictEquals(CodePointType.isVariationSelector(0xFDFF), false);
  assertStrictEquals(CodePointType.isVariationSelector(0xFE00), true);
  assertStrictEquals(CodePointType.isVariationSelector(0xFE0F), true);
  assertStrictEquals(CodePointType.isVariationSelector(0xFE10), false);
  assertStrictEquals(CodePointType.isVariationSelector(0xE00FF), false);
  assertStrictEquals(CodePointType.isVariationSelector(0xE0100), true);
  assertStrictEquals(CodePointType.isVariationSelector(0xE01EF), true);
  assertStrictEquals(CodePointType.isVariationSelector(0xE01F0), false);
  assertStrictEquals(CodePointType.isVariationSelector(0x180A), false);
  assertStrictEquals(CodePointType.isVariationSelector(0x180B), true);
  assertStrictEquals(CodePointType.isVariationSelector(0x180F), true);
  assertStrictEquals(CodePointType.isVariationSelector(0x1810), false);
});

Deno.test("CodePointType.isInRanges()", () => {
  const blocks0: Array<[number] | [number, number]> = [];

  assertStrictEquals(CodePointType.isInRanges(0x0, blocks0), false);
  assertStrictEquals(CodePointType.isInRanges(0x7F, blocks0), false);
  assertStrictEquals(CodePointType.isInRanges(0x80, blocks0), false);
  assertStrictEquals(CodePointType.isInRanges(0xFF, blocks0), false);
  assertStrictEquals(CodePointType.isInRanges(0x100, blocks0), false);

  const blocks1 = [
    [0x0, 0x7F],
    [0x80, 0xFF],
  ] as [number, number][];

  assertStrictEquals(CodePointType.isInRanges(0x0, blocks1), true);
  assertStrictEquals(CodePointType.isInRanges(0x7F, blocks1), true);
  assertStrictEquals(CodePointType.isInRanges(0x80, blocks1), true);
  assertStrictEquals(CodePointType.isInRanges(0xFF, blocks1), true);
  assertStrictEquals(CodePointType.isInRanges(0x100, blocks1), false);

  const blocks2 = [
    [0x80, 0xFF],
    [0x0, 0x7F],
  ] as [number, number][];

  assertStrictEquals(CodePointType.isInRanges(0x0, blocks2), true);
  assertStrictEquals(CodePointType.isInRanges(0x7F, blocks2), true);
  assertStrictEquals(CodePointType.isInRanges(0x80, blocks2), true);
  assertStrictEquals(CodePointType.isInRanges(0xFF, blocks2), true);
  assertStrictEquals(CodePointType.isInRanges(0x100, blocks2), false);

  assertStrictEquals(CodePointType.isInRanges(-1, blocks1), false);
  assertStrictEquals(CodePointType.isInRanges(0x110000, blocks1), false);

  const ea = "`ranges` must be an `Array`.";
  assertThrows(
    () => {
      CodePointType.isInRanges(0, undefined as unknown as []);
    },
    TypeError,
    ea,
  );

  assertThrows(
    () => {
      CodePointType.isInRanges(0, 0 as unknown as []);
    },
    TypeError,
    ea,
  );

  const eai = "`ranges[0]` must be a `SafeIntegerRange.Like`.";
  assertThrows(
    () => {
      CodePointType.isInRanges(0, [0 as unknown as [0]]);
    },
    TypeError,
    eai,
  );

  const eai1 = "`ranges[1]` must be a `SafeIntegerRange.Like`.";
  assertThrows(
    () => {
      CodePointType.isInRanges(0, [
        [0x1, 0x7F],
        0 as unknown as [0],
      ]);
    },
    TypeError,
    eai1,
  );

  // assertThrows(
  //   () => {
  //     CodePointType.isInRanges(0, [
  //       [0x0, 0x7F],
  //       0 as unknown as [0],
  //     ]);
  //   },
  //   TypeError,
  //   eai,
  // );
  assertStrictEquals(
    CodePointType.isInRanges(0, [[0x0, 0x7F], 0 as unknown as [0]]),
    true,
  );

  assertThrows(
    () => {
      CodePointType.isInRanges(0, [
        0 as unknown as [0],
        [0x0, 0x7F],
      ]);
    },
    TypeError,
    eai,
  );
});
