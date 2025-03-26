import { Md5 } from "https://deno.land/std@0.160.0/hash/md5.ts";
import { assertStrictEquals } from "@std/assert";
import { Bytes } from "../../../mod.ts";

function _x(arrayBuffer: ArrayBuffer): string {
  return [...new Uint8Array(arrayBuffer)].map((b) =>
    b.toString(16).toUpperCase().padStart(2, "0")
  ).join("");
}

Deno.test("Bytes.computeMd5()", async () => {
  const s0 = await Bytes.computeMd5(Uint8Array.of());
  assertStrictEquals(
    _x(s0),
    "D41D8CD98F00B204E9800998ECF8427E",
  );

  const s1 = await Bytes.computeMd5(new Uint8Array(1));
  assertStrictEquals(_x(s1), "93B885ADFE0DA089CDF634904FD59F71");

  const s2 = await Bytes.computeMd5(new Uint8Array(2));
  assertStrictEquals(_x(s2), "C4103F122D27677C9DB144CAE1394A66");

  const s3 = await Bytes.computeMd5(new Uint8Array(3));
  assertStrictEquals(_x(s3), "693E9AF84D3DFCC71E640E005BDC5E2E");

  const s4 = await Bytes.computeMd5(new Uint8Array(4));
  assertStrictEquals(_x(s4), "F1D3FF8443297732862DF21DC4E57262");

  const s5 = await Bytes.computeMd5(new Uint8Array(5));
  assertStrictEquals(_x(s5), "CA9C491AC66B2C62500882E93F3719A8");

  const s6 = await Bytes.computeMd5(new Uint8Array(6));
  assertStrictEquals(_x(s6), "7319468847D7B1AEE40DBF5DD963C999");

  const s55 = await Bytes.computeMd5(new Uint8Array(55));
  assertStrictEquals(_x(s55), "C9EA3314B91C9FD4E38F9432064FD1F2");

  const s56 = await Bytes.computeMd5(new Uint8Array(56));
  assertStrictEquals(_x(s56), "E3C4DD21A9171FD39D208EFA09BF7883");

  const s119 = await Bytes.computeMd5(new Uint8Array(119));
  assertStrictEquals(_x(s119), "8271CB2E6A546123B43096A2EFCE39D2");

  const s120 = await Bytes.computeMd5(new Uint8Array(120));
  assertStrictEquals(_x(s120), "222F7D881DED1871724A1B9A1CB94247");

  assertStrictEquals(
    _x(await Bytes.computeMd5(Uint8Array.of(1, 2, 3, 4))),
    "08D6C05A21512A79A1DFEB9D2A8F262F",
  );
  assertStrictEquals(
    _x(await Bytes.computeMd5(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8))),
    "0EE0646C1C77D8131CC8F4EE65C7673B",
  );

  const src1 = new Uint8Array(65535);
  crypto.getRandomValues(src1);
  const md51 = new Md5();
  const r11 = _x(await Bytes.computeMd5(src1));
  const r21 = _x(md51.update(src1.buffer).digest());
  assertStrictEquals(r11, r21);

  const src2 = new Uint8Array(65536);
  crypto.getRandomValues(src2);
  const md52 = new Md5();
  const r12 = _x(await Bytes.computeMd5(src2));
  const r22 = _x(md52.update(src2.buffer).digest());
  assertStrictEquals(r12, r22);

  const src3 = new Uint8Array(65535);
  crypto.getRandomValues(src3);
  const md53 = new Md5();
  const r13 = _x(await Bytes.computeMd5(src3));
  const r23 = _x(md53.update(src3.buffer).digest());
  assertStrictEquals(r13, r23);

  const src4 = new Uint8Array(65535);
  crypto.getRandomValues(src4);
  const md54 = new Md5();
  const r14 = _x(await Bytes.computeMd5(src4));
  const r24 = _x(md54.update(src4.buffer).digest());
  assertStrictEquals(r14, r24);
});
