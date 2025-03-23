import { assertStrictEquals, unreachable } from "@std/assert";
import { Text } from "../../../../mod.ts";
import { delay } from "../../../test_utils.ts";

Deno.test("Text.UsAsciiEncoderStream.prototype.encoding", () => {
  const encoder = new Text.UsAsciiEncoderStream();
  assertStrictEquals(encoder.encoding, "us-ascii");
});

Deno.test("Text.UsAsciiEncoderStream.prototype.fatal", () => {
  const encoder1 = new Text.UsAsciiEncoderStream({ fatal: true });
  assertStrictEquals(encoder1.fatal, true);

  const encoder2 = new Text.UsAsciiEncoderStream({ fatal: false });
  assertStrictEquals(encoder2.fatal, false);

  const encoder3 = new Text.UsAsciiEncoderStream();
  assertStrictEquals(encoder3.fatal, false);
});

const streamSrc1 = [
  "ABC",
  "?",
  "?",
  "",
  "A",
  "\u007F",
  "A",
  "?",
  "A",
  "AA",
  "?",
  "A",
  "\u0000",
  "A",
  "",
  "",
  "",
];

const streamExpected1 = [
  Uint8Array.of(0x41, 0x42, 0x43),
  Uint8Array.of(0x3F),
  Uint8Array.of(0x3F),
  Uint8Array.of(0x41),
  Uint8Array.of(0x7F),
  Uint8Array.of(0x41),
  Uint8Array.of(0x3F),
  Uint8Array.of(0x41),
  Uint8Array.of(0x41, 0x41),
  Uint8Array.of(0x3F),
  Uint8Array.of(0x41),
  Uint8Array.of(0x00),
  Uint8Array.of(0x41),
];

Deno.test("Text.UsAsciiEncoderStream.prototype.readable,writable - U+007FまでのUTF-8との比較", async () => {
  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < streamSrc1.length; i++) {
      await delay(10);
      yield streamSrc1[i];
    }
  })());

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const decoder1 = new Text.UsAsciiEncoderStream();

  const result1: Uint8Array[] = [];

  const ws = new WritableStream({
    write(chunk) {
      result1.push(chunk);
    },
  });
  await s.pipeThrough(decoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  assertStrictEquals(JSON.stringify(result1), JSON.stringify(streamExpected1));
});

Deno.test("- TextEncoderStream.prototype.readable,writable - U+007FまでのUTF-8との比較", async () => {
  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < streamSrc1.length; i++) {
      await delay(10);
      yield streamSrc1[i];
    }
  })());

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const decoder1 = new TextEncoderStream();

  const result1: Uint8Array[] = [];

  const ws = new WritableStream({
    write(chunk) {
      result1.push(chunk);
    },
  });
  await s.pipeThrough(decoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  assertStrictEquals(JSON.stringify(result1), JSON.stringify(streamExpected1));
});

Deno.test("Text.UsAsciiEncoderStream.prototype.readable,writable - fatal:false", async () => {
  const td = [
    "ABC",
    "あ",
    "\uD867",
    "",
    "A",

    "\uD867\uDE3E",
    "A",
    "\uDE3E",
    "A",
    "AA",

    "\uD867",
    "\uDE3E",
    "A",
    "\u0000",
    "A",
  ];

  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < td.length; i++) {
      await delay(10);
      yield td[i];
    }
  })());

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.UsAsciiEncoderStream();

  const result = new Uint8Array(20);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0x41,0x42,0x43,0x3F,0x3F," +
    "0x41,0x3F,0x41,0x3F,0x41," +
    "0x41,0x41,0x3F,0x41,0x00," +
    "0x41,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.UsAsciiEncoderStream.prototype.readable,writable - fatal:false(末尾が孤立サロゲート)", async () => {
  const td = [
    "ABC",
    "あ",
    "\uD867",
    "",
    "A",

    "\uD867\uDE3E",
    "A",
    "\uDE3E",
    "A",
    "AA",

    "\uD867",
    "\uDE3E",
    "A",
    "\u0000",
    "\uD800",
  ];

  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < td.length; i++) {
      await delay(10);
      yield td[i];
    }
  })());

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.UsAsciiEncoderStream();

  const result = new Uint8Array(20);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0x41,0x42,0x43,0x3F,0x3F," +
    "0x41,0x3F,0x41,0x3F,0x41," +
    "0x41,0x41,0x3F,0x41,0x00," +
    "0x3F,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.UsAsciiEncoderStream.prototype.readable,writable - fatal:false, replacementChar:string", async () => {
  const td = [
    "ABC",
    "あ",
    "\uD867",
    "",
    "A",

    "\uD867\uDE3E",
    "A",
    "\uDE3E",
    "A",
    "AA",

    "\uD867",
    "\uDE3E",
    "A",
    "\u0000",
    "A",
  ];

  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < td.length; i++) {
      await delay(10);
      yield td[i];
    }
  })());

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.UsAsciiEncoderStream({
    fatal: false,
    replacementChar: "_",
  });

  const result = new Uint8Array(20);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0x41,0x42,0x43,0x5F,0x5F," +
    "0x41,0x5F,0x41,0x5F,0x41," +
    "0x41,0x41,0x5F,0x41,0x00," +
    "0x41,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.UsAsciiEncoderStream.prototype.readable,writable - fatal:true", async () => {
  const td = [
    "ABC",
    "あ",
    "\uD867",
    "",
    "A",

    "\uD867\uDE3E",
    "A",
    "\uDE3E",
    "A",
    "AA",

    "\uD867",
    "\uDE3E",
    "A",
    "\u0000",
    "A",
  ];

  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < td.length; i++) {
      await delay(10);
      yield td[i];
    }
  })());

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.UsAsciiEncoderStream({ fatal: true });

  const result: Uint8Array[] = [];
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.push(chunk);
      written = written + chunk.byteLength;
    },
    abort(reason) {
      console.log("UnderlyingSink.abort");
      //console.log(reason);
      assertStrictEquals(reason.name, "TypeError");
      assertStrictEquals(reason.message, "encode-error: U+3042");
    },
  });

  try {
    await s.pipeThrough(encoder1).pipeTo(ws);
    unreachable();
  } catch (e) {
    assertStrictEquals(e instanceof Error, true);
    if (e instanceof Error) {
      assertStrictEquals(e.name, "TypeError");
      assertStrictEquals(e.message, "encode-error: U+3042");
    }
  }

  const expected = [
    Uint8Array.of(0x41, 0x42, 0x43),
  ];
  assertStrictEquals(JSON.stringify(result), JSON.stringify(expected));
});

Deno.test("Text.UsAsciiEncoderStream.prototype[Symbol.toStringTag]", () => {
  const encoder = new Text.UsAsciiEncoderStream();
  assertStrictEquals(encoder[Symbol.toStringTag], "UsAsciiEncoderStream");
});
