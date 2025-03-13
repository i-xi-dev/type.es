import { assertStrictEquals, assertThrows } from "@std/assert";
import { Time } from "../../../mod.ts";

const { Milliseconds } = Time;

Deno.test("Time.Milliseconds.toString()", () => {
  assertStrictEquals(Milliseconds.toString(0), "PT00.000S");
  assertStrictEquals(Milliseconds.toString(1000), "PT01.000S");
  assertStrictEquals(Milliseconds.toString(60000), "PT01M00.000S");
  assertStrictEquals(Milliseconds.toString(61000), "PT01M01.000S");

  assertStrictEquals(Milliseconds.toString(100000), "PT01M40.000S");
  assertStrictEquals(Milliseconds.toString(-100000), "-PT01M40.000S");

  assertStrictEquals(Milliseconds.toString(3600000), "PT01H00M00.000S");
  assertStrictEquals(Milliseconds.toString(3601000), "PT01H00M01.000S");
  assertStrictEquals(Milliseconds.toString(3660000), "PT01H01M00.000S");
  assertStrictEquals(Milliseconds.toString(3661000), "PT01H01M01.000S");
  assertStrictEquals(Milliseconds.toString(5900000), "PT01H38M20.000S");

  assertStrictEquals(Milliseconds.toString(6000000), "PT01H40M00.000S");
  assertStrictEquals(
    Milliseconds.toString(-6000000),
    "-PT01H40M00.000S",
  );

  assertStrictEquals(Milliseconds.toString(6100000), "PT01H41M40.000S");

  assertStrictEquals(
    Milliseconds.toString(86400000),
    "P1DT00H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(86401000),
    "P1DT00H00M01.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(86460000),
    "P1DT00H01M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(86461000),
    "P1DT00H01M01.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90000000),
    "P1DT01H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90001000),
    "P1DT01H00M01.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90060000),
    "P1DT01H01M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90061000),
    "P1DT01H01M01.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(354000000),
    "P4DT02H20M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(359900000),
    "P4DT03H58M20.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(360000000),
    "P4DT04H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(-360000000),
    "-P4DT04H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(360100000),
    "P4DT04H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(365900000),
    "P4DT05H38M20.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(366000000),
    "P4DT05H40M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(366100000),
    "P4DT05H41M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8640000000),
    "P100DT00H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(-8640000000),
    "-P100DT00H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646000000),
    "P100DT01H40M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8640100000),
    "P100DT00H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646100000),
    "P100DT01H41M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000000000),
    "P104DT04H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000100000),
    "P104DT04H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9006000000),
    "P104DT05H40M00.000S",
  );
  assertStrictEquals(Milliseconds.toString(1), "PT00.001S");
  assertStrictEquals(Milliseconds.toString(123), "PT00.123S");
  assertStrictEquals(Milliseconds.toString(0.1), "PT00.000S");
  assertStrictEquals(Milliseconds.toString(123.9), "PT00.123S");

  // 秒までであれば精度落ちない
  // for (let i = -360000000; i <= 360000000; i = i + 1000) {
  //   assertStrictEquals(Duration.fromString(Milliseconds.toString(i)), i);
  // }
});
