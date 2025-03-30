import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.withoutFragment()", () => {
  const u1 = Uri.fromString("http://example.com:80/hoge?a=1#")
    .withoutFragment();
  assertStrictEquals(u1.fragment, null);
  assertStrictEquals(u1.toString(), "http://example.com/hoge?a=1");

  const u2 = Uri.fromString("http://example.com:80/hoge#f<o>o")
    .withoutFragment();
  assertStrictEquals(u2.fragment, null);
  assertStrictEquals(u2.toString(), "http://example.com/hoge");

  const u3 = Uri.fromString("http://example.com:80/hoge?a=1#foo#5")
    .withoutFragment();
  assertStrictEquals(u3.fragment, null);
  assertStrictEquals(u3.toString(), "http://example.com/hoge?a=1");

  const u4 = Uri.fromString("http://example.com:80/hoge#foo#5=%3CA")
    .withoutFragment();
  assertStrictEquals(u4.fragment, null);
  assertStrictEquals(u4.toString(), "http://example.com/hoge");

  const u5 = Uri.fromString("http://example.com:80/hoge#foo#5%3DA")
    .withoutFragment();
  assertStrictEquals(u5.fragment, null);
  assertStrictEquals(u5.toString(), "http://example.com/hoge");

  const u6 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  ).withoutFragment();
  assertStrictEquals(u6.fragment, null);
  assertStrictEquals(
    u6.toString(),
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );

  const u7 = Uri.fromString("data:,Hello%2C%20World!")
    .withoutFragment();
  assertStrictEquals(u7.fragment, null);
  assertStrictEquals(u7.toString(), "data:,Hello%2C%20World!");

  const u11b = Uri.fromString("http://example.com:80/hoge?a=1#test");
  const u11 = u11b.withoutFragment();
  assertStrictEquals(u11.fragment, null);
  assertStrictEquals(u11.toString(), "http://example.com/hoge?a=1");
  assertStrictEquals(u11b.toString(), "http://example.com/hoge?a=1#test");
});
