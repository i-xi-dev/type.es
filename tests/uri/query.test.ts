import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";
import { str } from "../test_utils.ts";

Deno.test("Uri.prototype.query", () => {
  const u0 = Uri.fromString("http://example.com:8080/");
  const u0b = Uri.fromString("Http://example.COM:8080/");
  const u1 = Uri.fromString("http://example.com:80/hoge");
  const u2 = Uri.fromString("https://example.com:80/hoge");
  const u3 = Uri.fromString("file:///D:/hoge/index.txt");
  const u4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  const u5 = Uri.fromString("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
  const u6 = Uri.fromString("data:,Hello%2C%20World!");

  assertStrictEquals(u0.query, null);
  assertStrictEquals(u0b.query, null);
  assertStrictEquals(u1.query, null);
  assertStrictEquals(u2.query, null);
  assertStrictEquals(u3.query, null);
  assertStrictEquals(u4.query, null);
  assertStrictEquals(u5.query, null);
  assertStrictEquals(u6.query, null);

  assertStrictEquals(Uri.fromString("chrome://hoge").query, null);
  assertStrictEquals(Uri.fromString("tel:aaaa").query, null);
  assertStrictEquals(Uri.fromString("urn:ietf:rfc:2648").query, null);
  assertStrictEquals(Uri.fromString("geo:13.4125,103.8667").query, null);

  const q7 = Uri.fromString("http://example.com:80/hoge?").query;
  assertStrictEquals(str(q7?.parameters()), "[]");
  assertStrictEquals(q7?.toString(), "");

  const q8 = Uri.fromString("http://example.com:80/hoge?=").query;
  assertStrictEquals(str(q8?.parameters()), '[["",""]]');
  assertStrictEquals(q8?.toString(), "=");

  const q9 = Uri.fromString("http://example.com:80/hoge?=&=").query;
  assertStrictEquals(str(q9?.parameters()), '[["",""],["",""]]');
  assertStrictEquals(q9?.toString(), "=&=");

  const q10 = Uri.fromString("http://example.com:80/hoge?foo").query;
  assertStrictEquals(str(q10?.parameters()), '[["foo",""]]');
  assertStrictEquals(q10?.toString(), "foo");

  const q11 = Uri.fromString("http://example.com:80/hoge?foo=5").query;
  assertStrictEquals(str(q11?.parameters()), '[["foo","5"]]');
  assertStrictEquals(q11?.toString(), "foo=5");

  const q12 = Uri.fromString("http://example.com:80/hoge?foo=5#bar").query;
  assertStrictEquals(str(q12?.parameters()), '[["foo","5"]]');
  assertStrictEquals(q12?.toString(), "foo=5");

  const q13 = Uri.fromString("http://example.com:80/hoge?foo=5%3D6").query;
  assertStrictEquals(str(q13?.parameters()), '[["foo","5=6"]]');
  assertStrictEquals(q13?.toString(), "foo=5%3D6");

  const q14 =
    Uri.fromString("http://example.com:80/hoge?foo=5%3D6&bar=a").query;
  assertStrictEquals(str(q14?.parameters()), '[["foo","5=6"],["bar","a"]]');
  assertStrictEquals(q14?.toString(), "foo=5%3D6&bar=a");

  const q15 = Uri.fromString("http://example.com:80/hoge?foo=%E3%81%82").query;
  assertStrictEquals(str(q15?.parameters()), '[["foo","あ"]]');
  assertStrictEquals(q15?.toString(), "foo=%E3%81%82");
});
