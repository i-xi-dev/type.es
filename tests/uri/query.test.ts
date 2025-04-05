import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";
import { str } from "../test_utils.ts";

Deno.test("Uri.prototype.query", () => {
  const u0 = Uri.fromString("http://example.com:8080/");
  assertStrictEquals(u0.query, null);

  const u0b = Uri.fromString("Http://example.COM:8080/");
  assertStrictEquals(u0b.query, null);

  const u1 = Uri.fromString("http://example.com:80/hoge");
  assertStrictEquals(u1.query, null);

  const u2 = Uri.fromString("https://example.com:80/hoge");
  assertStrictEquals(u2.query, null);

  const u3 = Uri.fromString("file:///D:/hoge/index.txt");
  assertStrictEquals(u3.query, null);

  const u4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  assertStrictEquals(u4.query, null);

  const u5 = Uri.fromString("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
  assertStrictEquals(u5.query, null);

  const u6 = Uri.fromString("data:,Hello%2C%20World!");
  assertStrictEquals(u6.query, null);

  assertStrictEquals(Uri.fromString("chrome://hoge").query, null);
  assertStrictEquals(Uri.fromString("tel:aaaa").query, null);
  assertStrictEquals(Uri.fromString("urn:ietf:rfc:2648").query, null);
  assertStrictEquals(Uri.fromString("geo:13.4125,103.8667").query, null);

  const q7 = Uri.fromString("http://example.com:80/hoge?").query;
  assertStrictEquals(str(new URLSearchParams(q7!).entries()), "[]");
  assertStrictEquals(q7, "");

  const q8 = Uri.fromString("http://example.com:80/hoge?=").query;
  assertStrictEquals(str(new URLSearchParams(q8!).entries()), '[["",""]]');
  assertStrictEquals(q8, "=");

  const q9 = Uri.fromString("http://example.com:80/hoge?=&=").query;
  assertStrictEquals(
    str(new URLSearchParams(q9!).entries()),
    '[["",""],["",""]]',
  );
  assertStrictEquals(q9, "=&=");

  const q10 = Uri.fromString("http://example.com:80/hoge?foo").query;
  assertStrictEquals(str(new URLSearchParams(q10!).entries()), '[["foo",""]]');
  assertStrictEquals(q10, "foo");

  const q11 = Uri.fromString("http://example.com:80/hoge?foo=5").query;
  assertStrictEquals(str(new URLSearchParams(q11!).entries()), '[["foo","5"]]');
  assertStrictEquals(q11, "foo=5");

  const q12 = Uri.fromString("http://example.com:80/hoge?foo=5#bar").query;
  assertStrictEquals(str(new URLSearchParams(q12!).entries()), '[["foo","5"]]');
  assertStrictEquals(q12, "foo=5");

  const q13 = Uri.fromString("http://example.com:80/hoge?foo=5%3D6").query;
  assertStrictEquals(
    str(new URLSearchParams(q13!).entries()),
    '[["foo","5=6"]]',
  );
  assertStrictEquals(q13, "foo=5%3D6");

  const q14 =
    Uri.fromString("http://example.com:80/hoge?foo=5%3D6&bar=a").query;
  assertStrictEquals(
    str(new URLSearchParams(q14!).entries()),
    '[["foo","5=6"],["bar","a"]]',
  );
  assertStrictEquals(q14, "foo=5%3D6&bar=a");

  const q15 = Uri.fromString("http://example.com:80/hoge?foo=%E3%81%82").query;
  assertStrictEquals(
    str(new URLSearchParams(q15!).entries()),
    '[["foo","あ"]]',
  );
  assertStrictEquals(q15, "foo=%E3%81%82");
});
