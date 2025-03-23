import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../../mod.ts";
import { delay } from "../../../test_utils.ts";

Deno.test("Bytes.Base64EncoderStream.prototype.writable - 1", async () => {
  const td = [
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
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
      }, 20);
    });
  })();

  const encoder = new Bytes.Base64EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "AwIBAP/+/fw=";

  assertStrictEquals(result, expected);
});

Deno.test("Bytes.Base64EncoderStream.prototype.writable - 2", async () => {
  const td = [
    Uint8Array.of(
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
    ),
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
      }, 20);
    });
  })();

  const encoder = new Bytes.Base64EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw=";

  assertStrictEquals(result, expected);
});

Deno.test("Bytes.Base64EncoderStream.prototype.writable - 3", async () => {
  const td = [
    Uint8Array.of(0x03),
    Uint8Array.of(0x02),
    Uint8Array.of(0x01),
    Uint8Array.of(0x00),
    Uint8Array.of(0xFF),
    Uint8Array.of(0xFE),
    Uint8Array.of(0xFD),
    Uint8Array.of(0xFC),
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

  const encoder = new Bytes.Base64EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "AwIBAP/+/fw=";

  assertStrictEquals(result, expected);
});

Deno.test("Bytes.Base64EncoderStream.prototype.writable - 4", async () => {
  const td = [
    Uint8Array.of(
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
    ),
    Uint8Array.of(),
    Uint8Array.of(
      0x03,
      0x02,
    ),
    Uint8Array.of(
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
    ),
    Uint8Array.of(0xFC),
    Uint8Array.of(),
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

  const encoder = new Bytes.Base64EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected =
    "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/A==";

  assertStrictEquals(result, expected);
});
