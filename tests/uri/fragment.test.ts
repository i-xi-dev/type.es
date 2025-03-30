import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.fragment", () => {
  const u0 = Uri.fromString("http://example.com:8080/");
  const u0b = Uri.fromString("Http://example.COM:8080/");
  const u1 = Uri.fromString("http://example.com:80/hoge");
  const u2 = Uri.fromString("https://example.com:80/hoge");
  const u3 = Uri.fromString("file:///D:/hoge/index.txt");
  const u4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  const u5 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  const u6 = Uri.fromString("data:,Hello%2C%20World!");

  assertStrictEquals(u0.fragment, "");
  assertStrictEquals(u0b.fragment, "");
  assertStrictEquals(u1.fragment, "");
  assertStrictEquals(u2.fragment, "");
  assertStrictEquals(u3.fragment, "");
  assertStrictEquals(u4.fragment, "");
  assertStrictEquals(u5.fragment, "");
  assertStrictEquals(u6.fragment, "");

  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#").fragment,
    "",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#f<o>o").fragment,
    "f<o>o",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#foo#5").fragment,
    "foo#5",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#foo#5=%3CA").fragment,
    "foo#5=<A",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#foo#5%3DA").fragment,
    "foo#5=A",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#%E3%81%82").fragment,
    "あ",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#あ").fragment,
    "あ",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#%20!%22%3C%3E%60%3")
      .fragment,
    ' !"<>`%3',
  );
  
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#:~:text=foo").fragment,
    ":~:text=foo",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#:~:text=%E3%81%82").fragment,
    ":~:text=あ",
  );
});
