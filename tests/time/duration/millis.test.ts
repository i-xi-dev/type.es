import { assertStrictEquals, assertThrows } from "@std/assert";
import { Time } from "../../../mod.ts";

const { Milliseconds } = Time;

Deno.test("Time.Milliseconds.ofSeconds()", () => {
  assertStrictEquals(Milliseconds.ofSeconds(-1), -1000);
  assertStrictEquals(Milliseconds.ofSeconds(-0), 0);
  assertStrictEquals(Milliseconds.ofSeconds(0), 0);
  assertStrictEquals(Milliseconds.ofSeconds(1), 1000);
  assertStrictEquals(Milliseconds.ofSeconds(1.5), 1500);

  assertThrows(
    () => {
      Milliseconds.ofSeconds(Number.NaN);
    },
    TypeError,
    "`seconds` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.ofSeconds("1" as unknown as number);
    },
    TypeError,
    "`seconds` must be a finite `number`.",
  );
});

Deno.test("Time.Milliseconds.toSeconds()", () => {
  assertStrictEquals(Milliseconds.toSeconds(-1000), -1);
  assertStrictEquals(Milliseconds.toSeconds(-0), 0);
  assertStrictEquals(Milliseconds.toSeconds(0), 0);
  assertStrictEquals(Milliseconds.toSeconds(1000), 1);
  assertStrictEquals(Milliseconds.toSeconds(1500), 1.5);

  assertThrows(
    () => {
      Milliseconds.toSeconds(Number.NaN);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.toSeconds("1" as unknown as number);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
});

Deno.test("Time.Milliseconds.ofMinutes()", () => {
  assertStrictEquals(Milliseconds.ofMinutes(-1), -60000);
  assertStrictEquals(Milliseconds.ofMinutes(-0), 0);
  assertStrictEquals(Milliseconds.ofMinutes(0), 0);
  assertStrictEquals(Milliseconds.ofMinutes(1), 60000);
  assertStrictEquals(Milliseconds.ofMinutes(1.5), 90000);

  assertThrows(
    () => {
      Milliseconds.ofMinutes(Number.NaN);
    },
    TypeError,
    "`minutes` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.ofMinutes("1" as unknown as number);
    },
    TypeError,
    "`minutes` must be a finite `number`.",
  );
});

Deno.test("Time.Milliseconds.toMinutes()", () => {
  assertStrictEquals(Milliseconds.toMinutes(-60000), -1);
  assertStrictEquals(Milliseconds.toMinutes(-0), 0);
  assertStrictEquals(Milliseconds.toMinutes(0), 0);
  assertStrictEquals(Milliseconds.toMinutes(60000), 1);
  assertStrictEquals(Milliseconds.toMinutes(90000), 1.5);

  assertThrows(
    () => {
      Milliseconds.toMinutes(Number.NaN);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.toMinutes("1" as unknown as number);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
});

Deno.test("Time.Milliseconds.ofHours()", () => {
  assertStrictEquals(Milliseconds.ofHours(-1), -3600000);
  assertStrictEquals(Milliseconds.ofHours(-0), 0);
  assertStrictEquals(Milliseconds.ofHours(0), 0);
  assertStrictEquals(Milliseconds.ofHours(1), 3600000);
  assertStrictEquals(Milliseconds.ofHours(1.5), 5400000);

  assertThrows(
    () => {
      Milliseconds.ofHours(Number.NaN);
    },
    TypeError,
    "`hours` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.ofHours("1" as unknown as number);
    },
    TypeError,
    "`hours` must be a finite `number`.",
  );
});

Deno.test("Time.Milliseconds.toHours()", () => {
  assertStrictEquals(Milliseconds.toHours(-3600000), -1);
  assertStrictEquals(Milliseconds.toHours(-0), 0);
  assertStrictEquals(Milliseconds.toHours(0), 0);
  assertStrictEquals(Milliseconds.toHours(3600000), 1);
  assertStrictEquals(Milliseconds.toHours(5400000), 1.5);

  assertThrows(
    () => {
      Milliseconds.toHours(Number.NaN);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.toHours("1" as unknown as number);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
});

Deno.test("Time.Milliseconds.ofDays()", () => {
  assertStrictEquals(Milliseconds.ofDays(-1), -86400000);
  assertStrictEquals(Milliseconds.ofDays(-0), 0);
  assertStrictEquals(Milliseconds.ofDays(0), 0);
  assertStrictEquals(Milliseconds.ofDays(1), 86400000);
  assertStrictEquals(Milliseconds.ofDays(1.5), 129600000);

  assertThrows(
    () => {
      Milliseconds.ofDays(Number.NaN);
    },
    TypeError,
    "`days` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.ofDays("1" as unknown as number);
    },
    TypeError,
    "`days` must be a finite `number`.",
  );
});

Deno.test("Time.Milliseconds.toDays()", () => {
  assertStrictEquals(Milliseconds.toDays(-86400000), -1);
  assertStrictEquals(Milliseconds.toDays(-0), 0);
  assertStrictEquals(Milliseconds.toDays(0), 0);
  assertStrictEquals(Milliseconds.toDays(86400000), 1);
  assertStrictEquals(Milliseconds.toDays(129600000), 1.5);

  assertThrows(
    () => {
      Milliseconds.toDays(Number.NaN);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
  assertThrows(
    () => {
      Milliseconds.toDays("1" as unknown as number);
    },
    TypeError,
    "`millis` must be a finite `number`.",
  );
});
