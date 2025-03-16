import { assertStrictEquals, unreachable } from "@std/assert";
import { Bytes } from "../../../mod.ts";

function createStream(length: number) {
  // deno-lint-ignore no-explicit-any
  let ti: any;
  return new ReadableStream({
    start(controller: ReadableStreamDefaultController) {
      let c = 0;
      ti = setInterval(() => {
        if (c >= length) {
          clearInterval(ti);
          controller.close();
          return;
        }
        c = c + 1;

        controller.enqueue(Uint8Array.of(255));
      }, 10);
    },
    cancel() {
      clearInterval(ti);
    },
  });
}

Deno.test("Bytes.ReadingTask.create() - ReadableStream", async () => {
  const s1 = createStream(8);

  const task1 = Bytes.ReadingTask.create(s1);
  const bs1 = await task1.run();

  assertStrictEquals(bs1.byteLength, 8);

  try {
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "InvalidStateError");
    assertStrictEquals(err.message, "`status` is not READY");
  }
});

Deno.test("Bytes.ReadingTask.create() - AsyncIterable", async () => {
  const ai1 = async function* () {
    yield Uint8Array.of(1);
    yield Uint8Array.of(2, 3);
  };
  const task1 = Bytes.ReadingTask.create(ai1());
  const bs1 = await task1.run();
  assertStrictEquals(bs1.byteLength, 3);

  // deno-lint-ignore require-yield
  const ai2 = async function* (): AsyncGenerator<
    Uint8Array<ArrayBuffer>,
    void,
    void
  > {
    return;
  };
  const reader2 = Bytes.ReadingTask.create(ai2());
  const bs2 = await reader2.run();
  assertStrictEquals(bs2.byteLength, 0);
});

Deno.test("Bytes.ReadingTask.create() - argumenterror", async () => {
  try {
    const task1 = Bytes.ReadingTask.create(
      3 as unknown as AsyncIterable<Uint8Array<ArrayBuffer>>,
    );
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "TypeError");
    assertStrictEquals(
      err.message,
      "`stream` must be a `ReadableStream<Uint8Array>` or an `AsyncIterable<Uint8Array>`.",
    );
  }
});

Deno.test("Bytes.ReadingTask.create() - Iterable", async () => {
  const task1 = Bytes.ReadingTask.create([
    Uint8Array.of(1),
    Uint8Array.of(2, 3),
  ]);
  const bs1 = await task1.run();
  assertStrictEquals(bs1.byteLength, 3);

  const reader2 = Bytes.ReadingTask.create([] as Uint8Array<ArrayBuffer>[]);
  const bs2 = await reader2.run();
  assertStrictEquals(bs2.byteLength, 0);
});

Deno.test("Bytes.ReadingTask.prototype[Symbol.toStringTag]", async () => {
  const task1 = Bytes.ReadingTask.create([
    Uint8Array.of(1),
    Uint8Array.of(2, 3),
  ]);
  assertStrictEquals(task1[Symbol.toStringTag], "ReadingTask");
});

Deno.test("Bytes.ReadingTask.prototype.run() - typeerror of chunk", async () => {
  const ai1 = async function* () {
    yield 1;
    yield 2;
  };
  const task1 = Bytes.ReadingTask.create(
    ai1() as unknown as AsyncIterable<Uint8Array<ArrayBuffer>>,
  );
  try {
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "TypeError");
    assertStrictEquals(
      err.message,
      "`chunk` must be an `Uint8Array<ArrayBuffer>`.",
    );
  }
});

Deno.test("Bytes.ReadingTask.prototype.run() - typeerror of chunk", async () => {
  try {
    const task1 = Bytes.ReadingTask.create(
      [3] as unknown as Iterable<Uint8Array<ArrayBuffer>>,
    );
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "TypeError");
    assertStrictEquals(
      err.message,
      "`chunk` must be an `Uint8Array<ArrayBuffer>`.",
    );
  }
});

Deno.test("Bytes.ReadingTask.create() - total", async () => {
  const s1 = createStream(8);
  const task1 = Bytes.ReadingTask.create(s1, { total: 8 });
  const bs1 = await task1.run();
  assertStrictEquals(bs1.byteLength, 8);
  assertStrictEquals(bs1.buffer.byteLength, 8);

  const s2 = createStream(8);
  const reader2 = Bytes.ReadingTask.create(s2, { total: 9 });
  const bs2 = await reader2.run();
  assertStrictEquals(bs2.byteLength, 8);
  assertStrictEquals(bs2.buffer.byteLength, 8);

  const s3 = createStream(8);
  const reader3 = Bytes.ReadingTask.create(s3, { total: 7 });
  const bs3 = await reader3.run();
  assertStrictEquals(bs3.byteLength, 8);
  assertStrictEquals(bs3.buffer.byteLength, 8);

  const s4 = createStream(8);
  const reader4 = Bytes.ReadingTask.create(s4, { total: 0 });
  const bs4 = await reader4.run();
  assertStrictEquals(bs4.byteLength, 8);
  assertStrictEquals(bs4.buffer.byteLength, 8);

  const s5 = createStream(8);
  const reader5 = Bytes.ReadingTask.create(s5, {
    total: undefined,
  });
  const bs5 = await reader5.run();
  assertStrictEquals(bs5.byteLength, 8);
  assertStrictEquals(bs5.buffer.byteLength, 8);
});

