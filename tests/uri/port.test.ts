import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.port", () => {
  const a0 = Uri.fromString("http://example.com/");
  assertStrictEquals(a0.port?.number, 80);
  assertStrictEquals(a0.port?.toString(), "");

  const u0 = Uri.fromString("http://example.com:8080/");
  assertStrictEquals(u0.port?.number, 8080);
  assertStrictEquals(u0.port?.toString(), "8080");

  const u0b = Uri.fromString("Http://example.COM:8080/");
  assertStrictEquals(u0b.port?.number, 8080);
  assertStrictEquals(u0b.port?.toString(), "8080");

  const u1 = Uri.fromString("http://example.com:80/hoge");
  assertStrictEquals(u1.port?.number, 80);
  assertStrictEquals(u1.port?.toString(), "");

  const u2 = Uri.fromString("https://example.com:80/hoge");
  assertStrictEquals(u2.port?.number, 80);
  assertStrictEquals(u2.port?.toString(), "80");

  const u3 = Uri.fromString("file:///D:/hoge/index.txt");
  assertStrictEquals(u3.port, null);

  const u4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  assertStrictEquals(u4.port, null);

  const u5 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  assertStrictEquals(u5.port, null);

  const u6 = Uri.fromString("data:,Hello%2C%20World!");
  assertStrictEquals(u6.port, null);

  assertStrictEquals(Uri.fromString("chrome://hoge").port, null);
  assertStrictEquals(Uri.fromString("tel:aaaa").port, null);
  assertStrictEquals(Uri.fromString("urn:ietf:rfc:2648").port, null);
  assertStrictEquals(Uri.fromString("geo:13.4125,103.8667").port, null);
});
