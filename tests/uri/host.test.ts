import { assertStrictEquals } from "@std/assert";
import { Uri } from "../../mod.ts";

Deno.test("Uri.prototype.host", () => {
  const h0 = Uri.fromString("http://example.com:8080/").host;
  assertStrictEquals(h0?.toString(), "example.com");
  assertStrictEquals(h0?.isIpAddress, false);
  assertStrictEquals(h0?.ipAddress, null);
  assertStrictEquals(h0?.isDomain, true);
  assertStrictEquals(h0?.domain, "example.com");
  assertStrictEquals(h0?.isOpaque, false);

  const h0b = Uri.fromString("Http://example.COM:8080/").host;
  assertStrictEquals(h0b?.toString(), "example.com");
  assertStrictEquals(h0b?.isIpAddress, false);
  assertStrictEquals(h0b?.ipAddress, null);
  assertStrictEquals(h0b?.isDomain, true);
  assertStrictEquals(h0b?.domain, "example.com");
  assertStrictEquals(h0b?.isOpaque, false);

  const h1 = Uri.fromString("http://example.com:80/hoge").host;
  assertStrictEquals(h1?.toString(), "example.com");
  assertStrictEquals(h1?.isIpAddress, false);
  assertStrictEquals(h1?.ipAddress, null);
  assertStrictEquals(h1?.isDomain, true);
  assertStrictEquals(h1?.domain, "example.com");
  assertStrictEquals(h1?.isOpaque, false);

  const h2 = Uri.fromString("https://example.com:80/hoge").host;
  assertStrictEquals(h2?.toString(), "example.com");
  assertStrictEquals(h2?.isIpAddress, false);
  assertStrictEquals(h2?.ipAddress, null);
  assertStrictEquals(h2?.isDomain, true);
  assertStrictEquals(h2?.domain, "example.com");
  assertStrictEquals(h2?.isOpaque, false);

  const h3 = Uri.fromString("file:///D:/hoge/index.txt").host;
  assertStrictEquals(h3?.toString(), "");
  assertStrictEquals(h3?.isIpAddress, false);
  assertStrictEquals(h3?.ipAddress, null);
  assertStrictEquals(h3?.isDomain, false);
  assertStrictEquals(h3?.domain, "");
  assertStrictEquals(h3?.isOpaque, false);

  const h3b = Uri.fromString("file://127.0.0.1/hoge/index.txt").host;
  assertStrictEquals(h3b?.toString(), "127.0.0.1");
  assertStrictEquals(h3b?.isIpAddress, true);
  assertStrictEquals(h3b?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h3b?.ipAddress?.family, "IPv4");
  assertStrictEquals(h3b?.isDomain, false);
  assertStrictEquals(h3b?.domain, "");
  assertStrictEquals(h3b?.isOpaque, false);

  const h4 = Uri.fromString(
    "blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f",
  ).host;
  assertStrictEquals(h4?.toString(), "");
  assertStrictEquals(h4?.isIpAddress, false);
  assertStrictEquals(h4?.ipAddress, null);
  assertStrictEquals(h4?.isDomain, false);
  assertStrictEquals(h4?.domain, "");
  assertStrictEquals(h4?.isOpaque, true);

  const h5 = Uri.fromString(
    "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  ).host;
  assertStrictEquals(h5?.toString(), "");
  assertStrictEquals(h5?.isIpAddress, false);
  assertStrictEquals(h5?.ipAddress, null);
  assertStrictEquals(h5?.isDomain, false);
  assertStrictEquals(h5?.domain, "");
  assertStrictEquals(h5?.isOpaque, true);

  const h6 = Uri.fromString("data:,Hello%2C%20World!").host;
  assertStrictEquals(h6?.toString(), "");
  assertStrictEquals(h6?.isIpAddress, false);
  assertStrictEquals(h6?.ipAddress, null);
  assertStrictEquals(h6?.isDomain, false);
  assertStrictEquals(h6?.domain, "");
  assertStrictEquals(h6?.isOpaque, true);

  const h7 = Uri.fromString("http://127.0.0.1:8080/").host;
  assertStrictEquals(h7?.toString(), "127.0.0.1");
  assertStrictEquals(h7?.isIpAddress, true);
  assertStrictEquals(h7?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h7?.ipAddress?.family, "IPv4");
  assertStrictEquals(h7?.isDomain, false);
  assertStrictEquals(h7?.domain, "");
  assertStrictEquals(h7?.isOpaque, false);

  const h8 = Uri.fromString("http://127.0.0.1.:8080/").host;
  assertStrictEquals(h8?.toString(), "127.0.0.1");
  assertStrictEquals(h8?.isIpAddress, true);
  assertStrictEquals(h8?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h8?.ipAddress?.family, "IPv4");
  assertStrictEquals(h8?.isDomain, false);
  assertStrictEquals(h8?.domain, "");
  assertStrictEquals(h8?.isOpaque, false);

  const h9 = Uri.fromString("http://127:8080/").host;
  assertStrictEquals(h9?.toString(), "0.0.0.127");
  assertStrictEquals(h9?.isIpAddress, true);
  assertStrictEquals(h9?.ipAddress?.address, "0.0.0.127");
  assertStrictEquals(h9?.ipAddress?.family, "IPv4");
  assertStrictEquals(h9?.isDomain, false);
  assertStrictEquals(h9?.domain, "");
  assertStrictEquals(h9?.isOpaque, false);

  const h10 = Uri.fromString("http://127.0.0:8080/").host;
  assertStrictEquals(h10?.toString(), "127.0.0.0");
  assertStrictEquals(h10?.isIpAddress, true);
  assertStrictEquals(h10?.ipAddress?.address, "127.0.0.0");
  assertStrictEquals(h10?.ipAddress?.family, "IPv4");
  assertStrictEquals(h10?.isDomain, false);
  assertStrictEquals(h10?.domain, "");
  assertStrictEquals(h10?.isOpaque, false);

  const h11 = Uri.fromString("http://127.0:8080/").host;
  assertStrictEquals(h11?.toString(), "127.0.0.0");
  assertStrictEquals(h11?.isIpAddress, true);
  assertStrictEquals(h11?.ipAddress?.address, "127.0.0.0");
  assertStrictEquals(h11?.ipAddress?.family, "IPv4");
  assertStrictEquals(h11?.isDomain, false);
  assertStrictEquals(h11?.domain, "");
  assertStrictEquals(h11?.isOpaque, false);

  const h12 = Uri.fromString("http://0x7F.0.0.1:8080/").host;
  assertStrictEquals(h12?.toString(), "127.0.0.1");
  assertStrictEquals(h12?.isIpAddress, true);
  assertStrictEquals(h12?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h12?.ipAddress?.family, "IPv4");
  assertStrictEquals(h12?.isDomain, false);
  assertStrictEquals(h12?.domain, "");
  assertStrictEquals(h12?.isOpaque, false);

  const h13 = Uri.fromString("http://0x7F000001:8080/").host;
  assertStrictEquals(h13?.toString(), "127.0.0.1");
  assertStrictEquals(h13?.isIpAddress, true);
  assertStrictEquals(h13?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h13?.ipAddress?.family, "IPv4");
  assertStrictEquals(h13?.isDomain, false);
  assertStrictEquals(h13?.domain, "");
  assertStrictEquals(h13?.isOpaque, false);

  const h14 = Uri.fromString("http://2130706433:8080/").host;
  assertStrictEquals(h14?.toString(), "127.0.0.1");
  assertStrictEquals(h14?.isIpAddress, true);
  assertStrictEquals(h14?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h14?.ipAddress?.family, "IPv4");
  assertStrictEquals(h14?.isDomain, false);
  assertStrictEquals(h14?.domain, "");
  assertStrictEquals(h14?.isOpaque, false);

  const h15 = Uri.fromString("http://0177.000.000.001:8080/").host;
  assertStrictEquals(h15?.toString(), "127.0.0.1");
  assertStrictEquals(h15?.isIpAddress, true);
  assertStrictEquals(h15?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h15?.ipAddress?.family, "IPv4");
  assertStrictEquals(h15?.isDomain, false);
  assertStrictEquals(h15?.domain, "");
  assertStrictEquals(h15?.isOpaque, false);

  const h16 = Uri.fromString("http://0177.0X.000.0x1:8080/").host;
  assertStrictEquals(h16?.toString(), "127.0.0.1");
  assertStrictEquals(h16?.isIpAddress, true);
  assertStrictEquals(h16?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h16?.ipAddress?.family, "IPv4");
  assertStrictEquals(h16?.isDomain, false);
  assertStrictEquals(h16?.domain, "");
  assertStrictEquals(h16?.isOpaque, false);

  const h17 = Uri.fromString("http://[::1]:8080/").host;
  assertStrictEquals(h17?.toString(), "[::1]");
  assertStrictEquals(h17?.isIpAddress, true);
  assertStrictEquals(h17?.ipAddress?.address, "::1");
  assertStrictEquals(h17?.ipAddress?.family, "IPv6");
  assertStrictEquals(h17?.isDomain, false);
  assertStrictEquals(h17?.domain, "");
  assertStrictEquals(h17?.isOpaque, false);

  const h18 = Uri.fromString("chrome://hoge").host;
  assertStrictEquals(h18?.toString(), "hoge");
  assertStrictEquals(h18?.isIpAddress, false);
  assertStrictEquals(h18?.ipAddress, null);
  assertStrictEquals(h18?.isDomain, false);
  assertStrictEquals(h18?.domain, "");
  assertStrictEquals(h18?.isOpaque, true);

  const h19 = Uri.fromString("tel:aaaa").host;
  assertStrictEquals(h19?.toString(), "");
  assertStrictEquals(h19?.isIpAddress, false);
  assertStrictEquals(h19?.ipAddress, null);
  assertStrictEquals(h19?.isDomain, false);
  assertStrictEquals(h19?.domain, "");
  assertStrictEquals(h19?.isOpaque, true);

  const h20 = Uri.fromString("urn:ietf:rfc:2648").host;
  assertStrictEquals(h20?.toString(), "");
  assertStrictEquals(h20?.isIpAddress, false);
  assertStrictEquals(h20?.ipAddress, null);
  assertStrictEquals(h20?.isDomain, false);
  assertStrictEquals(h20?.domain, "");
  assertStrictEquals(h20?.isOpaque, true);

  const h21 = Uri.fromString("geo:13.4125,103.8667").host;
  assertStrictEquals(h21?.toString(), "");
  assertStrictEquals(h21?.isIpAddress, false);
  assertStrictEquals(h21?.ipAddress, null);
  assertStrictEquals(h21?.isDomain, false);
  assertStrictEquals(h21?.domain, "");
  assertStrictEquals(h21?.isOpaque, true);

  const h22 = Uri.fromString("http://ドメイン名例.JP:8080/").host;
  assertStrictEquals(h22?.toString(), "xn--eckwd4c7cu47r2wf.jp");
  assertStrictEquals(h22?.isIpAddress, false);
  assertStrictEquals(h22?.ipAddress, null);
  assertStrictEquals(h22?.isDomain, true);
  assertStrictEquals(h22?.domain, "ドメイン名例.jp");
  assertStrictEquals(h22?.isOpaque, false);

  const h23 = Uri.fromString("file://127.0.0.1/aaaa").host;
  assertStrictEquals(h23?.toString(), "127.0.0.1");
  assertStrictEquals(h23?.isIpAddress, true);
  assertStrictEquals(h23?.ipAddress?.address, "127.0.0.1");
  assertStrictEquals(h23?.ipAddress?.family, "IPv4");
  assertStrictEquals(h23?.isDomain, false);
  assertStrictEquals(h23?.domain, "");
  assertStrictEquals(h23?.isOpaque, false);

  const h24 =
    Uri.fromString("http://日本語ドメイン名ＥＸＡＭＰＬＥ.JP/abc").host;
  assertStrictEquals(
    h24?.toString(),
    "xn--example-6q4fyliikhk162btq3b2zd4y2o.jp",
  );
  assertStrictEquals(h24?.isIpAddress, false);
  assertStrictEquals(h24?.ipAddress, null);
  assertStrictEquals(h24?.isDomain, true);
  assertStrictEquals(h24?.domain, "日本語ドメイン名example.jp");
  assertStrictEquals(h24?.isOpaque, false);

  const h25 = Uri.fromString("http://abＡＢ12.JP/abc").host;
  assertStrictEquals(h25?.toString(), "abab12.jp");
  assertStrictEquals(h25?.isIpAddress, false);
  assertStrictEquals(h25?.ipAddress, null);
  assertStrictEquals(h25?.isDomain, true);
  assertStrictEquals(h25?.domain, "abab12.jp");
  assertStrictEquals(h25?.isOpaque, false);

  //XXX bidiとか
});
