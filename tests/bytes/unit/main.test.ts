import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../mod.ts";

Deno.test("Bytes.Unit.B", () => {
  assertStrictEquals(Bytes.Unit.B, "byte");
});

Deno.test("Bytes.Unit.KB", () => {
  assertStrictEquals(Bytes.Unit.KB, "kilobyte");
});

Deno.test("Bytes.Unit.KIB", () => {
  assertStrictEquals(Bytes.Unit.KIB, "kibibyte");
});

Deno.test("Bytes.Unit.MB", () => {
  assertStrictEquals(Bytes.Unit.MB, "megabyte");
});

Deno.test("Bytes.Unit.MIB", () => {
  assertStrictEquals(Bytes.Unit.MIB, "mebibyte");
});

Deno.test("Bytes.Unit.GB", () => {
  assertStrictEquals(Bytes.Unit.GB, "gigabyte");
});

Deno.test("Bytes.Unit.GIB", () => {
  assertStrictEquals(Bytes.Unit.GIB, "gibibyte");
});

Deno.test("Bytes.Unit.TB", () => {
  assertStrictEquals(Bytes.Unit.TB, "terabyte");
});

Deno.test("Bytes.Unit.TIB", () => {
  assertStrictEquals(Bytes.Unit.TIB, "tebibyte");
});

Deno.test("Bytes.Unit.PB", () => {
  assertStrictEquals(Bytes.Unit.PB, "petabyte");
});

Deno.test("Bytes.Unit.PIB", () => {
  assertStrictEquals(Bytes.Unit.PIB, "pebibyte");
});
