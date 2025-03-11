import { assertStrictEquals, unreachable } from "@std/assert";
import { Text } from "../../../../mod.ts";

Deno.test("Text.UsAsciiDecoderStream.prototype.encoding", () => {
  const encoder = new Text.UsAsciiDecoderStream();
  assertStrictEquals(encoder.encoding, "us-ascii");
});

Deno.test("Text.UsAsciiDecoderStream.prototype.fatal", () => {
  const encoder1 = new Text.UsAsciiDecoderStream({ fatal: true });
  assertStrictEquals(encoder1.fatal, true);

  const encoder2 = new Text.UsAsciiDecoderStream({ fatal: false });
  assertStrictEquals(encoder2.fatal, false);

  const encoder3 = new Text.UsAsciiDecoderStream();
  assertStrictEquals(encoder3.fatal, false);
});

const streamSrc1 = [
  Uint8Array.of(0x41, 0x42, 0x43),
  Uint8Array.of(0x3F),
  Uint8Array.of(0x3F),
  Uint8Array.of(),
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
  Uint8Array.of(),
  Uint8Array.of(),
  Uint8Array.of(),
];

const streamExpected1 = [
  "ABC",
  "?",
  "?",
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
];

Deno.test("Text.UsAsciiDecoderStream.prototype.readable,writable - U+007FまでのUTF-8との比較", async () => {
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
        controller.enqueue(streamSrc1[c]);
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

  const decoder1 = new Text.UsAsciiDecoderStream();

  const result1: string[] = [];

  const ws = new WritableStream({
    write(chunk) {
      result1.push(chunk);
    },
  });
  await s.pipeThrough(decoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  assertStrictEquals(JSON.stringify(result1), JSON.stringify(streamExpected1));
});

Deno.test("- TextDecoderStream.prototype.readable,writable - U+007FまでのUTF-8との比較", async () => {
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
        controller.enqueue(streamSrc1[c]);
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

  const decoder1 = new TextDecoderStream();

  const result1: string[] = [];

  const ws = new WritableStream({
    write(chunk) {
      result1.push(chunk);
    },
  });
  await s.pipeThrough(decoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  assertStrictEquals(JSON.stringify(result1), JSON.stringify(streamExpected1));
});

Deno.test("Text.UsAsciiDecoderStream.prototype.readable,writable - fatal:false", async () => {
  const td = [
    Uint8Array.of(0x41, 0x42, 0x43),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x3F),
    Uint8Array.of(),
    Uint8Array.of(0x41),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x41, 0xFF), // error
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x00),
    Uint8Array.of(0x3F),
    Uint8Array.of(),
    Uint8Array.of(),
    Uint8Array.of(),
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

  const encoder1 = new Text.UsAsciiDecoderStream();

  const result: string[] = [];
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.push(chunk);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = [
    "ABC",
    "?",
    "?",
    "A",
    "?",
    "A",
    "?",
    "A",
    "A?",
    "?",
    "A",
    "\u0000",
    "?",
  ];

  assertStrictEquals(JSON.stringify(result), JSON.stringify(expected));
});

Deno.test("Text.UsAsciiDecoderStream.prototype.readable,writable - fatal:false; replacementChar:string", async () => {
  const td = [
    Uint8Array.of(0x41, 0x42, 0x43),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x3F),
    Uint8Array.of(),
    Uint8Array.of(0x41),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x41, 0xFF), // error
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x00),
    Uint8Array.of(0x3F),
    Uint8Array.of(),
    Uint8Array.of(),
    Uint8Array.of(),
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

  const encoder1 = new Text.UsAsciiDecoderStream({
    fatal: false,
    replacementChar: "_",
  });

  const result: string[] = [];
  let written = 0;
  const ws = new WritableStream({
    write(chunk) {
      result.push(chunk);
      written = written + chunk.byteLength;
    },
  });
  await s.pipeThrough(encoder1).pipeTo(ws);
  //await s.pipeTo(ws);

  const expected = [
    "ABC",
    "?",
    "?",
    "A",
    "?",
    "A",
    "?",
    "A",
    "A_",
    "?",
    "A",
    "\u0000",
    "?",
  ];

  assertStrictEquals(JSON.stringify(result), JSON.stringify(expected));
});

