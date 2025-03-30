import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.host", () => {
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

  assertStrictEquals(u0.host, "example.com");
  assertStrictEquals(u0b.host, "example.com");
  assertStrictEquals(u1.host, "example.com");
  assertStrictEquals(u2.host, "example.com");
  assertStrictEquals(u3.host, "");
  assertStrictEquals(u4.host, "");
  assertStrictEquals(u5.host, "");
  assertStrictEquals(u6.host, "");
  assertStrictEquals(
    Uri.fromString("http://127.0.0.1:8080/").host,
    "127.0.0.1",
  );
  assertStrictEquals(
    Uri.fromString("http://127.0.0.1.:8080/").host,
    "127.0.0.1",
  );
  assertStrictEquals(
    Uri.fromString("http://127:8080/").host,
    "0.0.0.127",
  );
  assertStrictEquals(
    Uri.fromString("http://127.0.0:8080/").host,
    "127.0.0.0",
  );
  assertStrictEquals(
    Uri.fromString("http://127.0:8080/").host,
    "127.0.0.0",
  );
  assertStrictEquals(
    Uri.fromString("http://0x7F.0.0.1:8080/").host,
    "127.0.0.1",
  );
  assertStrictEquals(
    Uri.fromString("http://0x7F000001:8080/").host,
    "127.0.0.1",
  );
  assertStrictEquals(
    Uri.fromString("http://2130706433:8080/").host,
    "127.0.0.1",
  );
  assertStrictEquals(
    Uri.fromString("http://0177.000.000.001:8080/").host,
    "127.0.0.1",
  );
  assertStrictEquals(
    Uri.fromString("http://0177.0X.000.0x1:8080/").host,
    "127.0.0.1",
  );
  assertStrictEquals(
    Uri.fromString("http://[::1]:8080/").host,
    "[::1]",
  );

  assertStrictEquals(Uri.fromString("chrome://hoge").host, "hoge");
  assertStrictEquals(Uri.fromString("tel:aaaa").host, "");
  assertStrictEquals(Uri.fromString("urn:ietf:rfc:2648").host, "");
  assertStrictEquals(Uri.fromString("geo:13.4125,103.8667").host, "");
  assertStrictEquals(
    Uri.fromString("http://ドメイン名例.JP:8080/").host,
    "ドメイン名例.jp",
  );
  assertStrictEquals(
    Uri.fromString("file://127.0.0.1/aaaa").host,
    "127.0.0.1",
  );

  assertStrictEquals(
    Uri.fromString("http://日本語ドメイン名ＥＸＡＭＰＬＥ.JP/abc")
      .host,
    "日本語ドメイン名example.jp",
  );
  assertStrictEquals(
    Uri.fromString("http://abＡＢ12.JP/abc").host,
    "abab12.jp",
  );
  //XXX bidiとか
});
