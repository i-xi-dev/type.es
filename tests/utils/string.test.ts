import { assertStrictEquals, assertThrows } from "@std/assert";
import { ExtString } from "../../mod.ts";

Deno.test("ExtString.isomorphicDecode", () => {
  // decode(ArrayBuffer)
  assertStrictEquals(ExtString.isomorphicDecode(new ArrayBuffer(0)), "");
  assertStrictEquals(
    ExtString.isomorphicDecode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    "ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(ExtString.isomorphicDecode(Uint8Array.of()), "");
  assertStrictEquals(
    ExtString.isomorphicDecode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    "ABCD",
  );
  assertStrictEquals(
    ExtString.isomorphicDecode(Uint8Array.of(0x0, 0xFF)),
    "\u0000\u00FF",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  assertStrictEquals(ExtString.isomorphicDecode(new Uint8Array(c)), t);
  //console.log(performance.now() - bf);

  // decode(any)
  assertThrows(
    () => {
      ExtString.isomorphicDecode(undefined as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );

  assertThrows(
    () => {
      ExtString.isomorphicDecode([] as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );
});

Deno.test("ExtString.isomorphicEncode", () => {
  // encode(string)
  assertStrictEquals(
    JSON.stringify([...ExtString.isomorphicEncode("")]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([...ExtString.isomorphicEncode("ABCD")]),
    "[65,66,67,68]",
  );
  assertStrictEquals(
    JSON.stringify([...ExtString.isomorphicEncode("\u0000\u00FF")]),
    "[0,255]",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  const rs = JSON.stringify([...ExtString.isomorphicEncode(t)]);
  //console.log(performance.now() - bf);
  assertStrictEquals(rs, JSON.stringify([...new Uint8Array(c)]));

  const em = "Code point of `input` must be less than or equal to 255.";
  assertThrows(
    () => {
      ExtString.isomorphicEncode("\u0100");
    },
    RangeError,
    em,
  );

  assertThrows(
    () => {
      ExtString.isomorphicEncode("あ");
    },
    RangeError,
    em,
  );

  // encode(any)
  assertThrows(
    () => {
      ExtString.isomorphicEncode(undefined as unknown as string);
    },
    TypeError,
    "`input` must be a \`string\`.",
  );

  assertThrows(
    () => {
      ExtString.isomorphicEncode(0 as unknown as string);
    },
    TypeError,
    "`input` must be a `string`.",
  );
});
