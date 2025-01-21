import {
  assertStrictEquals,
  assertThrows,
  fail,
  unreachable,
} from "@std/assert";
import { Basics } from "../../mod.ts";

const { Assert } = Basics;

Deno.test("Assert.string()", () => {
  try {
    Assert.string("", "test-1");
    Assert.string(" ", "test-1");
    Assert.string("0", "test-1");
    Assert.string("\u0000", "test-1");
    Assert.string("\uFFFF", "test-1");
    Assert.string("\u{10FFFF}", "test-1");
    Assert.string(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "test-1",
    );
    Assert.string("\uD800\uDC00", "test-1");
    Assert.string("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Assert.string(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.string(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.string(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Assert.emptyString()", () => {
  try {
    Assert.emptyString("", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Assert.emptyString("0", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.emptyString("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.emptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.emptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.emptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Assert.nonEmptyString()", () => {
  try {
    Assert.nonEmptyString("0", "test-1");
    Assert.nonEmptyString("00", "test-1");

    Assert.nonEmptyString("\uD800\uDC00", "test-1");
    Assert.nonEmptyString("\uDC00\uD800", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Assert.nonEmptyString("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonEmptyString(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonEmptyString(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonEmptyString(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Assert.char()", () => {
  try {
    Assert.char(" ", "test-1");
    Assert.char("0", "test-1");
    Assert.char("\u0000", "test-1");
    Assert.char("\uFFFF", "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Assert.char("\u{10000}", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.char("", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.char("00", "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.char(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.char(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.char(new String("0"), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Assert.number()", () => {
  try {
    Assert.number(0, "test-1");
    Assert.number(0.5, "test-1");
    Assert.number(Number.NaN, "test-1");
    Assert.number(Number.POSITIVE_INFINITY, "test-1");
    Assert.number(Number.NEGATIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Assert.number(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.number(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.number(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Assert.positiveNumber()", () => {
  try {
    Assert.positiveNumber(1, "test-1");
    Assert.positiveNumber(0.5, "test-1");
    Assert.positiveNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Assert.positiveNumber(0, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.positiveNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.positiveNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.positiveNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.positiveNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.positiveNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});

Deno.test("Assert.nonNegativeNumber()", () => {
  try {
    Assert.nonNegativeNumber(1, "test-1");
    Assert.nonNegativeNumber(0.5, "test-1");
    Assert.nonNegativeNumber(0, "test-1");
    Assert.nonNegativeNumber(Number.POSITIVE_INFINITY, "test-1");
  } catch (exception) {
    fail((exception as Error).toString());
  }

  try {
    Assert.nonNegativeNumber(-0.1, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonNegativeNumber(Number.NEGATIVE_INFINITY, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonNegativeNumber(Number.NaN, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonNegativeNumber(undefined, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonNegativeNumber(0n, "test-1");
    unreachable();
  } catch {
    //
  }

  try {
    Assert.nonNegativeNumber(new Number(0), "test-1");
    unreachable();
  } catch {
    //
  }
});
