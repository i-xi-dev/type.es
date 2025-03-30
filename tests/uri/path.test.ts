import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";
import { str } from "../test_utils.ts";

Deno.test("Uri.prototype.path", () => {
  const u0 = Uri.fromString("http://example.com:8080/");
  assertStrictEquals(str(u0.path.segments()), '[""]');
  assertStrictEquals(u0.path.toString(), "/");
  assertStrictEquals(u0.path.isOpaque, false);

  const u0b = Uri.fromString("Http://example.COM:8080/");
  assertStrictEquals(str(u0b.path.segments()), '[""]');
  assertStrictEquals(u0b.path.toString(), "/");
  assertStrictEquals(u0b.path.isOpaque, false);

  const u1 = Uri.fromString("http://example.com:80/hoge");
  assertStrictEquals(str(u1.path.segments()), '["hoge"]');
  assertStrictEquals(u1.path.toString(), "/hoge");
  assertStrictEquals(u1.path.isOpaque, false);

  const u2 = Uri.fromString("https://example.com:80/hog%2Fe");
  assertStrictEquals(str(u2.path.segments()), '["hog/e"]');
  assertStrictEquals(u2.path.toString(), "/hog%2Fe");
  assertStrictEquals(u2.path.isOpaque, false);

  const u3 = Uri.fromString("file:///D:/hoge/index.txt");
  assertStrictEquals(str(u3.path.segments()), '["D:","hoge","index.txt"]');
  assertStrictEquals(u3.path.toString(), "/D:/hoge/index.txt");
  assertStrictEquals(u3.path.isOpaque, false);

  const u4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  assertStrictEquals(
    str(u4.path.segments()),
    '["https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f"]',
  );
  assertStrictEquals(
    u4.path.toString(),
    "https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  );
  assertStrictEquals(u4.path.isOpaque, true);

  const u5 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  assertStrictEquals(
    str(u5.path.segments()),
    '["uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6"]',
  );
  assertStrictEquals(
    u5.path.toString(),
    "uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  );
  assertStrictEquals(u5.path.isOpaque, true);

  const u6 = Uri.fromString("data:,Hello%2C%20W%2Forld!");
  assertStrictEquals(str(u6.path.segments()), '[",Hello%2C%20W%2Forld!"]');
  assertStrictEquals(u6.path.toString(), ",Hello%2C%20W%2Forld!");
  assertStrictEquals(u6.path.isOpaque, true);

  const p7 = Uri.fromString("http://example.com:8080").path;
  assertStrictEquals(str(p7.segments()), '[""]');
  assertStrictEquals(p7.toString(), "/");
  assertStrictEquals(p7.isOpaque, false);
});
