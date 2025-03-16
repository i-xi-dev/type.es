import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../../mod.ts";

const utf8Encoder = new TextEncoder();

Deno.test("Text.UsAsciiEncoder.prototype[Symbol.toStringTag]", () => {
  const encoder = new Text.UsAsciiEncoder();
  assertStrictEquals(encoder[Symbol.toStringTag], "UsAsciiEncoder");
});

Deno.test("Text.UsAsciiEncoder.encode()", () => {
  const encoder = new Text.UsAsciiEncoder();

  // encode()
  assertStrictEquals(JSON.stringify([...encoder.encode()]), "[]");

  // encode(string)
  assertStrictEquals(JSON.stringify([...encoder.encode("")]), "[]");
  assertStrictEquals(
    JSON.stringify([...encoder.encode("ABCD")]),
    JSON.stringify([...utf8Encoder.encode("ABCD")]),
    //"[65,66,67,68]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u007F")]),
    JSON.stringify([...utf8Encoder.encode("\u0000\u007F")]),
    //"[0,127]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u00FF")]),
    "[0,63]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u{2000B}")]),
    "[0,63]",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  const rs = JSON.stringify([...encoder.encode(t)]);
  //console.log(performance.now() - bf);
  assertStrictEquals(rs, JSON.stringify([...new Uint8Array(c)]));

  assertStrictEquals(JSON.stringify([...encoder.encode("\u0100")]), "[63]");
  assertStrictEquals(JSON.stringify([...encoder.encode("あ")]), "[63]");

  // encode(any)
  assertStrictEquals(
    JSON.stringify([...encoder.encode(0 as unknown as string)]),
    "[48]",
  );
  // assertThrows(
  //   () => {
  //     encoder.encode(0 as unknown as string);
  //   },
  //   TypeError,
  //   "input",
  // );
});

Deno.test("Text.UsAsciiEncoder.encode() - strict", () => {
  const encoder = new Text.UsAsciiEncoder({ strict: true });

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
    JSON.stringify([...utf8Encoder.encode("ABCD")]),
    //"[65,66,67,68]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u007F")]),
    JSON.stringify([...utf8Encoder.encode("\u0000\u007F")]),
    //"[0,127]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u00FF")]),
    "[0,63]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u{2000B}")]),
    "[0,63]",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  const rs = JSON.stringify([...encoder.encode(t)]);
  //console.log(performance.now() - bf);
  assertStrictEquals(rs, JSON.stringify([...new Uint8Array(c)]));

  assertStrictEquals(JSON.stringify([...encoder.encode("\u0100")]), "[63]");
  assertStrictEquals(JSON.stringify([...encoder.encode("あ")]), "[63]");

  // encode(any)
  assertThrows(
    () => {
      encoder.encode(0 as unknown as string);
    },
    TypeError,
    "`input` must be a `string`.",
  );
});

Deno.test("Text.UsAsciiEncoder.encode() - fatal", () => {
  const encoder = new Text.UsAsciiEncoder({ fatal: true });

  // encode()
  assertStrictEquals(JSON.stringify([...encoder.encode()]), "[]");

  // encode(string)
  assertStrictEquals(JSON.stringify([...encoder.encode("")]), "[]");
  assertStrictEquals(
    JSON.stringify([...encoder.encode("ABCD")]),
    JSON.stringify([...utf8Encoder.encode("ABCD")]),
    //"[65,66,67,68]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u007F")]),
    JSON.stringify([...utf8Encoder.encode("\u0000\u007F")]),
    //"[0,127]",
  );
  assertThrows(
    () => {
      JSON.stringify([...encoder.encode("\u0000\u00FF")]);
    },
    TypeError,
    "encode-error: U+00FF",
  );
  assertThrows(
    () => {
      JSON.stringify([...encoder.encode("\u0000\u{2000B}")]);
    },
    TypeError,
    "encode-error: U+2000B",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  const rs = JSON.stringify([...encoder.encode(t)]);
  //console.log(performance.now() - bf);
  assertStrictEquals(rs, JSON.stringify([...new Uint8Array(c)]));

  assertThrows(
    () => {
      encoder.encode("\u0100");
    },
    TypeError,
    "encode-error: U+0100",
  );

  assertThrows(
    () => {
      encoder.encode("あ");
    },
    TypeError,
    "encode-error: U+3042",
  );

  // encode(any)
  assertStrictEquals(
    JSON.stringify([...encoder.encode(0 as unknown as string)]),
    "[48]",
  );
  // assertThrows(
  //   () => {
  //     encoder.encode(0 as unknown as string);
  //   },
  //   TypeError,
  //   "input",
  // );
});

Deno.test("Text.UsAsciiEncoder.encode() - replacementChar", () => {
  const encoder = new Text.UsAsciiEncoder({
    fatal: false,
    replacementChar: "X",
  });

  // encode()
  assertStrictEquals(JSON.stringify([...encoder.encode()]), "[]");

  // encode(string)
  assertStrictEquals(JSON.stringify([...encoder.encode("")]), "[]");
  assertStrictEquals(
    JSON.stringify([...encoder.encode("ABCD")]),
    JSON.stringify([...utf8Encoder.encode("ABCD")]),
    //"[65,66,67,68]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u007F")]),
    JSON.stringify([...utf8Encoder.encode("\u0000\u007F")]),
    //"[0,127]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u00FF")]),
    "[0,88]",
  );
  assertStrictEquals(
    JSON.stringify([...encoder.encode("\u0000\u{2000B}")]),
    "[0,88]",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  const rs = JSON.stringify([...encoder.encode(t)]);
  //console.log(performance.now() - bf);
  assertStrictEquals(rs, JSON.stringify([...new Uint8Array(c)]));

  assertStrictEquals(JSON.stringify([...encoder.encode("\u0100")]), "[88]");
  assertStrictEquals(JSON.stringify([...encoder.encode("あ")]), "[88]");

  // encode(any)
  assertStrictEquals(
    JSON.stringify([...encoder.encode(0 as unknown as string)]),
    "[48]",
  );
  // assertThrows(
  //   () => {
  //     encoder.encode(0 as unknown as string);
  //   },
  //   TypeError,
  //   "input",
  // );
});
