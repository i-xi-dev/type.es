import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.withoutQuery()", () => {
  const u1 = Uri.fromString("http://example.com:80/hoge?a=1#a")
    .withoutQuery();
  assertStrictEquals(u1.toString(), "http://example.com/hoge#a");

  const u2 = Uri.fromString("http://example.com:80/hoge?a")
    .withoutQuery();
  assertStrictEquals(u2.toString(), "http://example.com/hoge");

  const u6 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  ).withoutQuery();
  assertStrictEquals(
    u6.toString(),
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );

  const u7 = Uri.fromString("data:,Hello%2C%20World!").withoutQuery();
  assertStrictEquals(u7.toString(), "data:,Hello%2C%20World!");
});