Deno.test("Text.UsAsciiDecoderStream.prototype.readable,writable - fatal:true", async () => {
  const td = [
    Uint8Array.of(0x41, 0x42, 0x43),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x3F),
    Uint8Array.of(),
    Uint8Array.of(0x41),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x41, 0xFF), // error
    Uint8Array.of(0x3F),
    Uint8Array.of(0x41),
    Uint8Array.of(0x00),
    Uint8Array.of(0x3F),
    Uint8Array.of(),
    Uint8Array.of(),
    Uint8Array.of(),
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

  const encoder1 = new Text.UsAsciiDecoderStream({ fatal: true });

  const result: string[] = [];
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
      assertStrictEquals(reason.message, "decode-error: 0xFF");
    },
  });

  try {
    await s.pipeThrough(encoder1).pipeTo(ws);
    unreachable();
  } catch (e) {
    assertStrictEquals(e instanceof Error, true);
    if (e instanceof Error) {
      assertStrictEquals(e.name, "TypeError");
      assertStrictEquals(e.message, "decode-error: 0xFF");
    }
  }

  const expected = [
    "ABC",
    "?",
    "?",
    "A",
    "?",
    "A",
    "?",
    "A",
    // "A?",
    // "?",
    // "A",
    // "\u0000",
    // "?",
  ];

  assertStrictEquals(JSON.stringify(result), JSON.stringify(expected));
});

// Deno.test("- 比較テスト - TextDecoderStream.prototype.readable,writable - fatal:true", async () => {
//   try {
//     const td = [
//       Uint8Array.of(0x41, 0x42, 0x43),
//       Uint8Array.of(0x3F),
//       Uint8Array.of(0x3F),
//       Uint8Array.of(),
//       Uint8Array.of(0x41),
//       Uint8Array.of(0x3F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF), // error
//       Uint8Array.of(0x41),
//       Uint8Array.of(0x3F),
//       Uint8Array.of(0x41),
//       Uint8Array.of(0x41, 0xFF),
//       Uint8Array.of(0x3F),
//       Uint8Array.of(0x41),
//       Uint8Array.of(0x00),
//       Uint8Array.of(0x3F),
//       Uint8Array.of(),
//       Uint8Array.of(),
//       Uint8Array.of(),
//     ];

//     // deno-lint-ignore no-explicit-any
//     let ti: any;
//     const s = new ReadableStream({
//       start(controller) {
//         let c = 0;
//         ti = setInterval(() => {
//           if (c >= 15) {
//             clearInterval(ti);
//             controller.close();
//             return;
//           }
//           controller.enqueue(td[c]);
//           c = c + 1;
//         }, 10);
//       },
//     });

//     await (() => {
//       return new Promise<void>((resolve) => {
//         setTimeout(() => {
//           resolve();
//         }, 200);
//       });
//     })();

//     const encoder1 = new TextDecoderStream("utf-8", { fatal: true });

//     const result: string[] = [];
//     let written = 0;
//     const ws = new WritableStream({
//       write(chunk) {
//         result.push(chunk);
//         written = written + chunk.byteLength;
//       },
//       abort(reason) {
//         assertStrictEquals(reason.name, "TypeError");
//         //assertStrictEquals(reason.message, "decode-error: 0xFF");
//       },
//     });

//     try {
//       await s.pipeThrough(encoder1).pipeTo(ws);

//       // await s.pipeThrough(encoder1).pipeTo(ws).catch(async (e) => {
//       //   console.log("pipeTo().catch()");
//       //   console.log(e);
//       // });
//     } catch (e) {
//       console.log("try-catch");
//       console.log(e);
//     }
//     await encoder1.readable.cancel(); // ？

//     const expected = [
//       "ABC",
//       "?",
//       "?",
//       "A",
//       // "?",
//       // "A",
//       // "?",
//       // "A",
//       // "A?",
//       // "?",
//       // "A",
//       // "\u0000",
//       // "?",
//     ];

//     assertStrictEquals(JSON.stringify(result), JSON.stringify(expected));
//   } catch (e) {
//     console.log("root"); // たぶんTextDecoderStreamの問題
//     console.log(e);
//   }
// });
