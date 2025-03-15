import { assertStrictEquals, assertThrows } from "@std/assert";
import { Loading } from "../../mod.ts";

class TestTask extends Loading.Task<string> {
  constructor(o?: Loading.Options) {
    super(o);
  }
  async run(): Promise<string> {
    return await (() => {
      return new Promise((resolve) => {
        resolve("");
      });
    })();
  }
}

Deno.test("new Loading.Task() - total", () => {
  const t1 = new TestTask();
  assertStrictEquals(t1.total, 0);
  assertStrictEquals(t1.loaded, 0);
  assertStrictEquals(t1.indeterminate, true);
  assertStrictEquals(t1.status, Loading.Status.READY);

  const t2 = new TestTask({ total: 100 });
  assertStrictEquals(t2.total, 100);
  assertStrictEquals(t2.loaded, 0);
  assertStrictEquals(t2.indeterminate, false);
  assertStrictEquals(t2.status, Loading.Status.READY);

  const t3 = new TestTask({ total: undefined });
  assertStrictEquals(t3.total, 0);
  assertStrictEquals(t3.loaded, 0);
  assertStrictEquals(t3.indeterminate, true);
  assertStrictEquals(t3.status, Loading.Status.READY);

  assertThrows(
    () => {
      new TestTask({ total: 10n as unknown as number });
    },
    TypeError,
    "`options.total` must be a non-negative safe integer.",
  );
  assertThrows(
    () => {
      new TestTask({ total: 1.6 });
    },
    TypeError,
    "`options.total` must be a non-negative safe integer.",
  );
  assertThrows(
    () => {
      new TestTask({ total: -1 });
    },
    TypeError,
    "`options.total` must be a non-negative safe integer.",
  );
  assertThrows(
    () => {
      new TestTask({ total: "10" as unknown as number });
    },
    TypeError,
    "`options.total` must be a non-negative safe integer.",
  );
});

Deno.test("new Loading.Task() - signal", () => {
  const ac1 = new AbortController();
  const t1 = new TestTask({ signal: ac1.signal });
  ac1.abort(new Error("12345"));
  assertStrictEquals(t1.total, 0);
  // assertThrows( Taskのサブクラスで実装すればこうなる
  //   () => {
  //     t1.run();
  //   },
  //   Error,
  //   "12345",
  // );

  assertThrows(
    () => {
      new TestTask({ signal: "10" as unknown as AbortSignal });
    },
    TypeError,
    "`options.signal` must be an `AbortSignal`.",
  );
});
