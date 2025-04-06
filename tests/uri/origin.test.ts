import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.origin", () => {
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

  assertStrictEquals(u0.origin, "http://example.com:8080");
  assertStrictEquals(u0b.origin, "http://example.com:8080");
  assertStrictEquals(u1.origin, "http://example.com");
  assertStrictEquals(u2.origin, "https://example.com:80");
  assertStrictEquals(u3.origin, "null");
  assertStrictEquals(u4.origin, "https://whatwg.org");
  assertStrictEquals(u5.origin, "null");
  assertStrictEquals(u6.origin, "null");

  assertStrictEquals(Uri.fromString("chrome://hoge").origin, "null");
  assertStrictEquals(Uri.fromString("tel:aaaa").origin, "null");
  assertStrictEquals(
    Uri.fromString("urn:ietf:rfc:2648").origin,
    "null",
  );
  assertStrictEquals(
    Uri.fromString("geo:13.4125,103.8667").origin,
    "null",
  );
  assertStrictEquals(Uri.fromString("about:blank").origin, "null");
});
