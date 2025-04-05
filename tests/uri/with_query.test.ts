import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.Absolute.prototype.withQuery(Array<string>)", () => {
  // const u0 = Uri.fromString("http://example.com:80/hoge?a=1")
  //   .withQuery("");
  // assertStrictEquals(u0.toString(), "http://example.com/hoge");

  const u1 = Uri.fromString("http://example.com:80/hoge?a=1")
    .withQuery("b=2");
  assertStrictEquals(u1.toString(), "http://example.com/hoge?b=2");

  const u2 = Uri.fromString("http://example.com:80/hoge#foo")
    .withQuery("b=3&c=1");
  assertStrictEquals(u2.toString(), "http://example.com/hoge?b=3&c=1#foo");

  const u3 = Uri.fromString("http://example.com:80/hoge#foo")
    .withQuery("b=3&b=1");
  assertStrictEquals(u3.toString(), "http://example.com/hoge?b=3&b=1#foo");

  const u4 = Uri.fromString("http://example.com:80/hoge").withQuery("b=2%3D4");
  assertStrictEquals(u4.toString(), "http://example.com/hoge?b=2%3D4");

  const u5 = Uri.fromString("http://example.com:80/hoge").withQuery("b=");
  assertStrictEquals(u5.toString(), "http://example.com/hoge?b=");

  const u6 = Uri.fromString("http://example.com:80/hoge").withQuery(
    "b=%E3%81%82",
  );
  assertStrictEquals(u6.toString(), "http://example.com/hoge?b=%E3%81%82");

  const u7 = Uri.fromString("http://example.com:80/hoge?a=1")
    .withQuery("=");
  assertStrictEquals(u7.toString(), "http://example.com/hoge?=");

  const u1B = Uri.fromString("http://example.com:80/hoge?a=1");
  assertThrows(
    () => {
      u1B.withQuery("");
    },
    TypeError,
    "`rawQuery` must be a non-empty string.",
  );

  const u1Bb = Uri.fromString("http://example.com:80/hoge?a=1");
  assertThrows(
    () => {
      u1Bb.withQuery(0 as unknown as string);
    },
    TypeError,
    "`rawQuery` must be a non-empty string.",
  );
});
