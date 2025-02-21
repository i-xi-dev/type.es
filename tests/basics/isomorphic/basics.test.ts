import { assertStrictEquals, assertThrows } from "@std/assert";
import { Isomorphic } from "../../../mod.ts";

Deno.test("Isomorphic.decode", () => {
  // decode(ArrayBuffer)
  assertStrictEquals(Isomorphic.decode(new ArrayBuffer(0)), "");
  assertStrictEquals(
    Isomorphic.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44).buffer),
    "ABCD",
  );

  // decode(Uint8Array)
  assertStrictEquals(Isomorphic.decode(Uint8Array.of()), "");
  assertStrictEquals(
    Isomorphic.decode(Uint8Array.of(0x41, 0x42, 0x43, 0x44)),
    "ABCD",
  );
  assertStrictEquals(
    Isomorphic.decode(Uint8Array.of(0x0, 0xFF)),
    "\u0000\u00FF",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  assertStrictEquals(Isomorphic.decode(new Uint8Array(c)), t);
  //console.log(performance.now() - bf);

  // decode(any)
  assertThrows(
    () => {
      Isomorphic.decode(undefined as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );

  assertThrows(
    () => {
      Isomorphic.decode([] as unknown as Uint8Array);
    },
    TypeError,
    "`input` must be a `BufferSource`.",
  );
});

Deno.test("Isomorphic.encode", () => {
  // encode(string)
  assertStrictEquals(
    JSON.stringify([...Isomorphic.encode("")]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([...Isomorphic.encode("ABCD")]),
    "[65,66,67,68]",
  );
  assertStrictEquals(
    JSON.stringify([...Isomorphic.encode("\u0000\u00FF")]),
    "[0,255]",
  );

  const c = 1200000;
  const t = "\u0000".repeat(c);
  //const bf = performance.now();
  const rs = JSON.stringify([...Isomorphic.encode(t)]);
  //console.log(performance.now() - bf);
  assertStrictEquals(rs, JSON.stringify([...new Uint8Array(c)]));

  const em = "Code point of `input` must be less than or equal to 255.";
  assertThrows(
    () => {
      Isomorphic.encode("\u0100");
    },
    RangeError,
    em,
  );

  assertThrows(
    () => {
      Isomorphic.encode("あ");
    },
    RangeError,
    em,
  );

  // encode(any)
  assertThrows(
    () => {
      Isomorphic.encode(undefined as unknown as string);
    },
    TypeError,
    "`input` must be a \`string\`.",
  );

  assertThrows(
    () => {
      Isomorphic.encode(0 as unknown as string);
    },
    TypeError,
    "`input` must be a `string`.",
  );
});
