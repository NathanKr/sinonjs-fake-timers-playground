import { test, expect, afterEach, beforeEach, describe, vi } from "vitest";
import FakeTimers from "@sinonjs/fake-timers";
import {
  isItDecember,
  logEverySec,
  logEverySecAndPause5Ms,
  pauseMs,
} from "../src/time-utils";

describe("pauseMs", () => {
  let fakeClock;
  beforeEach(() => {
    // --- FakeTimers.install() point the real clock to the fake
    fakeClock = FakeTimers.install({
      shouldAdvanceTime: true,
      advanceTimeDelta: 50, // --- attached to the system clock
    });
  });

  afterEach(() => {
    fakeClock.uninstall();
  });

  test("pauseMs(1000) realy wait 1000 ms", async () => {
    const sleepMs = 1000;
    const startTimeTicks = Date.now();
    await pauseMs(sleepMs);
    const endTimeTicks = Date.now();
    expect(endTimeTicks - startTimeTicks).toBe(sleepMs);
  });

  test("pauseMs(500) realy wait 500 ms", async () => {
    const sleepMs = 500;
    const startTimeTicks = Date.now();
    await pauseMs(sleepMs);
    const endTimeTicks = Date.now();
    expect(endTimeTicks - startTimeTicks).toBe(sleepMs);
  });
});

describe("isItDecember", () => {
  let fakeClock;

  beforeEach(() => {
    // --- FakeTimers.install() point the real clock to the fake
    fakeClock = FakeTimers.install();
  });

  afterEach(() => {
    fakeClock.uninstall();
  });

  test("isItDecember is true on december", () => {
    const date = new Date(2022, 11, 15);
    fakeClock.setSystemTime(date.getTime());
    expect(isItDecember()).toBe(true);
  });

  test("isItDecember is on on november", () => {
    const date = new Date(2022, 10, 15);
    fakeClock.setSystemTime(date.getTime());
    expect(isItDecember()).toBe(false);
  });
});

describe("logEverySec", () => {
  let fakeClock;

  beforeEach(() => {
    // --- FakeTimers.install() point the real clock to the fake
    fakeClock = FakeTimers.install();
  });

  afterEach(() => {
    fakeClock.uninstall();
  });

  test("logEverySec is called 3 times after 3 sec -> use tick", () => {
    const spy = vi.spyOn(console, "log");
    logEverySec();
    fakeClock.tick(999);
    expect(spy).toBeCalledTimes(0);

    fakeClock.tick(1);
    expect(spy).toBeCalledTimes(1);

    fakeClock.tick(1000);
    expect(spy).toBeCalledTimes(2);

    fakeClock.tick(1000);
    expect(spy).toBeCalledTimes(3);
  });

  test("logEverySec is called 3 times after 3 sec -> use next", () => {
    const spy = vi.spyOn(console, "log");
    logEverySec();

    fakeClock.next(); // increment clock to next scheduled timer
    expect(spy).toBeCalledTimes(1);

    fakeClock.next(); // increment clock to next scheduled timer
    expect(spy).toBeCalledTimes(2);

    fakeClock.next(); // increment clock to next scheduled timer
    expect(spy).toBeCalledTimes(3);
  });
});

describe("pauseMe with async operations", () => {
  let fakeClock;

  beforeEach(() => {
    // --- FakeTimers.install() point the real clock to the fake
    fakeClock = FakeTimers.install();
  });

  afterEach(() => {
    fakeClock.uninstall();
  });

  test("use one nextAsync to process one pauseMs", async () => {
    fakeClock.nextAsync(); // -- process next task
    const startTimeTicks = Date.now();
    const sleepMs = 500;
    await pauseMs(sleepMs);
    const endTimeTicks = Date.now();
    expect(endTimeTicks - startTimeTicks).toBe(sleepMs);
  });

  test("use runAllAsync to process two pauseMs", async () => {
    fakeClock.runAllAsync(); // -- process all tasks
    const startTimeTicks = Date.now();
    const sleepMs = 500;
    await pauseMs(sleepMs);
    await pauseMs(sleepMs);
    const endTimeTicks = Date.now();
    expect(endTimeTicks - startTimeTicks).toBe(2 * sleepMs);
  });
});
