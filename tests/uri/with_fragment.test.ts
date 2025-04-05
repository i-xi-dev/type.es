import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.withFragment()", () => {
  const u1 = Uri.fromString("http://example.com:80/hoge#foo")
    .withFragment("a");
  assertStrictEquals(u1.toString(), "http://example.com/hoge#a");

  const u2 = Uri.fromString("http://example.com:80/hoge#foo")
    .withFragment("#a");
  assertStrictEquals(u2.toString(), "http://example.com/hoge##a");

  const u3 = Uri.fromString("http://example.com:80/hoge#foo")
    .withFragment("a<2");
  assertStrictEquals(u3.toString(), "http://example.com/hoge#a%3C2");

  // const u4 = Uri.fromString("http://example.com:80/hoge#foo")
  //   .withFragment("");
  // assertStrictEquals(u4.toString(), "http://example.com/hoge");

  const u5 = Uri.fromString("http://example.com:80/hoge#foo")
    .withFragment("#h#o#g#e");
  assertStrictEquals(u5.toString(), "http://example.com/hoge##h#o#g#e");

  const u6 = Uri.fromString("http://example.com:80/hoge#foo")
    .withFragment('# h"#<o>#g#`e');
  assertStrictEquals(
    u6.toString(),
    "http://example.com/hoge##%20h%22#%3Co%3E#g#%60e",
  );

  const u7 = Uri.fromString("http://example.com:80/hoge#foo")
    .withFragment("あ");
  assertStrictEquals(u7.toString(), "http://example.com/hoge#%E3%81%82");
});

Deno.test("Uri.prototype.withFragment()", () => {
  const u1 = Uri.fromString("http://example.com:80/hoge#foo");
  assertThrows(
    () => {
      u1.withFragment(1 as unknown as string);
    },
    TypeError,
    "`rawFragment` must be a non-empty string.",
  );
});
