import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../../mod.ts";

function test(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  const binStr = [...bytes].map((byte) => String.fromCharCode(byte)).join("");
  return globalThis.btoa(binStr);
}

Deno.test("Bytes.Base64Encoder.prototype.encode()", () => {
  const encoder = new Bytes.Base64Encoder();

  assertStrictEquals(encoder.encode(Uint8Array.of()), "");
  assertStrictEquals(
    encoder.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252)),
    "AwIBAP/+/fw=",
  );
  assertStrictEquals(encoder.encode(Uint8Array.of(255)), "/w==");
  assertStrictEquals(encoder.encode(Uint8Array.of(251)), "+w==");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(encoder.encode(r1), test(r1.buffer));
  assertStrictEquals(encoder.encode(r2), test(r2.buffer));
  assertStrictEquals(encoder.encode(r3), test(r3.buffer));
  assertStrictEquals(encoder.encode(r4), test(r4.buffer));
  assertStrictEquals(encoder.encode(r5), test(r5.buffer));
  assertStrictEquals(encoder.encode(r6), test(r6.buffer));
  assertStrictEquals(encoder.encode(r7), test(r7.buffer));
  assertStrictEquals(encoder.encode(r8), test(r8.buffer));
  assertStrictEquals(encoder.encode(r9), test(r9.buffer));

  assertThrows(
    () => {
      encoder.encode([] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "`toEncode` must be an `Uint8Array<ArrayBuffer>`.",
  );
});

Deno.test("Bytes.Base64Encoder.prototype.encode() - noPadding:true", () => {
  const encoder = new Bytes.Base64Encoder({ noPadding: true });

  assertStrictEquals(encoder.encode(Uint8Array.of()), "");
  assertStrictEquals(
    encoder.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252)),
    "AwIBAP/+/fw",
  );
  assertStrictEquals(encoder.encode(Uint8Array.of(255)), "/w");
  assertStrictEquals(encoder.encode(Uint8Array.of(251)), "+w");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(encoder.encode(r1), test(r1.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r2), test(r2.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r3), test(r3.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r4), test(r4.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r5), test(r5.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r6), test(r6.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r7), test(r7.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r8), test(r8.buffer).replace(/=*$/, ""));
  assertStrictEquals(encoder.encode(r9), test(r9.buffer).replace(/=*$/, ""));
});

Deno.test("Bytes.Base64Encoder.prototype.encode() - paddingChar:'!'", () => {
  const encoder = new Bytes.Base64Encoder({ paddingChar: "!" });

  assertStrictEquals(encoder.encode(Uint8Array.of()), "");
  assertStrictEquals(
    encoder.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252)),
    "AwIBAP/+/fw!",
  );
  assertStrictEquals(encoder.encode(Uint8Array.of(255)), "/w!!");
  assertStrictEquals(encoder.encode(Uint8Array.of(251)), "+w!!");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(encoder.encode(r1), test(r1.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r2), test(r2.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r3), test(r3.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r4), test(r4.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r5), test(r5.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r6), test(r6.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r7), test(r7.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r8), test(r8.buffer).replace(/=/g, "!"));
  assertStrictEquals(encoder.encode(r9), test(r9.buffer).replace(/=/g, "!"));
});

Deno.test("Bytes.Base64Encoder.prototype.encode() - Rfc4648Base64UrlOptions", () => {
  const encoder = new Bytes.Base64Encoder({
    rawTable: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "_",
    ],
    noPadding: true,
    paddingChar: "=",
  });

  assertStrictEquals(encoder.encode(Uint8Array.of()), "");
  assertStrictEquals(
    encoder.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252)),
    "AwIBAP_-_fw",
  );
  assertStrictEquals(encoder.encode(Uint8Array.of(255)), "_w");
  assertStrictEquals(encoder.encode(Uint8Array.of(251)), "-w");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(
    encoder.encode(r1),
    test(r1.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r2),
    test(r2.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r3),
    test(r3.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r4),
    test(r4.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r5),
    test(r5.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r6),
    test(r6.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r7),
    test(r7.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r8),
    test(r8.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    encoder.encode(r9),
    test(r9.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
});
