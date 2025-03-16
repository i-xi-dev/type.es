import { assertStrictEquals, assertThrows } from "@std/assert";
import { Text } from "../../../../mod.ts";

const utf8Decoder = new TextDecoder("utf-8");

Deno.test("Text.UsAsciiDecoder.prototype[Symbol.toStringTag]", () => {
  const encoder = new Text.UsAsciiDecoder();
  assertStrictEquals(encoder[Symbol.toStringTag], "UsAsciiDecoder");
});

Deno.test("Text.UsAsciiDecoder.decode()", () => {
  const decoder = new Text.UsAsciiDecoder();

  // decode()
  assertStrictEquals(decoder.decode(), "");

  // decode(ArrayBuffer)
  assertStrictEquals(decoder.decode(new ArrayBuffer(0)), "");
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    utf8Decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    //"ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(decoder.decode(Uint8Array.of()), "");
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    utf8Decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    //"ABCD",
  );
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x0, 0x7F)),
    utf8Decoder.decode(Uint8Array.of(0x0, 0x7F)),
    //"\u0000\u007F",
  );
  assertStrictEquals(decoder.decode(Uint8Array.of(0x0, 0xFF)), "\u0000?");

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  assertStrictEquals(decoder.decode(new Uint8Array(c)), t);
  //console.log(performance.now() - bf);

  // decode(any)
  assertThrows(
    () => {
      decoder.decode([] as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );
});

Deno.test("Text.UsAsciiDecoder.decode() - fatal", () => {
  const decoder = new Text.UsAsciiDecoder({ fatal: true });

  // decode()
  assertStrictEquals(decoder.decode(), "");

  // decode(ArrayBuffer)
  assertStrictEquals(decoder.decode(new ArrayBuffer(0)), "");
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    utf8Decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    //"ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(decoder.decode(Uint8Array.of()), "");
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    utf8Decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    //"ABCD",
  );
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x0, 0x7F)),
    utf8Decoder.decode(Uint8Array.of(0x0, 0x7F)),
    //"\u0000\u007F",
  );
  assertThrows(
    () => {
      decoder.decode(Uint8Array.of(0x0, 0xFF));
    },
    TypeError,
    "decode-error: 0xFF",
  );
  assertThrows(
    () => {
      decoder.decode(Uint8Array.of(0x0, 0xFF, 0x80));
    },
    TypeError,
    "decode-error: 0xFF",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  assertStrictEquals(decoder.decode(new Uint8Array(c)), t);
  //console.log(performance.now() - bf);

  // decode(any)
  assertThrows(
    () => {
      decoder.decode([] as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );
});

Deno.test("Text.UsAsciiDecoder.decode() - replacementChar", () => {
  const decoder = new Text.UsAsciiDecoder({
    fatal: false,
    replacementChar: "X",
  });

  // decode()
  assertStrictEquals(decoder.decode(), "");

  // decode(ArrayBuffer)
  assertStrictEquals(decoder.decode(new ArrayBuffer(0)), "");
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    utf8Decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    //"ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(decoder.decode(Uint8Array.of()), "");
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    utf8Decoder.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    //"ABCD",
  );
  assertStrictEquals(
    decoder.decode(Uint8Array.of(0x0, 0x7F)),
    utf8Decoder.decode(Uint8Array.of(0x0, 0x7F)),
    //"\u0000\u007F",
  );
  assertStrictEquals(decoder.decode(Uint8Array.of(0x0, 0xFF)), "\u0000X");

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  assertStrictEquals(decoder.decode(new Uint8Array(c)), t);
  //console.log(performance.now() - bf);

  // decode(any)
  assertThrows(
    () => {
      decoder.decode([] as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );
});
