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

  assertStrictEquals(str(u0.query), "[]");
  assertStrictEquals(str(u0b.query), "[]");
  assertStrictEquals(str(u1.query), "[]");
  assertStrictEquals(str(u2.query), "[]");
  assertStrictEquals(str(u3.query), "[]");
  assertStrictEquals(str(u4.query), "[]");
  assertStrictEquals(str(u5.query), "[]");
  assertStrictEquals(str(u6.query), "[]");

  assertStrictEquals(
    str(Uri.fromString("chrome://hoge").query),
    "[]",
  );
  assertStrictEquals(
    str(Uri.fromString("tel:aaaa").query),
    "[]",
  );
  assertStrictEquals(
    str(Uri.fromString("urn:ietf:rfc:2648").query),
    "[]",
  );
  assertStrictEquals(
    str(Uri.fromString("geo:13.4125,103.8667").query),
    "[]",
  );

  assertStrictEquals(
    str(
      Uri.fromString("http://example.com:80/hoge?").query,
    ),
    "[]",
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?=").query),
    '[["",""]]',
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?=&=").query),
    '[["",""],["",""]]',
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?foo").query),
    '[["foo",""]]',
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?foo=5").query),
    '[["foo","5"]]',
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?foo=5#bar").query),
    '[["foo","5"]]',
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?foo=5%3D6").query),
    '[["foo","5=6"]]',
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?foo=5%3D6&bar=a").query),
    '[["foo","5=6"],["bar","a"]]',
  );
  assertStrictEquals(
    str(Uri.fromString("http://example.com:80/hoge?foo=%E3%81%82").query),
    '[["foo","あ"]]',
  );
});
