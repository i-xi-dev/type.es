import { assertStrictEquals, assertThrows } from "@std/assert";
import { Time } from "../../../mod.ts";

const { Milliseconds } = Time;

Deno.test("Time.Milliseconds.fromString()", () => {
  assertStrictEquals(Milliseconds.fromString("PT1S"), 1000);
  assertStrictEquals(Milliseconds.fromString("+PT1S"), 1000);
  assertStrictEquals(Milliseconds.fromString("-PT1S"), -1000);
  assertStrictEquals(Milliseconds.fromString("+PT000000001.00000000S"), 1000);

  assertThrows(
    () => {
      Milliseconds.fromString(0 as unknown as string);
    },
    TypeError,
    "`value` must be a non-empty string.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("");
    },
    TypeError,
    "`value` must be a non-empty string.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("1DT12H35M3S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1S ");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString(" PT1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P T1S");
    },
    RangeError,
    "`value` is invalid format.",
  );

  assertThrows(
    () => {
      Milliseconds.fromString("P");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - s", () => {
  assertStrictEquals(Milliseconds.fromString("PT0S"), 0);
  assertStrictEquals(Milliseconds.fromString("PT1S"), 1000);
  assertStrictEquals(Milliseconds.fromString("PT1.0S"), 1000);
  assertStrictEquals(Milliseconds.fromString("PT01.0S"), 1000);
  assertStrictEquals(Milliseconds.fromString("PT00100.0000S"), 100000);
  assertStrictEquals(Milliseconds.fromString("-PT00100.0000S"), -100000);

  assertStrictEquals(Milliseconds.fromString("PT0.001S"), 1);
  assertStrictEquals(Milliseconds.fromString("PT00.0001S"), 0);
  assertStrictEquals(Milliseconds.fromString("PT00,0009S"), 0);
  assertStrictEquals(Milliseconds.fromString("PT00S"), 0);
  assertStrictEquals(Milliseconds.fromString("PT6.789S"), 6789);
  assertStrictEquals(Milliseconds.fromString("PT00006.789S"), 6789);

  assertThrows(
    () => {
      Milliseconds.fromString("PT-0S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT+0S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT-00100.0000S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("-PT-00100.0000S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1 S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT 1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1.S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT.1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - m", () => {
  assertStrictEquals(Milliseconds.fromString("PT0M"), 0);
  assertStrictEquals(Milliseconds.fromString("PT1M"), 60000);
  assertStrictEquals(Milliseconds.fromString("PT01M"), 60000);
  assertStrictEquals(Milliseconds.fromString("PT00100M"), 6000000);
  assertStrictEquals(Milliseconds.fromString("-PT00100M"), -6000000);

  assertStrictEquals(Milliseconds.fromString("PT00M"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT-00100M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("-PT-00100M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT-0M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT+0M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1 M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT 1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1.0M");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - h", () => {
  assertStrictEquals(Milliseconds.fromString("PT0H"), 0);
  assertStrictEquals(Milliseconds.fromString("PT1H"), 3600000);
  assertStrictEquals(Milliseconds.fromString("PT01H"), 3600000);
  assertStrictEquals(Milliseconds.fromString("PT00100H"), 360000000);
  assertStrictEquals(Milliseconds.fromString("-PT00100H"), -360000000);

  assertStrictEquals(Milliseconds.fromString("PT00H"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT-00100H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("-PT-00100H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT-0H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT+0H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1 H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT 1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1.0H");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - d", () => {
  assertStrictEquals(Milliseconds.fromString("P0D"), 0);
  assertStrictEquals(Milliseconds.fromString("P1D"), 86400000);
  assertStrictEquals(Milliseconds.fromString("P01D"), 86400000);
  assertStrictEquals(Milliseconds.fromString("P00100D"), 8640000000);
  assertStrictEquals(Milliseconds.fromString("-P00100D"), -8640000000);

  assertStrictEquals(Milliseconds.fromString("P00D"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("P-00100D");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("-P-00100D");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P-0D");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P+0D");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1 D");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P 1D");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1.0D");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1D");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - ms", () => {
  assertStrictEquals(Milliseconds.fromString("PT0M0S"), 0);
  assertStrictEquals(Milliseconds.fromString("PT1M1S"), 61000);
  assertStrictEquals(Milliseconds.fromString("PT1M1.0S"), 61000);
  assertStrictEquals(Milliseconds.fromString("PT01M01.0S"), 61000);
  assertStrictEquals(
    Milliseconds.fromString("PT00100M00100.0000S"),
    6100000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-PT00100M00100.0000S"),
    -6100000,
  );

  assertStrictEquals(Milliseconds.fromString("PT00M00S"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1S1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT0.1M1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - hm", () => {
  assertStrictEquals(Milliseconds.fromString("PT0H0M"), 0);
  assertStrictEquals(Milliseconds.fromString("PT1H1M"), 3660000);
  assertStrictEquals(Milliseconds.fromString("PT01H01M"), 3660000);
  assertStrictEquals(
    Milliseconds.fromString("PT00100H00100M"),
    366000000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-PT00100H00100M"),
    -366000000,
  );

  assertStrictEquals(Milliseconds.fromString("PT00H00M"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1M1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT0.1H1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - hs", () => {
  assertStrictEquals(Milliseconds.fromString("PT0H0S"), 0);
  assertStrictEquals(Milliseconds.fromString("PT1H1S"), 3601000);
  assertStrictEquals(Milliseconds.fromString("PT01H01S"), 3601000);
  assertStrictEquals(
    Milliseconds.fromString("PT00100H00100S"),
    360100000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-PT00100H00100S"),
    -360100000,
  );

  assertStrictEquals(Milliseconds.fromString("PT00H00S"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1S1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - hms", () => {
  assertStrictEquals(Milliseconds.fromString("PT0H0M0S"), 0);
  assertStrictEquals(Milliseconds.fromString("PT1H1M1S"), 3661000);
  assertStrictEquals(
    Milliseconds.fromString("PT001H001M001S"),
    3661000,
  );
  assertStrictEquals(
    Milliseconds.fromString("PT00100H00100M00100S"),
    366100000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-PT00100H00100M00100S"),
    -366100000,
  );

  assertStrictEquals(Milliseconds.fromString("PT00H00M00S"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1S1H1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1S1M1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("PT1H1S1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - dhms", () => {
  assertStrictEquals(Milliseconds.fromString("P0DT0H0M0S"), 0);
  assertStrictEquals(
    Milliseconds.fromString("P1DT1H1M1S"),
    90061000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P001DT001H001M001S"),
    90061000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P00100DT00100H00100M00100S"),
    9006100000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-P00100DT00100H00100M00100S"),
    -9006100000,
  );

  assertStrictEquals(Milliseconds.fromString("P00DT00H00M00S"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1D1H1M1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1HT1M1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1H1MT1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1H1M1ST");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1H1S1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1S1H1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1S1M1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1M1H1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1M1S1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - dhm", () => {
  assertStrictEquals(Milliseconds.fromString("P0DT0H0M"), 0);
  assertStrictEquals(
    Milliseconds.fromString("P1DT1H1M"),
    90060000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P001DT001H001M"),
    90060000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P00100DT00100H00100M"),
    9006000000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-P00100DT00100H00100M"),
    -9006000000,
  );

  assertStrictEquals(Milliseconds.fromString("P00DT00H00M"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1D1H1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1HT1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1H1MT");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1M1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - dms", () => {
  assertStrictEquals(Milliseconds.fromString("P0DT0M0S"), 0);
  assertStrictEquals(
    Milliseconds.fromString("P1DT1M1S"),
    86461000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P001DT001M001S"),
    86461000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P00100DT00100M00100S"),
    8646100000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-P00100DT00100M00100S"),
    -8646100000,
  );

  assertStrictEquals(Milliseconds.fromString("P00DT00M00S"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1D1M1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1MT1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1M1ST");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1S1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - dhs", () => {
  assertStrictEquals(Milliseconds.fromString("P0DT0H0S"), 0);
  assertStrictEquals(
    Milliseconds.fromString("P1DT1H1S"),
    90001000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P001DT001H001S"),
    90001000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P00100DT00100H00100S"),
    9000100000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-P00100DT00100H00100S"),
    -9000100000,
  );

  assertStrictEquals(Milliseconds.fromString("P00DT00H00S"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1D1H1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1HT1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1H1ST");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1DT1S1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - dh", () => {
  assertStrictEquals(Milliseconds.fromString("P0DT0H"), 0);
  assertStrictEquals(Milliseconds.fromString("P1DT1H"), 90000000);
  assertStrictEquals(
    Milliseconds.fromString("P001DT001H"),
    90000000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P00100DT00100H"),
    9000000000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-P00100DT00100H"),
    -9000000000,
  );

  assertStrictEquals(Milliseconds.fromString("P00DT00H"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1D1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1HT");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1H");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - dm", () => {
  assertStrictEquals(Milliseconds.fromString("P0DT0M"), 0);
  assertStrictEquals(Milliseconds.fromString("P1DT1M"), 86460000);
  assertStrictEquals(
    Milliseconds.fromString("P001DT001M"),
    86460000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P00100DT00100M"),
    8646000000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-P00100DT00100M"),
    -8646000000,
  );

  assertStrictEquals(Milliseconds.fromString("P00DT00M"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1D1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1MT");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1M");
    },
    RangeError,
    "`value` is invalid format.",
  );
});

Deno.test("Time.Milliseconds.fromString() - ds", () => {
  assertStrictEquals(Milliseconds.fromString("P0DT0S"), 0);
  assertStrictEquals(Milliseconds.fromString("P1DT1S"), 86401000);
  assertStrictEquals(
    Milliseconds.fromString("P001DT001S"),
    86401000,
  );
  assertStrictEquals(
    Milliseconds.fromString("P00100DT00100S"),
    8640100000,
  );
  assertStrictEquals(
    Milliseconds.fromString("-P00100DT00100S"),
    -8640100000,
  );

  assertStrictEquals(Milliseconds.fromString("P00DT00S"), 0);

  assertThrows(
    () => {
      Milliseconds.fromString("PT1D1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1ST");
    },
    RangeError,
    "`value` is invalid format.",
  );
  assertThrows(
    () => {
      Milliseconds.fromString("P1D1S");
    },
    RangeError,
    "`value` is invalid format.",
  );
});
