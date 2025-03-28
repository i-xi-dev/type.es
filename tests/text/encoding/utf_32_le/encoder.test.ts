import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../../mod.ts";

Deno.test("Text.Utf32LeEncoder.prototype[Symbol.toStringTag]", () => {
  const encoder = new Text.Utf32LeEncoder();
  assertStrictEquals(encoder[Symbol.toStringTag], "Utf32LeEncoder");
});

Deno.test("Text.Utf32LeEncoder.encode()", () => {
  const encoder = new Text.Utf32LeEncoder();

  // encode()
  assertStrictEquals(JSON.stringify([...encoder.encode()]), "[]");

  // encode(string)
  assertStrictEquals(JSON.stringify([...encoder.encode("")]), "[]");
  assertStrictEquals(
    JSON.stringify([...encoder.encode("ABCD")]),
    "[65,0,0,0,66,0,0,0,67,0,0,0,68,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u00FF")]),
    "[0,0,0,0,255,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0100")]),
    "[0,1,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあいう")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあい\u{2000B}う")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,11,0,2,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uDC00う")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uDC00\uD800う")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uD800\uD800う")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uD800\uD7FFう")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,255,215,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あいう\uD800")]),
    "[66,48,0,0,68,48,0,0,70,48,0,0,253,255,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あいう\uDC00")]),
    "[66,48,0,0,68,48,0,0,70,48,0,0,253,255,0,0]",
  );

  // encode(any)
  assertStrictEquals(
    JSON.stringify([...encoder.encode(0 as unknown as string)]),
    "[48,0,0,0]",
  );
});

Deno.test("Text.Utf32LeEncoder.encode() - strict", () => {
  const encoder = new Text.Utf32LeEncoder({ strict: true });

  // encode()
  assertThrows(
    () => {
      encoder.encode();
    },
    TypeError,
    "`input` must be a `string`.",
  );

  // encode(string)
  assertStrictEquals(JSON.stringify([...encoder.encode("")]), "[]");
  assertStrictEquals(
    JSON.stringify([...encoder.encode("ABCD")]),
    "[65,0,0,0,66,0,0,0,67,0,0,0,68,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u00FF")]),
    "[0,0,0,0,255,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0100")]),
    "[0,1,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあいう")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあい\u{2000B}う")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,11,0,2,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uDC00う")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uDC00\uD800う")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uD800\uD800う")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uD800\uD7FFう")]),
    "[66,48,0,0,68,48,0,0,253,255,0,0,255,215,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あいう\uD800")]),
    "[66,48,0,0,68,48,0,0,70,48,0,0,253,255,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あいう\uDC00")]),
    "[66,48,0,0,68,48,0,0,70,48,0,0,253,255,0,0]",
  );

  // encode(any)
  assertThrows(
    () => {
      encoder.encode(0 as unknown as string);
    },
    TypeError,
    "`input` must be a `string`.",
  );
});

Deno.test("Text.Utf32LeEncoder.encode() - prependBOM", () => {
  const encoder = new Text.Utf32LeEncoder({ prependBOM: true });

  // encode()
  assertStrictEquals(
    JSON.stringify([...encoder.encode(undefined)]),
    "[255,254,0,0]",
  );

  // encode(string)
  assertStrictEquals(
    JSON.stringify([...encoder.encode("")]),
    "[255,254,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("ABCD")]),
    "[255,254,0,0,65,0,0,0,66,0,0,0,67,0,0,0,68,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u00FF")]),
    "[255,254,0,0,0,0,0,0,255,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0100")]),
    "[255,254,0,0,0,1,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあいう")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあい\u{2000B}う")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,11,0,2,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uDC00う")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uDC00\uD800う")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,253,255,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uD800\uD800う")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,253,255,0,0,253,255,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あい\uD800\uD7FFう")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,253,255,0,0,255,215,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あいう\uD800")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,70,48,0,0,253,255,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("あいう\uDC00")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,70,48,0,0,253,255,0,0]",
  );

  // encode(any)
  assertStrictEquals(
    JSON.stringify([...encoder.encode(0 as unknown as string)]),
    "[255,254,0,0,48,0,0,0]",
  );
});

Deno.test("Text.Utf32LeEncoder.encode() - fatal", () => {
  const encoder = new Text.Utf32LeEncoder({ fatal: true });

  // encode()
  assertStrictEquals(JSON.stringify([...encoder.encode()]), "[]");

  // encode(string)
  assertStrictEquals(JSON.stringify([...encoder.encode("")]), "[]");
  assertStrictEquals(
    JSON.stringify([...encoder.encode("ABCD")]),
    "[65,0,0,0,66,0,0,0,67,0,0,0,68,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u00FF")]),
    "[0,0,0,0,255,0,0,0]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0100")]),
    "[0,1,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあいう")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,70,48,0,0]",
  );

  assertStrictEquals(
    JSON.stringify([...encoder.encode("\uFEFFあい\u{2000B}う")]),
    "[255,254,0,0,66,48,0,0,68,48,0,0,11,0,2,0,70,48,0,0]",
  );

  assertThrows(
    () => {
      encoder.encode("あい\uDC00う");
    },
    TypeError,
    "encode-error: U+DC00",
  );

  assertThrows(
    () => {
      encoder.encode("あい\uDC00\uD800う");
    },
    TypeError,
    "encode-error: U+DC00",
  );

  assertThrows(
    () => {
      encoder.encode("あい\uD800\uD800う");
    },
    TypeError,
    "encode-error: U+D800",
  );

  assertThrows(
    () => {
      encoder.encode("あい\uD800\uD7FFう");
    },
    TypeError,
    "encode-error: U+D800",
  );

  assertThrows(
    () => {
      encoder.encode("あいう\uD800");
    },
    TypeError,
    "encode-error: U+D800",
  );

  assertThrows(
    () => {
      encoder.encode("あいう\uDC00");
    },
    TypeError,
    "encode-error: U+DC00",
  );

  // encode(any)
  assertStrictEquals(
    JSON.stringify([...encoder.encode(0 as unknown as string)]),
    "[48,0,0,0]",
  );
});
