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
