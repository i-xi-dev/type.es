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

  assertStrictEquals(u0.fragment, null);
  assertStrictEquals(u0b.fragment, null);
  assertStrictEquals(u1.fragment, null);
  assertStrictEquals(u2.fragment, null);
  assertStrictEquals(u3.fragment, null);
  assertStrictEquals(u4.fragment, null);
  assertStrictEquals(u5.fragment, null);
  assertStrictEquals(u6.fragment, null);

  const f7 = Uri.fromString("http://example.com:80/hoge#").fragment;
  assertStrictEquals(f7?.toString(), "");
  assertStrictEquals(f7?.toPercentDecoded(), "");

  const f8 = Uri.fromString("http://example.com:80/hoge#f<o>o").fragment;
  assertStrictEquals(f8?.toString(), "f%3Co%3Eo");
  assertStrictEquals(f8?.toPercentDecoded(), "f<o>o");

  const f9 = Uri.fromString("http://example.com:80/hoge#foo#5").fragment;
  assertStrictEquals(f9?.toString(), "foo#5");
  assertStrictEquals(f9?.toPercentDecoded(), "foo#5");

  const f10 = Uri.fromString("http://example.com:80/hoge#foo#5=%3CA").fragment;
  assertStrictEquals(f10?.toString(), "foo#5=%3CA");
  assertStrictEquals(f10?.toPercentDecoded(), "foo#5=<A");

  const f11 = Uri.fromString("http://example.com:80/hoge#foo#5%3DA").fragment;
  assertStrictEquals(f11?.toString(), "foo#5%3DA");
  assertStrictEquals(f11?.toPercentDecoded(), "foo#5=A");

  const f12 = Uri.fromString("http://example.com:80/hoge#%E3%81%82").fragment;
  assertStrictEquals(f12?.toString(), "%E3%81%82");
  assertStrictEquals(f12?.toPercentDecoded(), "あ");

  const f13 = Uri.fromString("http://example.com:80/hoge#あ").fragment;
  assertStrictEquals(f13?.toString(), "%E3%81%82");
  assertStrictEquals(f13?.toPercentDecoded(), "あ");

  const f14 =
    Uri.fromString("http://example.com:80/hoge#%20!%22%3C%3E%60%3").fragment;
  assertStrictEquals(f14?.toString(), "%20!%22%3C%3E%60%3");
  assertStrictEquals(f14?.toPercentDecoded(), ' !"<>`%3');

  const f15 = Uri.fromString("http://example.com:80/hoge#:~:text=foo").fragment;
  assertStrictEquals(f15?.toString(), ":~:text=foo");
  assertStrictEquals(f15?.toPercentDecoded(), ":~:text=foo");

  const f16 =
    Uri.fromString("http://example.com:80/hoge#:~:text=%E3%81%82").fragment;
  assertStrictEquals(f16?.toString(), ":~:text=%E3%81%82");
  assertStrictEquals(f16?.toPercentDecoded(), ":~:text=あ");
});
