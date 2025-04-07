import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.isSameOrigin()", () => {
  const u0A = Uri.fromString("http://example.com:8080/");
  const u0Ab = Uri.fromString("Http://example.COM:8080/");
  const u1A = Uri.fromString("http://example.com:80/hoge");
  const u2A = Uri.fromString("https://example.com:80/hoge");
  const u3A = Uri.fromString("file:///D:/hoge/index.txt");
  const u4A = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  const u5A = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  const u6A = Uri.fromString("data:,Hello%2C%20World!");

  assertStrictEquals(u0A.isSameOrigin(u0A), true);
  assertStrictEquals(u0A.isSameOrigin(u0Ab), true);
  assertStrictEquals(u0Ab.isSameOrigin(u1A), false);
  assertStrictEquals(u1A.isSameOrigin(u2A), false);
  assertStrictEquals(u2A.isSameOrigin(u3A), false);
  assertStrictEquals(u3A.isSameOrigin(u3A), true); // opaqueとopaqueでtrue
  assertStrictEquals(
    Uri.fromString("https://whatwg.org/hoge").isSameOrigin(u4A),
    true,
  );
  assertStrictEquals(u5A.isSameOrigin(u6A), true); // opaqueとopaqueでtrue
  assertStrictEquals(u6A.isSameOrigin(u6A), true); // opaqueとopaqueでtrue
});

Deno.test("Uri.prototype.isSameOrigin() - string", () => {
  const u0A = Uri.fromString("http://example.com:8080/");
  const u0Ab = Uri.fromString("Http://example.COM:8080/");
  const u1A = Uri.fromString("http://example.com:80/hoge");
  const u2A = Uri.fromString("https://example.com:80/hoge");
  const u3A = Uri.fromString("file:///D:/hoge/index.txt");
  const u4A = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  const u5A = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  const u6A = Uri.fromString("data:,Hello%2C%20World!");

  assertStrictEquals(u0A.isSameOrigin(u0A.toString()), true);
  assertStrictEquals(u0A.isSameOrigin(u0Ab.toString()), true);
  assertStrictEquals(u0Ab.isSameOrigin(u1A.toString()), false);
  assertStrictEquals(u1A.isSameOrigin(u2A.toString()), false);
  assertStrictEquals(u2A.isSameOrigin(u3A.toString()), false);
  assertStrictEquals(u3A.isSameOrigin(u3A.toString()), true); // opaqueとopaqueでtrue
  assertStrictEquals(
    Uri.fromString("https://whatwg.org/hoge").isSameOrigin(u4A.toString()),
    true,
  );
  assertStrictEquals(u5A.isSameOrigin(u6A.toString()), true); // opaqueとopaqueでtrue
  assertStrictEquals(u6A.isSameOrigin(u6A.toString()), true); // opaqueとopaqueでtrue
});

Deno.test("Uri.prototype.isSameOrigin() - any", () => {
  const u0A = Uri.fromString("http://example.com:8080/");

  assertStrictEquals(
    u0A.isSameOrigin(URL.parse(u0A.toString()) as unknown as string),
    true,
  );
  assertStrictEquals(u0A.isSameOrigin(null as unknown as string), false);
});
