import { test, expect, afterEach, beforeEach, describe } from "vitest";
import FakeTimers from "@sinonjs/fake-timers";
import { isItDecember, pauseMs } from "../src/time-utils";

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
