import { assertStrictEquals, assertThrows } from "@std/assert";
import { Bytes } from "../../../mod.ts";

Deno.test("new Bytes.Size(number)", () => {
  const bc0 = new Bytes.Size(0);
  assertStrictEquals(bc0.valueOf(), 0);

  const bcm = new Bytes.Size(Number.MAX_SAFE_INTEGER);
  assertStrictEquals(bcm.valueOf(), Number.MAX_SAFE_INTEGER);

  assertThrows(
    () => {
      new Bytes.Size(1.1);
    },
    RangeError,
    "byteCount",
  );
  assertThrows(
    () => {
      new Bytes.Size(-1);
    },
    RangeError,
    "byteCount",
  );
});

Deno.test("new Bytes.Size(bigint)", () => {
  const bc0 = new Bytes.Size(0n);
  assertStrictEquals(bc0.valueOf(), 0);

  assertThrows(
    () => {
      new Bytes.Size(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    RangeError,
    "byteCount",
  );
  assertThrows(
    () => {
      new Bytes.Size(-1n);
    },
    RangeError,
    "byteCount",
  );
});

Deno.test("new Bytes.Size(any)", () => {
  assertThrows(
    () => {
      new Bytes.Size(undefined as unknown as number);
    },
    TypeError,
    "byteCount",
  );
  assertThrows(
    () => {
      new Bytes.Size("1" as unknown as number);
    },
    TypeError,
    "byteCount",
  );
});

Deno.test("Bytes.Size.prototype.to(string)", () => {
  const bc0 = new Bytes.Size(0);
  assertStrictEquals(bc0.to(Bytes.Unit.B), 0);
  assertStrictEquals(bc0.to(Bytes.Unit.KIB), 0);
  assertStrictEquals(bc0.to(Bytes.Unit.KB), 0);

  const bc1 = new Bytes.Size(1000);
  assertStrictEquals(bc1.to(Bytes.Unit.B), 1000);
  assertStrictEquals(bc1.to(Bytes.Unit.KB), 1);

  const bc10 = new Bytes.Size(10000);
  assertStrictEquals(bc10.to(Bytes.Unit.B), 10000);
  assertStrictEquals(bc10.to(Bytes.Unit.KB), 10);
  const format = new Intl.NumberFormat("en", {
    style: "unit",
    unit: Bytes.Unit.KB,
  });
  assertStrictEquals(format.format(bc10.to(Bytes.Unit.KB)), "10 kB");

  const bc1i = new Bytes.Size(1024);
  assertStrictEquals(bc1i.to(Bytes.Unit.B), 1024);
  assertStrictEquals(bc1i.to(Bytes.Unit.KIB), 1);

  const bce1 = new Bytes.Size(1);
  assertThrows(
    () => {
      bce1.to("" as unknown as Bytes.Unit);
    },
    RangeError,
    "unit",
  );
  assertThrows(
    () => {
      bce1.to("b" as unknown as Bytes.Unit);
    },
    RangeError,
    "unit",
  );
});

Deno.test("Bytes.Size.prototype.to(any)", () => {
  const bce1 = new Bytes.Size(1);
  assertThrows(
    () => {
      bce1.to(undefined as unknown as Bytes.Unit);
    },
    TypeError,
    "unit",
  );
});

Deno.test("Bytes.Size.prototype.valueOf()", () => {
  const bc0 = new Bytes.Size(0);
  assertStrictEquals(bc0.valueOf(), 0);

  const bc1 = new Bytes.Size(1000);
  assertStrictEquals(bc1.valueOf(), 1000);

  const bc1i = new Bytes.Size(1024);
  assertStrictEquals(bc1i.valueOf(), 1024);
});
