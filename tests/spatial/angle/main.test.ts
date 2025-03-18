import { assertStrictEquals, assertThrows } from "@std/assert";
import { Spatial } from "../../../mod.ts";

Deno.test("Spatial.Angle.ofDegrees()", () => {
  const a0 = Spatial.Angle.ofDegrees(0);
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0.toRadians(), 0);

  const a1 = Spatial.Angle.ofDegrees(90);
  assertStrictEquals(a1.toDegrees(), 90);
  assertStrictEquals(a1.toRadians(), 90 * Math.PI / 180);

  const az = Spatial.Angle.ofDegrees(360);
  assertStrictEquals(az.toDegrees(), 0);
  assertStrictEquals(az.toRadians(), 0);

  const e1 = "`degrees` must be a finite `number`.";
  assertThrows(
    () => {
      Spatial.Angle.ofDegrees(0n as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Spatial.Angle.ofDegrees(Number.NaN);
    },
    TypeError,
    e1,
  );
});

Deno.test("Spatial.Angle.ofRadians()", () => {
  const a0 = Spatial.Angle.ofRadians(0);
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0.toRadians(), 0);

  const a1 = Spatial.Angle.ofRadians(90 * Math.PI / 180);
  assertStrictEquals(a1.toDegrees(), 90);
  assertStrictEquals(a1.toRadians(), 90 * Math.PI / 180);

  const az = Spatial.Angle.ofRadians(360 * Math.PI / 180);
  assertStrictEquals(az.toDegrees(), 0);
  assertStrictEquals(az.toRadians(), 0);

  const e1 = "`radians` must be a finite `number`.";
  assertThrows(
    () => {
      Spatial.Angle.ofRadians(0n as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Spatial.Angle.ofRadians(Number.NaN);
    },
    TypeError,
    e1,
  );
});

Deno.test("Spatial.Angle.prototype.toDegrees()", () => {
  const a0 = Spatial.Angle.ofDegrees(0);
  assertStrictEquals(a0.toDegrees(), 0);

  const a01 = Spatial.Angle.ofDegrees(0.1);
  assertStrictEquals(a01.toDegrees(), 0.1);

  const a1 = Spatial.Angle.ofDegrees(1);
  assertStrictEquals(a1.toDegrees(), 1);

  const a359 = Spatial.Angle.ofDegrees(359);
  assertStrictEquals(a359.toDegrees(), 359);

  const a3599 = Spatial.Angle.ofDegrees(359.9);
  assertStrictEquals(a3599.toDegrees(), 359.9);

  const a360 = Spatial.Angle.ofDegrees(360);
  assertStrictEquals(a360.toDegrees(), 0);
});

Deno.test("Spatial.Angle.prototype.toRadians()", () => {
  const a0 = Spatial.Angle.ofRadians(0);
  assertStrictEquals(a0.toRadians(), 0);
  assertStrictEquals(a0.toDegrees(), 0);

  const a0b = Spatial.Angle.ofRadians(Math.PI * 2);
  assertStrictEquals(a0b.toRadians(), 0);
  assertStrictEquals(a0b.toDegrees(), 0);

  const a180 = Spatial.Angle.ofRadians(Math.PI);
  assertStrictEquals(a180.toRadians(), Math.PI);
  assertStrictEquals(a180.toDegrees(), 180);

  const a90 = Spatial.Angle.ofRadians(Math.PI / 2);
  assertStrictEquals(a90.toRadians(), Math.PI / 2);
  assertStrictEquals(a90.toDegrees(), 90);

  const a450 = Spatial.Angle.ofRadians((Math.PI * 2) + (Math.PI / 2));
  assertStrictEquals(a450.toRadians(), Math.PI / 2);
  assertStrictEquals(a450.toDegrees(), 90);
});

Deno.test("Spatial.Angle.prototype.valueOf()", () => {
  const a0 = Spatial.Angle.ofDegrees(0);
  assertStrictEquals(a0.valueOf(), 0);

  const a01 = Spatial.Angle.ofDegrees(0.1);
  assertStrictEquals(a01.valueOf(), 0.1);

  const a1 = Spatial.Angle.ofDegrees(1);
  assertStrictEquals(a1.valueOf(), 1);

  const a359 = Spatial.Angle.ofDegrees(359);
  assertStrictEquals(a359.valueOf(), 359);

  const a3599 = Spatial.Angle.ofDegrees(359.9);
  assertStrictEquals(a3599.valueOf(), 359.9);

  const a360 = Spatial.Angle.ofDegrees(360);
  assertStrictEquals(a360.valueOf(), 0);
});

Deno.test("Spatial.Angle.prototype.plusDegrees()", () => {
  const a0 = Spatial.Angle.ofDegrees(0);
  assertStrictEquals(a0.toDegrees(), 0);

  const a0x90 = a0.plusDegrees(90);
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0x90.toDegrees(), 90);

  const a0xm90 = a0.plusDegrees(-90);
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0xm90.toDegrees(), 270);

  const a0x450 = a0.plusDegrees(450);
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0x450.toDegrees(), 90);

  const e1 = "`degrees` must be a finite `number`.";
  assertThrows(
    () => {
      a0.plusDegrees(0n as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Spatial.Angle.prototype.plusRadians()", () => {
  const a0 = Spatial.Angle.ofDegrees(0);
  assertStrictEquals(a0.toDegrees(), 0);

  const a0x90 = a0.plusRadians(Math.PI / 2);
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0x90.toDegrees(), 90);

  const a0xm90 = a0.plusRadians(-(Math.PI / 2));
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0xm90.toDegrees(), 270);

  const a0x450 = a0.plusRadians((Math.PI * 2) + (Math.PI / 2));
  assertStrictEquals(a0.toDegrees(), 0);
  assertStrictEquals(a0x450.toDegrees(), 90);

  const e1 = "`radians` must be a finite `number`.";
  assertThrows(
    () => {
      a0.plusRadians(0n as unknown as number);
    },
    TypeError,
    e1,
  );
});
