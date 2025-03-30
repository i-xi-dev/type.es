import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";
import { str } from "../test_utils.ts";

Deno.test("Uri.prototype.path", () => {
  const u0 = Uri.fromString("http://example.com:8080/");
  const u0b = Uri.fromString("Http://example.COM:8080/");
  const u1 = Uri.fromString("http://example.com:80/hoge");
  const u2 = Uri.fromString("https://example.com:80/hog%2Fe");
  const u3 = Uri.fromString("file:///D:/hoge/index.txt");
  const u4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  const u5 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  const u6 = Uri.fromString("data:,Hello%2C%20W%2Forld!");

  assertStrictEquals(str(u0.path), '[""]');
  assertStrictEquals(str(u0b.path), '[""]');
  assertStrictEquals(str(u1.path), '["hoge"]');
  assertStrictEquals(str(u2.path), '["hog/e"]');
  assertStrictEquals(str(u3.path), '["D:","hoge","index.txt"]');
  assertStrictEquals(
    str(u4.path),
    '["https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f"]',
  );
  assertStrictEquals(
    str(u5.path),
    '["uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6"]',
  );
  assertStrictEquals(str(u6.path), '[",Hello%2C%20W%2Forld!"]');

  assertStrictEquals(
    str(Uri.fromString("http://example.com:8080").path),
    '[""]',
  );
});
