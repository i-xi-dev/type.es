import { assertStrictEquals, unreachable } from "@std/assert";
import { Bytes } from "../../../../mod.ts";
import { delay } from "../../../test_utils.ts";

Deno.test("Bytes.Base64DecoderStream.prototype.writable - 1", async () => {
  const td = ["AwIBAP/+/fw="];

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
      }, 20);
    });
  })();

  const decoder = new Bytes.Base64DecoderStream();

  const result = new Uint8Array(10);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough<Uint8Array>({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF," +
    "0xFE,0xFD,0xFC,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Bytes.Base64DecoderStream.prototype.writable - 2", async () => {
  const td = ["AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw="];

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
      }, 20);
    });
  })();

  const decoder = new Bytes.Base64DecoderStream();

  const result = new Uint8Array(40);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Bytes.Base64DecoderStream.prototype.writable - 3", async () => {
  const td = ["A", "w", "I", "B", "A", "P", "/", "+", "/", "f", "w", "="];

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
      }, 300);
    });
  })();

  const decoder = new Bytes.Base64DecoderStream();

  const result = new Uint8Array(10);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF," +
    "0xFE,0xFD,0xFC,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Bytes.Base64DecoderStream.prototype.writable - 4", async () => {
  const td = [
    "AwIBAP/+/fwDAgEA//79/AMC",
    "AQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIB",
    "AP/+/fwDAgEA//79/A=",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "=",
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
      }, 300);
    });
  })();

  const decoder = new Bytes.Base64DecoderStream();

  const result = new Uint8Array(70);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x00,0x00,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Bytes.Base64DecoderStream.prototype.writable - error", async () => {
  const td = ["A", "w", "あ", "B", "A", "P", "/", "+", "/", "f", "w", "="];

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
      }, 300);
    });
  })();

  const decoder = new Bytes.Base64DecoderStream();

  const result = new Uint8Array(10);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
    abort(reason) {
      console.log("UnderlyingSink.abort");
      //console.log(reason);
      assertStrictEquals(reason.name, "TypeError");
      assertStrictEquals(
        reason.message,
        "`encoded` contains invalid character.",
      );
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  try {
    await s.pipeThrough({
      readable,
      writable,
    }).pipeTo(ws);
    unreachable();
  } catch (e) {
    assertStrictEquals(e instanceof Error, true);
    if (e instanceof Error) {
      assertStrictEquals(e.name, "TypeError");
      assertStrictEquals(e.message, "`encoded` contains invalid character.");
    }
  }
});
