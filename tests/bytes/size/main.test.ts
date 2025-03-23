import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../mod.ts";

Deno.test("new Bytes.BytesSize()", () => {
  const bc0 = new Bytes.BytesSize(0);
  assertStrictEquals(bc0.valueOf(), 0);

  const bcm = new Bytes.BytesSize(Number.MAX_SAFE_INTEGER);
  assertStrictEquals(bcm.valueOf(), Number.MAX_SAFE_INTEGER);

  assertThrows(
    () => {
      new Bytes.BytesSize(1.1);
    },
    TypeError,
    "`byteCount` must be a non-negative safe integer.",
  );
  assertThrows(
    () => {
      new Bytes.BytesSize(-1);
    },
    TypeError,
    "`byteCount` must be a non-negative safe integer.",
  );

  const bbc0 = new Bytes.BytesSize(0n);
  assertStrictEquals(bbc0.valueOf(), 0);

  assertThrows(
    () => {
      new Bytes.BytesSize(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    TypeError,
    "`byteCount` must be a non-negative `bigint` in the safe integer range.",
  );
  assertThrows(
    () => {
      new Bytes.BytesSize(-1n);
    },
    TypeError,
    "`byteCount` must be a non-negative `bigint` in the safe integer range.",
  );

  assertThrows(
    () => {
      new Bytes.BytesSize(undefined as unknown as number);
    },
    TypeError,
    "`byteCount` must be an integer.",
  );
  assertThrows(
    () => {
      new Bytes.BytesSize("1" as unknown as number);
    },
    TypeError,
    "`byteCount` must be an integer.",
  );
});

Deno.test("Bytes.BytesSize.prototype.to()", () => {
  const bc0 = new Bytes.BytesSize(0);
  assertStrictEquals(bc0.to(Bytes.BytesUnit.B), 0);
  assertStrictEquals(bc0.to(Bytes.BytesUnit.KIB), 0);
  assertStrictEquals(bc0.to(Bytes.BytesUnit.KB), 0);

  const bc1 = new Bytes.BytesSize(1000);
  assertStrictEquals(bc1.to(Bytes.BytesUnit.B), 1000);
  assertStrictEquals(bc1.to(Bytes.BytesUnit.KB), 1);

  const bc10 = new Bytes.BytesSize(10000);
  assertStrictEquals(bc10.to(Bytes.BytesUnit.B), 10000);
  assertStrictEquals(bc10.to(Bytes.BytesUnit.KB), 10);
  const format = new Intl.NumberFormat("en", {
    style: "unit",
    unit: Bytes.BytesUnit.KB,
  });
  assertStrictEquals(format.format(bc10.to(Bytes.BytesUnit.KB)), "10 kB");

  const bc1i = new Bytes.BytesSize(1024);
  assertStrictEquals(bc1i.to(Bytes.BytesUnit.B), 1024);
  assertStrictEquals(bc1i.to(Bytes.BytesUnit.KIB), 1);

  const bce1 = new Bytes.BytesSize(1);
  assertThrows(
    () => {
      bce1.to("" as unknown as Bytes.BytesUnit);
    },
    TypeError,
    "`unit` is unsupported.",
  );
  assertThrows(
    () => {
      bce1.to("b" as unknown as Bytes.BytesUnit);
    },
    TypeError,
    "`unit` is unsupported.",
  );

  const xbce1 = new Bytes.BytesSize(1);
  assertThrows(
    () => {
      xbce1.to(undefined as unknown as Bytes.BytesUnit);
    },
    TypeError,
    "`unit` is unsupported.",
  );
});

Deno.test("Bytes.BytesSize.prototype.toString()", () => {
  const bc0 = new Bytes.BytesSize(0);
  assertStrictEquals(bc0.toString(), "0");

  const bc1 = new Bytes.BytesSize(1000);
  assertStrictEquals(bc1.toString(), "1000");

  const bc1i = new Bytes.BytesSize(1024);
  assertStrictEquals(bc1i.toString(), "1024");
});

Deno.test("Bytes.BytesSize.prototype.toJSON()", () => {
  const bc0 = new Bytes.BytesSize(0);
  assertStrictEquals(bc0.toJSON(), 0);

  const bc1 = new Bytes.BytesSize(1000);
  assertStrictEquals(bc1.toJSON(), 1000);

  const bc1i = new Bytes.BytesSize(1024);
  assertStrictEquals(bc1i.toJSON(), 1024);
});

Deno.test("Bytes.BytesSize.prototype.valueOf()", () => {
  const bc0 = new Bytes.BytesSize(0);
  assertStrictEquals(bc0.valueOf(), 0);

  const bc1 = new Bytes.BytesSize(1000);
  assertStrictEquals(bc1.valueOf(), 1000);

  const bc1i = new Bytes.BytesSize(1024);
  assertStrictEquals(bc1i.valueOf(), 1024);
});
