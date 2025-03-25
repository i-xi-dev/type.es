import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../mod.ts";

Deno.test("Bytes.toString()", () => {
  assertThrows(
    () => {
      Bytes.toString(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertThrows(
    () => {
      Bytes.toString(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertStrictEquals(Bytes.toString(Uint8Array.of().buffer), "");
  assertStrictEquals(
    Bytes.toString(Uint8Array.of(1, 0, 3, 2).buffer),
    "01000302",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 255, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(Bytes.toString(b2b.buffer), "0000000001000302FF010101");
});

Deno.test("Bytes.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(
    Bytes.toString(Uint8Array.of().buffer, op),
    "",
  );
  assertStrictEquals(
    Bytes.toString(Uint8Array.of(1, 0, 3, 2).buffer, op),
    "001000003002",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 255, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    Bytes.toString(b2b.buffer, op),
    "000000000000001000003002255001001001",
  );
});

Deno.test("Bytes.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(
    Bytes.toString(Uint8Array.of().buffer, op),
    "",
  );
  assertStrictEquals(
    Bytes.toString(Uint8Array.of(1, 0, 3, 2).buffer, op),
    "001000003002",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 255, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    Bytes.toString(b2b.buffer, op),
    "000000000000001000003002377001001001",
  );
});

Deno.test("Bytes.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(
    Bytes.toString(Uint8Array.of().buffer, op),
    "",
  );
  assertStrictEquals(
    Bytes.toString(Uint8Array.of(1, 0, 3, 2).buffer, op),
    "00000001000000000000001100000010",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 255, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    Bytes.toString(b2b.buffer, op),
    "000000000000000000000000000000000000000100000000000000110000001011111111000000010000000100000001",
  );
});

Deno.test("Bytes.toString() - separator", () => {
  const op = { radix: 10, separator: "," } as const;

  assertStrictEquals(
    Bytes.toString(Uint8Array.of().buffer, op),
    "",
  );
  assertStrictEquals(
    Bytes.toString(Uint8Array.of(1, 0, 3, 2).buffer, op),
    "001,000,003,002",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 255, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    Bytes.toString(b2b.buffer, op),
    "000,000,000,000,001,000,003,002,255,001,001,001",
  );
});

Deno.test("Bytes.toString() - lowerCase", () => {
  const op = { lowerCase: true } as const;

  assertStrictEquals(
    Bytes.toString(Uint8Array.of().buffer, op),
    "",
  );
  assertStrictEquals(
    Bytes.toString(Uint8Array.of(1, 0, 3, 2).buffer, op),
    "01000302",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 255, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    Bytes.toString(b2b.buffer, op),
    "0000000001000302ff010101",
  );
});

Deno.test("Bytes.toStringIterable()", () => {
  assertThrows(
    () => {
      Bytes.toStringIterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertThrows(
    () => {
      Bytes.toStringIterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "`value` must be an `ArrayBuffer`.",
  );

  assertStrictEquals(
    [...Bytes.toStringIterable(Uint8Array.of().buffer)].join("-"),
    "",
  );
  assertStrictEquals(
    [...Bytes.toStringIterable(Uint8Array.of(1, 0, 3, 2).buffer)].join("-"),
    "01-00-03-02",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 255, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    [...Bytes.toStringIterable(b2b.buffer)].join(":"),
    "00:00:00:00:01:00:03:02:FF:01:01:01",
  );
});
