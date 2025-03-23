import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../mod.ts";

Deno.test("Bytes.BytesUnit.B", () => {
  assertStrictEquals(Bytes.BytesUnit.B, "byte");
});

Deno.test("Bytes.BytesUnit.KB", () => {
  assertStrictEquals(Bytes.BytesUnit.KB, "kilobyte");
});

Deno.test("Bytes.BytesUnit.KIB", () => {
  assertStrictEquals(Bytes.BytesUnit.KIB, "kibibyte");
});

Deno.test("Bytes.BytesUnit.MB", () => {
  assertStrictEquals(Bytes.BytesUnit.MB, "megabyte");
});

Deno.test("Bytes.BytesUnit.MIB", () => {
  assertStrictEquals(Bytes.BytesUnit.MIB, "mebibyte");
});

Deno.test("Bytes.BytesUnit.GB", () => {
  assertStrictEquals(Bytes.BytesUnit.GB, "gigabyte");
});

Deno.test("Bytes.BytesUnit.GIB", () => {
  assertStrictEquals(Bytes.BytesUnit.GIB, "gibibyte");
});

Deno.test("Bytes.BytesUnit.TB", () => {
  assertStrictEquals(Bytes.BytesUnit.TB, "terabyte");
});

Deno.test("Bytes.BytesUnit.TIB", () => {
  assertStrictEquals(Bytes.BytesUnit.TIB, "tebibyte");
});

Deno.test("Bytes.BytesUnit.PB", () => {
  assertStrictEquals(Bytes.BytesUnit.PB, "petabyte");
});

Deno.test("Bytes.BytesUnit.PIB", () => {
  assertStrictEquals(Bytes.BytesUnit.PIB, "pebibyte");
});
