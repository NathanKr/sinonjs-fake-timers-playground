import { test, expect, afterEach, beforeEach } from "vitest";
import FakeTimers from "@sinonjs/fake-timers";
import { pauseMs } from "../src/time-utils-sync";

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

  // -- not working , check why
  test("pauseMs(1000) realy wait 1000 ms", async () => {
    const sleepMs = 1000;
    const startTimeTicks = Date.now();
    await pauseMs(sleepMs);
    const endTimeTicks = Date.now();
    expect(endTimeTicks - startTimeTicks).toBe(sleepMs);
  });

  // -- not working , check why
  test("pauseMs(500) realy wait 500 ms", async () => {
    const sleepMs = 500;
    const startTimeTicks = Date.now();
    await pauseMs(sleepMs);
    const endTimeTicks = Date.now();
    expect(endTimeTicks - startTimeTicks).toBe(sleepMs);
  });

