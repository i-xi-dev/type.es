import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.toString()", () => {
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

  assertStrictEquals(u0.toString(), "http://example.com:8080/");
  assertStrictEquals(u0b.toString(), "http://example.com:8080/");
  assertStrictEquals(u1.toString(), "http://example.com/hoge");
  assertStrictEquals(u2.toString(), "https://example.com:80/hoge");
  assertStrictEquals(u3.toString(), "file:///D:/hoge/index.txt");
  assertStrictEquals(
    u4.toString(),
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  assertStrictEquals(
    u5.toString(),
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  assertStrictEquals(u6.toString(), "data:,Hello%2C%20World!");

  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge?").toString(),
    "http://example.com/hoge",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge?foo").toString(),
    "http://example.com/hoge?foo",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge?foo=5").toString(),
    "http://example.com/hoge?foo=5",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#").toString(),
    "http://example.com/hoge#",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#f<o>o").toString(),
    "http://example.com/hoge#f%3Co%3Eo",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge#foo#5").toString(),
    "http://example.com/hoge#foo#5",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com/hoge").toString(),
    "http://example.com/hoge",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com/hoge/huga").toString(),
    "http://example.com/hoge/huga",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com/hoge/huga/").toString(),
    "http://example.com/hoge/huga/",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com/hoge/huga/../").toString(),
    "http://example.com/hoge/",
  );
  assertStrictEquals(
    Uri.fromString("http://example.com/hoge/huga/./").toString(),
    "http://example.com/hoge/huga/",
  );

  assertStrictEquals(
    Uri.fromString("http://example.com:80/hoge?fo o").toString(),
    "http://example.com/hoge?fo%20o",
  );
});
