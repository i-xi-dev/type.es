import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.scheme", () => {
  assertStrictEquals(Uri.fromString("http://example.com:8080/").scheme, "http");
  assertStrictEquals(Uri.fromString("Http://example.COM:8080/").scheme, "http");
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge").scheme,
    "http",
  );
  assertStrictEquals(
    Uri.fromString("https://example.com:80/hoge").scheme,
    "https",
  );
  assertStrictEquals(
    Uri.fromString("file:///D:/hoge/index.txt").scheme,
    "file",
  );
  assertStrictEquals(
    Uri.fromString(
      "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
    ).scheme,
    "blob",
  );
  assertStrictEquals(
    Uri.fromString(
      "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
    ).scheme,
    "urn",
  );
  assertStrictEquals(Uri.fromString("data:,Hello%2C%20World!").scheme, "data");

  assertStrictEquals(Uri.fromString("chrome://hoge").scheme, "chrome");
  assertStrictEquals(Uri.fromString("tel:aaaa").scheme, "tel");
  assertStrictEquals(
    Uri.fromString("urn:ietf:rfc:2648").scheme,
    "urn",
  );
  assertStrictEquals(
    Uri.fromString("geo:13.4125,103.8667").scheme,
    "geo",
  );
});