Deno.test("Bytes.ReadingTask.create() - signal:AbortController.abort()", async () => {
  const s1 = createStream(100);
  const ac1 = new AbortController();
  const task1 = Bytes.ReadingTask.create(s1, { signal: ac1.signal });
  try {
    setTimeout(() => {
      ac1.abort();
    }, 5);
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "AbortError");
    console.log(err.message);
    assertStrictEquals(task1.status, "aborted");
  }
});

Deno.test("Bytes.ReadingTask.create() - signal:already aborted", async () => {
  const s1 = createStream(100);
  const task1 = Bytes.ReadingTask.create(s1, {
    signal: AbortSignal.abort(new RangeError("1122")),
  });
  try {
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "AbortError");
    assertStrictEquals((err.cause as Error).name, "RangeError");
    console.log(err.message);
    assertStrictEquals(task1.status, "aborted");
  }
});

Deno.test("Bytes.ReadingTask.create() - signal:already aborted", async () => {
  const s2 = createStream(100);
  const ac2 = new AbortController();
  ac2.abort(new RangeError("123"));
  const task1 = Bytes.ReadingTask.create(s2, { signal: ac2.signal });
  try {
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "AbortError");
    assertStrictEquals((err.cause as Error).name, "RangeError");
    assertStrictEquals(task1.status, "aborted");
  }
});

Deno.test("Bytes.ReadingTask.create() - signal:already aborted", async () => {
  const s2 = createStream(100);
  const ac2 = new AbortController();
  ac2.abort();
  const task1 = Bytes.ReadingTask.create(s2, { signal: ac2.signal });
  try {
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "AbortError");
    assertStrictEquals(task1.status, "aborted");
  }
});

Deno.test("Bytes.ReadingTask.create() - signal:AbortSignal.timeout", async () => {
  const s1 = createStream(100);
  const task1 = Bytes.ReadingTask.create(s1, {
    signal: AbortSignal.timeout(5),
  });
  try {
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "TimeoutError");
    console.log(err.message);
    assertStrictEquals(task1.status, "aborted");
  }
});

Deno.test("Bytes.ReadingTask.prototype.addEventListener()", async () => {
  const s1 = createStream(8);
  const task1 = Bytes.ReadingTask.create(s1);

  let loadedLength = -1;
  let totalLength = -1;
  let lengthComputable = undefined;
  const names: string[] = [];
  const listener = (e: ProgressEvent) => {
    names.push(e.type);
    loadedLength = e.loaded;
    totalLength = e.total;
    lengthComputable = e.lengthComputable;
  };

  task1.addEventListener("loadstart", listener as EventListener);
  // task1.addEventListener("load", listener as EventListener);
  task1.addEventListener("progress", listener as EventListener);
  // task1.addEventListener("abort", listener as EventListener);
  // task1.addEventListener("timeout", listener as EventListener);
  // task1.addEventListener("error", listener as EventListener);
  task1.addEventListener("loadend", listener as EventListener);

  const bs1 = await task1.run();
  assertStrictEquals(bs1.byteLength, 8);
  assertStrictEquals(loadedLength, 8);
  assertStrictEquals(totalLength, 0);
  assertStrictEquals(lengthComputable, false);
  assertStrictEquals(names.filter((n) => n === "loadstart").length, 1);
  // assertStrictEquals(names.filter((n) => n === "load").length, 1);
  assertStrictEquals(names.filter((n) => n === "progress").length >= 1, true);
  // assertStrictEquals(names.filter((n) => n === "abort").length, 0);
  // assertStrictEquals(names.filter((n) => n === "timeout").length, 0);
  // assertStrictEquals(names.filter((n) => n === "error").length, 0);
  assertStrictEquals(names.filter((n) => n === "loadend").length, 1);
});

Deno.test("Bytes.ReadingTask.prototype.addEventListener() - total", async () => {
  const s1 = createStream(8);
  const task1 = Bytes.ReadingTask.create(s1, { total: 200 });

  let loadedLength = -1;
  let totalLength = -1;
  let lengthComputable = undefined;
  const names: string[] = [];
  const listener = (e: ProgressEvent) => {
    names.push(e.type);
    loadedLength = e.loaded;
    totalLength = e.total;
    lengthComputable = e.lengthComputable;
  };

  task1.addEventListener("loadstart", listener as EventListener);
  // task1.addEventListener("load", listener as EventListener);
  task1.addEventListener("progress", listener as EventListener);
  // task1.addEventListener("abort", listener as EventListener);
  // task1.addEventListener("timeout", listener as EventListener);
  // task1.addEventListener("error", listener as EventListener);
  task1.addEventListener("loadend", listener as EventListener);

  const bs1 = await task1.run();
  assertStrictEquals(bs1.byteLength, 8);
  assertStrictEquals(loadedLength, 8);
  assertStrictEquals(totalLength, 200);
  assertStrictEquals(lengthComputable, true);
  assertStrictEquals(names.filter((n) => n === "loadstart").length, 1);
  // assertStrictEquals(names.filter((n) => n === "load").length, 1);
  assertStrictEquals(names.filter((n) => n === "progress").length >= 1, true);
  // assertStrictEquals(names.filter((n) => n === "abort").length, 0);
  // assertStrictEquals(names.filter((n) => n === "timeout").length, 0);
  // assertStrictEquals(names.filter((n) => n === "error").length, 0);
  assertStrictEquals(names.filter((n) => n === "loadend").length, 1);
});

