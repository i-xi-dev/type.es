import { assertStrictEquals, unreachable } from "@std/assert";
import { Text } from "../../../../mod.ts";

Deno.test("Text.Utf16BeEncoderStream.prototype.encoding", () => {
  const encoder = new Text.Utf16BeEncoderStream();
  assertStrictEquals(encoder.encoding, "utf-16be");
});

Deno.test("Text.Utf16BeEncoderStream.prototype.fatal", () => {
  const encoder1 = new Text.Utf16BeEncoderStream({ fatal: true });
  assertStrictEquals(encoder1.fatal, true);

  const encoder2 = new Text.Utf16BeEncoderStream({ fatal: false });
  assertStrictEquals(encoder2.fatal, false);

  const encoder3 = new Text.Utf16BeEncoderStream();
  assertStrictEquals(encoder3.fatal, false);
});

Deno.test("Text.Utf16BeEncoderStream.prototype.readable,writable - fatal:false", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream({
    start(controller) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= 15) {
          clearInterval(ti);
          controller.close();
          return;
        }
        controller.enqueue(td[c]);
        c = c + 1;
      }, 10);
    },
  });

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.Utf16BeEncoderStream();

  const result = new Uint8Array(40);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0x00,0x41,0x00,0x42,0x00," +
    "0x43,0x30,0x42,0xFF,0xFD," +
    "0x00,0x41,0xD8,0x67,0xDE," +
    "0x3E,0x00,0x41,0xFF,0xFD," +
    "0x00,0x41,0x00,0x41,0x00," +
    "0x41,0xD8,0x67,0xDE,0x3E," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf16BeEncoderStream.prototype.readable,writable - fatal:false(末尾が孤立サロゲート)", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream({
    start(controller) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= 15) {
          clearInterval(ti);
          controller.close();
          return;
        }
        controller.enqueue(td[c]);
        c = c + 1;
      }, 10);
    },
  });

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.Utf16BeEncoderStream();

  const result = new Uint8Array(40);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0x00,0x41,0x00,0x42,0x00," +
    "0x43,0x30,0x42,0xFF,0xFD," +
    "0x00,0x41,0xD8,0x67,0xDE," +
    "0x3E,0x00,0x41,0xFF,0xFD," +
    "0x00,0x41,0x00,0x41,0x00," +
    "0x41,0xD8,0x67,0xDE,0x3E," +
    "0x00,0x41,0x00,0x00,0xFF," +
    "0xFD,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf16BeEncoderStream.prototype.readable,writable - fatal:false, prependBOM:true", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream({
    start(controller) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= 15) {
          clearInterval(ti);
          controller.close();
          return;
        }
        controller.enqueue(td[c]);
        c = c + 1;
      }, 10);
    },
  });

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.Utf16BeEncoderStream({ prependBOM: true });

  const result = new Uint8Array(40);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0xFE,0xFF,0x00,0x41,0x00,0x42,0x00," +
    "0x43,0x30,0x42,0xFF,0xFD," +
    "0x00,0x41,0xD8,0x67,0xDE," +
    "0x3E,0x00,0x41,0xFF,0xFD," +
    "0x00,0x41,0x00,0x41,0x00," +
    "0x41,0xD8,0x67,0xDE,0x3E," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf16BeEncoderStream.prototype.readable,writable - fatal:false, prependBOM:true(2)", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream({
    start(controller) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= 15) {
          clearInterval(ti);
          controller.close();
          return;
        }
        controller.enqueue(td[c]);
        c = c + 1;
      }, 10);
    },
  });

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.Utf16BeEncoderStream({ prependBOM: true });

  const result = new Uint8Array(40);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0xFE,0xFF,0x00,0x41,0x00,0x42,0x00," +
    "0x43,0x30,0x42,0xFF,0xFD," +
    "0x00,0x41,0xD8,0x67,0xDE," +
    "0x3E,0x00,0x41,0xFF,0xFD," +
    "0x00,0x41,0x00,0x41,0x00," +
    "0x41,0xD8,0x67,0xDE,0x3E," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf16BeEncoderStream.prototype.readable,writable - fatal:true エラーなし", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream({
    start(controller) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= 15) {
          clearInterval(ti);
          controller.close();
          return;
        }
        controller.enqueue(td[c]);
        c = c + 1;
      }, 10);
    },
  });

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.Utf16BeEncoderStream({ fatal: true });

  const result = new Uint8Array(40);
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = "0x00,0x41,0x00,0x42,0x00," +
    "0x43,0x30,0x42,0x30,0x42," +
    "0x00,0x41,0xD8,0x67,0xDE," +
    "0x3E,0x00,0x41,0x30,0x42," +
    "0x00,0x41,0x00,0x41,0x00," +
    "0x41,0xD8,0x67,0xDE,0x3E," +
    "0x00,0x41,0x00,0x00,0x00," +
    "0x41,0x00,0x00,0x00,0x00";

  // assertStrictEquals(decoder.decode(result), td.join(""));
  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Text.Utf16BeEncoderStream.prototype.readable,writable - fatal:true 孤立サロゲートでエラー", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream({
    start(controller) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= 15) {
          clearInterval(ti);
          controller.close();
          return;
        }
        controller.enqueue(td[c]);
        c = c + 1;
      }, 10);
    },
  });

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.Utf16BeEncoderStream({ fatal: true });

  const result = new Uint8Array(40);
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

  const expected = "0x00,0x41,0x00,0x42,0x00," +
    "0x43,0x30,0x42,0x00,0x00," +
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

Deno.test("Text.Utf16BeEncoderStream.prototype.readable,writable - fatal:true 孤立サロゲートでエラー", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream({
    start(controller) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= 15) {
          clearInterval(ti);
          controller.close();
          return;
        }
        controller.enqueue(td[c]);
        c = c + 1;
      }, 10);
    },
  });

  await (() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  })();

  const encoder1 = new Text.Utf16BeEncoderStream({ fatal: true });

  const result = new Uint8Array(40);
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

  const expected = "0x00,0x41,0x00,0x42,0x00," +
    "0x43,0x30,0x42,0x00,0x00," +
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
