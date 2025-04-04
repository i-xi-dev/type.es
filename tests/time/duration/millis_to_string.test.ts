import { assertStrictEquals, assertThrows } from "@std/assert";
import { Time } from "../../../mod.ts";

const { Milliseconds } = Time;

Deno.test("Time.Milliseconds.toString()", () => {
  assertThrows(
    () => {
      Milliseconds.toString("0" as unknown as number);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );

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
  assertStrictEquals(Milliseconds.toString(-6000000), "-PT01H40M00.000S");

  assertStrictEquals(Milliseconds.toString(6100000), "PT01H41M40.000S");

  assertStrictEquals(Milliseconds.toString(86400000), "P1DT00H00M00.000S");
  assertStrictEquals(Milliseconds.toString(86401000), "P1DT00H00M01.000S");
  assertStrictEquals(Milliseconds.toString(86460000), "P1DT00H01M00.000S");
  assertStrictEquals(Milliseconds.toString(86461000), "P1DT00H01M01.000S");
  assertStrictEquals(Milliseconds.toString(90000000), "P1DT01H00M00.000S");
  assertStrictEquals(Milliseconds.toString(90001000), "P1DT01H00M01.000S");
  assertStrictEquals(Milliseconds.toString(90060000), "P1DT01H01M00.000S");
  assertStrictEquals(Milliseconds.toString(90061000), "P1DT01H01M01.000S");
  assertStrictEquals(Milliseconds.toString(354000000), "P4DT02H20M00.000S");
  assertStrictEquals(Milliseconds.toString(359900000), "P4DT03H58M20.000S");
  assertStrictEquals(Milliseconds.toString(360000000), "P4DT04H00M00.000S");
  assertStrictEquals(Milliseconds.toString(-360000000), "-P4DT04H00M00.000S");
  assertStrictEquals(Milliseconds.toString(360100000), "P4DT04H01M40.000S");
  assertStrictEquals(Milliseconds.toString(365900000), "P4DT05H38M20.000S");
  assertStrictEquals(Milliseconds.toString(366000000), "P4DT05H40M00.000S");
  assertStrictEquals(Milliseconds.toString(366100000), "P4DT05H41M40.000S");
  assertStrictEquals(Milliseconds.toString(8640000000), "P100DT00H00M00.000S");
  assertStrictEquals(
    Milliseconds.toString(-8640000000),
    "-P100DT00H00M00.000S",
  );
  assertStrictEquals(Milliseconds.toString(8646000000), "P100DT01H40M00.000S");
  assertStrictEquals(Milliseconds.toString(8640100000), "P100DT00H01M40.000S");
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
});

Deno.test("Time.Milliseconds.toString() - largestUnit:auto", () => {
  const op = { largestUnit: "auto" } as const;

  assertStrictEquals(Milliseconds.toString(0, op), "PT00.000S");
  assertStrictEquals(Milliseconds.toString(1000, op), "PT01.000S");
  assertStrictEquals(Milliseconds.toString(60000, op), "PT01M00.000S");
  assertStrictEquals(Milliseconds.toString(61000, op), "PT01M01.000S");

  assertStrictEquals(Milliseconds.toString(100000, op), "PT01M40.000S");
  assertStrictEquals(Milliseconds.toString(-100000, op), "-PT01M40.000S");

  assertStrictEquals(Milliseconds.toString(3600000, op), "PT01H00M00.000S");
  assertStrictEquals(Milliseconds.toString(3601000, op), "PT01H00M01.000S");
  assertStrictEquals(Milliseconds.toString(3660000, op), "PT01H01M00.000S");
  assertStrictEquals(Milliseconds.toString(3661000, op), "PT01H01M01.000S");
  assertStrictEquals(Milliseconds.toString(5900000, op), "PT01H38M20.000S");

  assertStrictEquals(Milliseconds.toString(6000000, op), "PT01H40M00.000S");
  assertStrictEquals(Milliseconds.toString(-6000000, op), "-PT01H40M00.000S");

  assertStrictEquals(Milliseconds.toString(6100000, op), "PT01H41M40.000S");

  assertStrictEquals(Milliseconds.toString(86400000, op), "P1DT00H00M00.000S");
  assertStrictEquals(Milliseconds.toString(86401000, op), "P1DT00H00M01.000S");
  assertStrictEquals(Milliseconds.toString(86460000, op), "P1DT00H01M00.000S");
  assertStrictEquals(Milliseconds.toString(86461000, op), "P1DT00H01M01.000S");
  assertStrictEquals(Milliseconds.toString(90000000, op), "P1DT01H00M00.000S");
  assertStrictEquals(Milliseconds.toString(90001000, op), "P1DT01H00M01.000S");
  assertStrictEquals(Milliseconds.toString(90060000, op), "P1DT01H01M00.000S");
  assertStrictEquals(Milliseconds.toString(90061000, op), "P1DT01H01M01.000S");
  assertStrictEquals(Milliseconds.toString(354000000, op), "P4DT02H20M00.000S");
  assertStrictEquals(Milliseconds.toString(359900000, op), "P4DT03H58M20.000S");
  assertStrictEquals(Milliseconds.toString(360000000, op), "P4DT04H00M00.000S");
  assertStrictEquals(
    Milliseconds.toString(-360000000, op),
    "-P4DT04H00M00.000S",
  );
  assertStrictEquals(Milliseconds.toString(360100000, op), "P4DT04H01M40.000S");
  assertStrictEquals(
    Milliseconds.toString(365900000, op),
    "P4DT05H38M20.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(366000000, op),
    "P4DT05H40M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(366100000, op),
    "P4DT05H41M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8640000000, op),
    "P100DT00H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(-8640000000, op),
    "-P100DT00H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646000000, op),
    "P100DT01H40M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8640100000, op),
    "P100DT00H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646100000, op),
    "P100DT01H41M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000000000, op),
    "P104DT04H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000100000, op),
    "P104DT04H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9006000000, op),
    "P104DT05H40M00.000S",
  );
  assertStrictEquals(Milliseconds.toString(1, op), "PT00.001S");
  assertStrictEquals(Milliseconds.toString(123, op), "PT00.123S");
  assertStrictEquals(Milliseconds.toString(0.1, op), "PT00.000S");
  assertStrictEquals(Milliseconds.toString(123.9, op), "PT00.123S");
});

Deno.test("Time.Milliseconds.toString() - largestUnit:day", () => {
  const op = { largestUnit: "day" } as const;

  assertStrictEquals(Milliseconds.toString(0, op), "P0DT00H00M00.000S");
  assertStrictEquals(Milliseconds.toString(1000, op), "P0DT00H00M01.000S");
  assertStrictEquals(Milliseconds.toString(60000, op), "P0DT00H01M00.000S");
  assertStrictEquals(Milliseconds.toString(61000, op), "P0DT00H01M01.000S");

  assertStrictEquals(Milliseconds.toString(100000, op), "P0DT00H01M40.000S");
  assertStrictEquals(Milliseconds.toString(-100000, op), "-P0DT00H01M40.000S");

  assertStrictEquals(Milliseconds.toString(3600000, op), "P0DT01H00M00.000S");
  assertStrictEquals(Milliseconds.toString(3601000, op), "P0DT01H00M01.000S");
  assertStrictEquals(Milliseconds.toString(3660000, op), "P0DT01H01M00.000S");
  assertStrictEquals(Milliseconds.toString(3661000, op), "P0DT01H01M01.000S");
  assertStrictEquals(Milliseconds.toString(5900000, op), "P0DT01H38M20.000S");

  assertStrictEquals(Milliseconds.toString(6000000, op), "P0DT01H40M00.000S");
  assertStrictEquals(Milliseconds.toString(-6000000, op), "-P0DT01H40M00.000S");

  assertStrictEquals(Milliseconds.toString(6100000, op), "P0DT01H41M40.000S");

  assertStrictEquals(Milliseconds.toString(86400000, op), "P1DT00H00M00.000S");
  assertStrictEquals(Milliseconds.toString(86401000, op), "P1DT00H00M01.000S");
  assertStrictEquals(Milliseconds.toString(86460000, op), "P1DT00H01M00.000S");
  assertStrictEquals(Milliseconds.toString(86461000, op), "P1DT00H01M01.000S");
  assertStrictEquals(Milliseconds.toString(90000000, op), "P1DT01H00M00.000S");
  assertStrictEquals(Milliseconds.toString(90001000, op), "P1DT01H00M01.000S");
  assertStrictEquals(Milliseconds.toString(90060000, op), "P1DT01H01M00.000S");
  assertStrictEquals(Milliseconds.toString(90061000, op), "P1DT01H01M01.000S");
  assertStrictEquals(Milliseconds.toString(354000000, op), "P4DT02H20M00.000S");
  assertStrictEquals(Milliseconds.toString(359900000, op), "P4DT03H58M20.000S");
  assertStrictEquals(Milliseconds.toString(360000000, op), "P4DT04H00M00.000S");
  assertStrictEquals(
    Milliseconds.toString(-360000000, op),
    "-P4DT04H00M00.000S",
  );
  assertStrictEquals(Milliseconds.toString(360100000, op), "P4DT04H01M40.000S");
  assertStrictEquals(Milliseconds.toString(365900000, op), "P4DT05H38M20.000S");
  assertStrictEquals(Milliseconds.toString(366000000, op), "P4DT05H40M00.000S");
  assertStrictEquals(Milliseconds.toString(366100000, op), "P4DT05H41M40.000S");
  assertStrictEquals(
    Milliseconds.toString(8640000000, op),
    "P100DT00H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(-8640000000, op),
    "-P100DT00H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646000000, op),
    "P100DT01H40M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8640100000, op),
    "P100DT00H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646100000, op),
    "P100DT01H41M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000000000, op),
    "P104DT04H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000100000, op),
    "P104DT04H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9006000000, op),
    "P104DT05H40M00.000S",
  );

  assertStrictEquals(Milliseconds.toString(1, op), "P0DT00H00M00.001S");
  assertStrictEquals(Milliseconds.toString(123, op), "P0DT00H00M00.123S");
  assertStrictEquals(Milliseconds.toString(0.1, op), "P0DT00H00M00.000S");
  assertStrictEquals(Milliseconds.toString(123.9, op), "P0DT00H00M00.123S");
});

Deno.test("Time.Milliseconds.toString() - largestUnit:hour", () => {
  const op = { largestUnit: "hour" } as const;

  assertStrictEquals(Milliseconds.toString(0, op), "PT00H00M00.000S");
  assertStrictEquals(Milliseconds.toString(1000, op), "PT00H00M01.000S");
  assertStrictEquals(Milliseconds.toString(60000, op), "PT00H01M00.000S");
  assertStrictEquals(Milliseconds.toString(61000, op), "PT00H01M01.000S");

  assertStrictEquals(Milliseconds.toString(100000, op), "PT00H01M40.000S");
  assertStrictEquals(Milliseconds.toString(-100000, op), "-PT00H01M40.000S");

  assertStrictEquals(Milliseconds.toString(3600000, op), "PT01H00M00.000S");
  assertStrictEquals(Milliseconds.toString(3601000, op), "PT01H00M01.000S");
  assertStrictEquals(Milliseconds.toString(3660000, op), "PT01H01M00.000S");
  assertStrictEquals(Milliseconds.toString(3661000, op), "PT01H01M01.000S");
  assertStrictEquals(Milliseconds.toString(5900000, op), "PT01H38M20.000S");

  assertStrictEquals(Milliseconds.toString(6000000, op), "PT01H40M00.000S");
  assertStrictEquals(Milliseconds.toString(-6000000, op), "-PT01H40M00.000S");

  assertStrictEquals(Milliseconds.toString(6100000, op), "PT01H41M40.000S");

  assertStrictEquals(Milliseconds.toString(86400000, op), "PT24H00M00.000S");
  assertStrictEquals(Milliseconds.toString(86401000, op), "PT24H00M01.000S");
  assertStrictEquals(
    Milliseconds.toString(86460000, op),
    "PT24H01M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(86461000, op),
    "PT24H01M01.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90000000, op),
    "PT25H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90001000, op),
    "PT25H00M01.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90060000, op),
    "PT25H01M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(90061000, op),
    "PT25H01M01.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(354000000, op),
    "PT98H20M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(359900000, op),
    "PT99H58M20.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(360000000, op),
    "PT100H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(-360000000, op),
    "-PT100H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(360100000, op),
    "PT100H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(365900000, op),
    "PT101H38M20.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(366000000, op),
    "PT101H40M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(366100000, op),
    "PT101H41M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8640000000, op),
    "PT2400H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(-8640000000, op),
    "-PT2400H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646000000, op),
    "PT2401H40M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8640100000, op),
    "PT2400H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(8646100000, op),
    "PT2401H41M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000000000, op),
    "PT2500H00M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000100000, op),
    "PT2500H01M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9006000000, op),
    "PT2501H40M00.000S",
  );

  assertStrictEquals(Milliseconds.toString(1, op), "PT00H00M00.001S");
  assertStrictEquals(Milliseconds.toString(123, op), "PT00H00M00.123S");
  assertStrictEquals(Milliseconds.toString(0.1, op), "PT00H00M00.000S");
  assertStrictEquals(Milliseconds.toString(123.9, op), "PT00H00M00.123S");
});

Deno.test("Time.Milliseconds.toString() - largestUnit:minute", () => {
  const op = { largestUnit: "minute" } as const;

  assertStrictEquals(Milliseconds.toString(0, op), "PT00M00.000S");
  assertStrictEquals(Milliseconds.toString(1000, op), "PT00M01.000S");
  assertStrictEquals(Milliseconds.toString(60000, op), "PT01M00.000S");
  assertStrictEquals(Milliseconds.toString(61000, op), "PT01M01.000S");

  assertStrictEquals(Milliseconds.toString(100000, op), "PT01M40.000S");
  assertStrictEquals(Milliseconds.toString(-100000, op), "-PT01M40.000S");

  assertStrictEquals(Milliseconds.toString(3600000, op), "PT60M00.000S");
  assertStrictEquals(Milliseconds.toString(3601000, op), "PT60M01.000S");
  assertStrictEquals(Milliseconds.toString(3660000, op), "PT61M00.000S");
  assertStrictEquals(Milliseconds.toString(3661000, op), "PT61M01.000S");
  assertStrictEquals(Milliseconds.toString(5900000, op), "PT98M20.000S");

  assertStrictEquals(Milliseconds.toString(6000000, op), "PT100M00.000S");
  assertStrictEquals(Milliseconds.toString(-6000000, op), "-PT100M00.000S");

  assertStrictEquals(Milliseconds.toString(6100000, op), "PT101M40.000S");

  assertStrictEquals(Milliseconds.toString(86400000, op), "PT1440M00.000S");
  assertStrictEquals(Milliseconds.toString(86401000, op), "PT1440M01.000S");
  assertStrictEquals(Milliseconds.toString(86460000, op), "PT1441M00.000S");
  assertStrictEquals(Milliseconds.toString(86461000, op), "PT1441M01.000S");
  assertStrictEquals(Milliseconds.toString(90000000, op), "PT1500M00.000S");
  assertStrictEquals(Milliseconds.toString(90001000, op), "PT1500M01.000S");
  assertStrictEquals(Milliseconds.toString(90060000, op), "PT1501M00.000S");
  assertStrictEquals(Milliseconds.toString(90061000, op), "PT1501M01.000S");
  assertStrictEquals(Milliseconds.toString(354000000, op), "PT5900M00.000S");
  assertStrictEquals(Milliseconds.toString(359900000, op), "PT5998M20.000S");
  assertStrictEquals(Milliseconds.toString(360000000, op), "PT6000M00.000S");
  assertStrictEquals(Milliseconds.toString(-360000000, op), "-PT6000M00.000S");
  assertStrictEquals(Milliseconds.toString(360100000, op), "PT6001M40.000S");
  assertStrictEquals(Milliseconds.toString(365900000, op), "PT6098M20.000S");
  assertStrictEquals(Milliseconds.toString(366000000, op), "PT6100M00.000S");
  assertStrictEquals(Milliseconds.toString(366100000, op), "PT6101M40.000S");
  assertStrictEquals(Milliseconds.toString(8640000000, op), "PT144000M00.000S");
  assertStrictEquals(
    Milliseconds.toString(-8640000000, op),
    "-PT144000M00.000S",
  );
  assertStrictEquals(Milliseconds.toString(8646000000, op), "PT144100M00.000S");
  assertStrictEquals(Milliseconds.toString(8640100000, op), "PT144001M40.000S");
  assertStrictEquals(
    Milliseconds.toString(8646100000, op),
    "PT144101M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000000000, op),
    "PT150000M00.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9000100000, op),
    "PT150001M40.000S",
  );
  assertStrictEquals(
    Milliseconds.toString(9006000000, op),
    "PT150100M00.000S",
  );

  assertStrictEquals(Milliseconds.toString(1, op), "PT00M00.001S");
  assertStrictEquals(Milliseconds.toString(123, op), "PT00M00.123S");
  assertStrictEquals(Milliseconds.toString(0.1, op), "PT00M00.000S");
  assertStrictEquals(Milliseconds.toString(123.9, op), "PT00M00.123S");
});

Deno.test("Time.Milliseconds.toString() - largestUnit:second", () => {
  const op = { largestUnit: "second" } as const;

  assertStrictEquals(Milliseconds.toString(0, op), "PT00.000S");
  assertStrictEquals(Milliseconds.toString(1000, op), "PT01.000S");
  assertStrictEquals(Milliseconds.toString(60000, op), "PT60.000S");
  assertStrictEquals(Milliseconds.toString(61000, op), "PT61.000S");

  assertStrictEquals(Milliseconds.toString(100000, op), "PT100.000S");
  assertStrictEquals(Milliseconds.toString(-100000, op), "-PT100.000S");

  assertStrictEquals(Milliseconds.toString(3600000, op), "PT3600.000S");
  assertStrictEquals(Milliseconds.toString(3601000, op), "PT3601.000S");
  assertStrictEquals(Milliseconds.toString(3660000, op), "PT3660.000S");
  assertStrictEquals(Milliseconds.toString(3661000, op), "PT3661.000S");
  assertStrictEquals(Milliseconds.toString(5900000, op), "PT5900.000S");

  assertStrictEquals(Milliseconds.toString(6000000, op), "PT6000.000S");
  assertStrictEquals(Milliseconds.toString(-6000000, op), "-PT6000.000S");

  assertStrictEquals(Milliseconds.toString(6100000, op), "PT6100.000S");

  assertStrictEquals(Milliseconds.toString(86400000, op), "PT86400.000S");
  assertStrictEquals(Milliseconds.toString(86401000, op), "PT86401.000S");
  assertStrictEquals(Milliseconds.toString(86460000, op), "PT86460.000S");
  assertStrictEquals(Milliseconds.toString(86461000, op), "PT86461.000S");
  assertStrictEquals(Milliseconds.toString(90000000, op), "PT90000.000S");
  assertStrictEquals(Milliseconds.toString(90001000, op), "PT90001.000S");
  assertStrictEquals(Milliseconds.toString(90060000, op), "PT90060.000S");
  assertStrictEquals(Milliseconds.toString(90061000, op), "PT90061.000S");
  assertStrictEquals(Milliseconds.toString(354000000, op), "PT354000.000S");
  assertStrictEquals(Milliseconds.toString(359900000, op), "PT359900.000S");
  assertStrictEquals(Milliseconds.toString(360000000, op), "PT360000.000S");
  assertStrictEquals(Milliseconds.toString(-360000000, op), "-PT360000.000S");
  assertStrictEquals(Milliseconds.toString(360100000, op), "PT360100.000S");
  assertStrictEquals(Milliseconds.toString(365900000, op), "PT365900.000S");
  assertStrictEquals(Milliseconds.toString(366000000, op), "PT366000.000S");
  assertStrictEquals(Milliseconds.toString(366100000, op), "PT366100.000S");
  assertStrictEquals(Milliseconds.toString(8640000000, op), "PT8640000.000S");
  assertStrictEquals(Milliseconds.toString(-8640000000, op), "-PT8640000.000S");
  assertStrictEquals(Milliseconds.toString(8646000000, op), "PT8646000.000S");
  assertStrictEquals(Milliseconds.toString(8640100000, op), "PT8640100.000S");
  assertStrictEquals(Milliseconds.toString(8646100000, op), "PT8646100.000S");
  assertStrictEquals(Milliseconds.toString(9000000000, op), "PT9000000.000S");
  assertStrictEquals(Milliseconds.toString(9000100000, op), "PT9000100.000S");
  assertStrictEquals(Milliseconds.toString(9006000000, op), "PT9006000.000S");

  assertStrictEquals(Milliseconds.toString(1, op), "PT00.001S");
  assertStrictEquals(Milliseconds.toString(123, op), "PT00.123S");
  assertStrictEquals(Milliseconds.toString(0.1, op), "PT00.000S");
  assertStrictEquals(Milliseconds.toString(123.9, op), "PT00.123S");
});