Deno.test("Bytes.ReadingTask.prototype.addEventListener() - abort", async () => {
  const s1 = createStream(8);
  const ac1 = new AbortController();
  const task1 = Bytes.ReadingTask.create(s1, { signal: ac1.signal });
  let loadedLength = -1;
  let totalLength = -1;
  let lengthComputable = undefined;
  const names: string[] = [];
  const listener = (e: ProgressEvent) => {
    names.push(e.type);
    loadedLength = e.loaded;
    totalLength = e.total;
    lengthComputable = e.lengthComputable;
  };

  task1.addEventListener("loadstart", listener as EventListener);
  // task1.addEventListener("load", listener as EventListener);
  task1.addEventListener("progress", listener as EventListener);
  // task1.addEventListener("abort", listener as EventListener);
  // task1.addEventListener("timeout", listener as EventListener);
  // task1.addEventListener("error", listener as EventListener);
  task1.addEventListener("loadend", listener as EventListener);

  setTimeout(() => {
    ac1.abort();
  }, 20);
  try {
    await task1.run();
    unreachable();
  } catch (ex) {
    void ex;
  }
  //assertStrictEquals(bs1.byteLength, 8);
  assertStrictEquals(loadedLength >= 1, true);
  assertStrictEquals(totalLength, 0);
  assertStrictEquals(lengthComputable, false);
  assertStrictEquals(names.filter((n) => n === "loadstart").length, 1);
  // assertStrictEquals(names.filter((n) => n === "load").length, 0);
  assertStrictEquals(names.filter((n) => n === "progress").length >= 1, true);
  // assertStrictEquals(names.filter((n) => n === "abort").length, 1);
  // assertStrictEquals(names.filter((n) => n === "timeout").length, 0);
  // assertStrictEquals(names.filter((n) => n === "error").length, 0);
  assertStrictEquals(names.filter((n) => n === "loadend").length, 1);
});

//TODO
// Bytes.ReadingTask.prototype.addEventListener() - error
// Bytes.ReadingTask.prototype.status - error

Deno.test("Bytes.ReadingTask.prototype.status", async () => {
  const s1 = createStream(80);
  const task1 = Bytes.ReadingTask.create(s1);

  assertStrictEquals(task1.status, "ready");

  const tasks = [task1.run()];
  assertStrictEquals(task1.status, "running");
  const bs1 = await Promise.all(tasks);
  assertStrictEquals(bs1[0].byteLength, 80);
  assertStrictEquals(task1.status, "completed");
});

Deno.test("Bytes.ReadingTask.prototype.loaded/total/indetrminate", async () => {
  const s1 = createStream(80);
  const task1 = Bytes.ReadingTask.create(s1);

  assertStrictEquals(task1.total, 0);
  assertStrictEquals(task1.loaded, 0);
  assertStrictEquals(task1.indeterminate, true);

  const tasks = [task1.run()];
  const bs1 = await Promise.all(tasks);
  assertStrictEquals(bs1[0].byteLength, 80);

  assertStrictEquals(task1.total, 0);
  assertStrictEquals(task1.loaded, 80);
  assertStrictEquals(task1.indeterminate, true);
});

Deno.test("Bytes.ReadingTask.prototype.loaded/total/indetrminate", async () => {
  const s1 = createStream(80);
  const task1 = Bytes.ReadingTask.create(s1, { total: 80 });

  assertStrictEquals(task1.total, 80);
  assertStrictEquals(task1.loaded, 0);
  assertStrictEquals(task1.indeterminate, false);

  const tasks = [task1.run()];
  const bs1 = await Promise.all(tasks);
  assertStrictEquals(bs1[0].byteLength, 80);

  assertStrictEquals(task1.total, 80);
  assertStrictEquals(task1.loaded, 80);
  assertStrictEquals(task1.indeterminate, false);
});

Deno.test("Bytes.ReadingTask.prototype.loaded/total/indetrminate - abort", async () => {
  const s1 = createStream(100);
  const ac1 = new AbortController();
  const task1 = Bytes.ReadingTask.create(s1, { signal: ac1.signal });
  try {
    setTimeout(() => {
      ac1.abort();
    }, 5);
    await task1.run();
    unreachable();
  } catch (e) {
    const err = e as Error;
    assertStrictEquals(err.name, "AbortError");
    assertStrictEquals(task1.loaded >= 0, true);
  }
});
