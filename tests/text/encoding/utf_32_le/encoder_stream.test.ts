import { assertStrictEquals, unreachable } from "@std/assert";
import { Text } from "../../../../mod.ts";
import { delay } from "../../../test_utils.ts";

Deno.test("Text.Utf32LeEncoderStream.prototype.encoding", () => {
  const encoder = new Text.Utf32LeEncoderStream();
  assertStrictEquals(encoder.encoding, "utf-32le");
});

Deno.test("Text.Utf32LeEncoderStream.prototype.fatal", () => {
  const encoder1 = new Text.Utf32LeEncoderStream({ fatal: true });
  assertStrictEquals(encoder1.fatal, true);

  const encoder2 = new Text.Utf32LeEncoderStream({ fatal: false });
  assertStrictEquals(encoder2.fatal, false);

  const encoder3 = new Text.Utf32LeEncoderStream();
  assertStrictEquals(encoder3.fatal, false);
});

Deno.test("Text.Utf32LeEncoderStream.prototype.readable,writable - fatal:false", async () => {
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

  const encoder1 = new Text.Utf32LeEncoderStream();

  const result = new Uint8Array(80);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);

  const expected = "0x41,0x00,0x00,0x00,0x42," +
    "0x00,0x00,0x00,0x43,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0xFD,0xFF,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x3E," +
    "0x9E,0x02,0x00,0x41,0x00," +
    "0x00,0x00,0xFD,0xFF,0x00," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x41," +
    "0x00,0x00,0x00,0x3E,0x9E," +
    "0x02,0x00,0x41,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf32LeEncoderStream.prototype.readable,writable - fatal:false(末尾が孤立サロゲート)", async () => {
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

  const encoder1 = new Text.Utf32LeEncoderStream();

  const result = new Uint8Array(80);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);

  const expected = "0x41,0x00,0x00,0x00,0x42," +
    "0x00,0x00,0x00,0x43,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0xFD,0xFF,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x3E," +
    "0x9E,0x02,0x00,0x41,0x00," +
    "0x00,0x00,0xFD,0xFF,0x00," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x41," +
    "0x00,0x00,0x00,0x3E,0x9E," +
    "0x02,0x00,0x41,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0xFD,0xFF,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf32LeEncoderStream.prototype.readable,writable - fatal:false, prependBOM:true", async () => {
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

  const encoder1 = new Text.Utf32LeEncoderStream({ prependBOM: true });

  const result = new Uint8Array(80);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);

  const expected = "0xFF,0xFE,0x00,0x00,0x41,0x00,0x00,0x00,0x42," +
    "0x00,0x00,0x00,0x43,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0xFD,0xFF,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x3E," +
    "0x9E,0x02,0x00,0x41,0x00," +
    "0x00,0x00,0xFD,0xFF,0x00," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x41," +
    "0x00,0x00,0x00,0x3E,0x9E," +
    "0x02,0x00,0x41,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf32LeEncoderStream.prototype.readable,writable - fatal:false, prependBOM:true(2)", async () => {
  const td = [
    "\uFEFFABC",
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

  const encoder1 = new Text.Utf32LeEncoderStream({ prependBOM: true });

  const result = new Uint8Array(80);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);

  const expected = "0xFF,0xFE,0x00,0x00,0x41,0x00,0x00,0x00,0x42," +
    "0x00,0x00,0x00,0x43,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0xFD,0xFF,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x3E," +
    "0x9E,0x02,0x00,0x41,0x00," +
    "0x00,0x00,0xFD,0xFF,0x00," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x41," +
    "0x00,0x00,0x00,0x3E,0x9E," +
    "0x02,0x00,0x41,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf32LeEncoderStream.prototype.readable,writable - fatal:true エラーなし", async () => {
  const td = [
    "ABC",
    "あ",
    "あ",
    "",
    "A",

    "\uD867\uDE3E",
    "A",
    "あ",
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

  const encoder1 = new Text.Utf32LeEncoderStream({ fatal: true });

  const result = new Uint8Array(80);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);

  const expected = "0x41,0x00,0x00,0x00,0x42," +
    "0x00,0x00,0x00,0x43,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0x42,0x30,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x3E," +
    "0x9E,0x02,0x00,0x41,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x41," +
    "0x00,0x00,0x00,0x3E,0x9E," +
    "0x02,0x00,0x41,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf32LeEncoderStream.prototype.readable,writable - fatal:true 孤立サロゲートでエラー", async () => {
  const td = [
    "ABC",
    "あ",
    "\uD800",
    "",
    "A",

    "\uD867\uDE3E",
    "A",
    "あ",
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

  const encoder1 = new Text.Utf32LeEncoderStream({ fatal: true });

  const result = new Uint8Array(80);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
    abort(reason) {
      console.log("UnderlyingSink.abort");
      //console.log(reason);
      assertStrictEquals(reason.name, "TypeError");
      assertStrictEquals(reason.message, "encode-error: U+D800");
    },
  });

  try {
    await s.pipeThrough(encoder1).pipeTo(ws);
    unreachable();
  } catch (e) {
    assertStrictEquals(e instanceof Error, true);
    if (e instanceof Error) {
      assertStrictEquals(e.name, "TypeError");
      assertStrictEquals(e.message, "encode-error: U+D800");
    }
  }

  const expected = "0x41,0x00,0x00,0x00,0x42," +
    "0x00,0x00,0x00,0x43,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf32LeEncoderStream.prototype.readable,writable - fatal:true 孤立サロゲートでエラー", async () => {
  const td = [
    "ABC",
    "あ",
    "\uDC00",
    "",
    "A",

    "\uD867\uDE3E",
    "A",
    "あ",
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

  const encoder1 = new Text.Utf32LeEncoderStream({ fatal: true });

  const result = new Uint8Array(80);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
    abort(reason) {
      console.log("UnderlyingSink.abort");
      //console.log(reason);
      assertStrictEquals(reason.name, "TypeError");
      assertStrictEquals(reason.message, "encode-error: U+DC00");
    },
  });

  try {
    await s.pipeThrough(encoder1).pipeTo(ws);
    unreachable();
  } catch (e) {
    assertStrictEquals(e instanceof Error, true);
    if (e instanceof Error) {
      assertStrictEquals(e.name, "TypeError");
      assertStrictEquals(e.message, "encode-error: U+DC00");
    }
  }

  const expected = "0x41,0x00,0x00,0x00,0x42," +
    "0x00,0x00,0x00,0x43,0x00," +
    "0x00,0x00,0x42,0x30,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00," +
    "0x00,0x00,0x00,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf32LeEncoderStream.prototype[Symbol.toStringTag]", () => {
  const encoder = new Text.Utf32LeEncoderStream();
  assertStrictEquals(encoder[Symbol.toStringTag], "Utf32LeEncoderStream");
});
