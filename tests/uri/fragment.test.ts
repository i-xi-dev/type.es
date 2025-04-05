import { assertStrictEquals } from "@std/assert";
import { Uri, UriFragmentIdentifier } from "../../mod.ts";

Deno.test("Uri.prototype.fragment", () => {
  const u0 = Uri.fromString("http://example.com:8080/");
  assertStrictEquals(u0.fragment, null);

  const u0b = Uri.fromString("Http://example.COM:8080/");
  assertStrictEquals(u0b.fragment, null);

  const u1 = Uri.fromString("http://example.com:80/hoge");
  assertStrictEquals(u1.fragment, null);

  const u2 = Uri.fromString("https://example.com:80/hoge");
  assertStrictEquals(u2.fragment, null);

  const u3 = Uri.fromString("file:///D:/hoge/index.txt");
  assertStrictEquals(u3.fragment, null);

  const u4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  assertStrictEquals(u4.fragment, null);

  const u5 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  assertStrictEquals(u5.fragment, null);

  const u6 = Uri.fromString("data:,Hello%2C%20World!");
  assertStrictEquals(u6.fragment, null);

  const f7 = Uri.fromString("http://example.com:80/hoge#").fragment;
  assertStrictEquals(f7, "");
  assertStrictEquals(UriFragmentIdentifier.decode(f7), "");

  const f8 = Uri.fromString("http://example.com:80/hoge#f<o>o").fragment;
  assertStrictEquals(f8, "f%3Co%3Eo");
  assertStrictEquals(UriFragmentIdentifier.decode(f8), "f<o>o");

  const f9 = Uri.fromString("http://example.com:80/hoge#foo#5").fragment;
  assertStrictEquals(f9, "foo#5");
  assertStrictEquals(UriFragmentIdentifier.decode(f9), "foo#5");

  const f10 = Uri.fromString("http://example.com:80/hoge#foo#5=%3CA").fragment;
  assertStrictEquals(f10, "foo#5=%3CA");
  assertStrictEquals(UriFragmentIdentifier.decode(f10), "foo#5=<A");

  const f11 = Uri.fromString("http://example.com:80/hoge#foo#5%3DA").fragment;
  assertStrictEquals(f11, "foo#5%3DA");
  assertStrictEquals(UriFragmentIdentifier.decode(f11), "foo#5=A");

  const f12 = Uri.fromString("http://example.com:80/hoge#%E3%81%82").fragment;
  assertStrictEquals(f12, "%E3%81%82");
  assertStrictEquals(UriFragmentIdentifier.decode(f12), "あ");

  const f13 = Uri.fromString("http://example.com:80/hoge#あ").fragment;
  assertStrictEquals(f13, "%E3%81%82");
  assertStrictEquals(UriFragmentIdentifier.decode(f13), "あ");

  const f14 =
    Uri.fromString("http://example.com:80/hoge#%20!%22%3C%3E%60%3").fragment;
  assertStrictEquals(f14, "%20!%22%3C%3E%60%3");
  assertStrictEquals(UriFragmentIdentifier.decode(f14), ' !"<>`%3');

  const f15 = Uri.fromString("http://example.com:80/hoge#:~:text=foo").fragment;
  assertStrictEquals(f15, ":~:text=foo");
  assertStrictEquals(UriFragmentIdentifier.decode(f15), ":~:text=foo");

  const f16 =
    Uri.fromString("http://example.com:80/hoge#:~:text=%E3%81%82").fragment;
  assertStrictEquals(f16, ":~:text=%E3%81%82");
  assertStrictEquals(UriFragmentIdentifier.decode(f16), ":~:text=あ");
});
