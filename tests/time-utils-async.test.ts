// --- this is from https://gist.github.com/apieceofbart/e6dea8d884d29cf88cdb54ef14ddbcc4

import { vi, test, expect, beforeEach, afterEach } from "vitest";
import { logEverySecWithAwait, runInterval } from "../src/time-utils-async";
import FakeTimers from "@sinonjs/fake-timers";

// Goal: We want to test that function - make sure our callback was called
// The easiest way would be to pause inside test for as long as we neeed:

// What we need to do is to have some way to resolve the pending promises. One way to do it is to use process.nextTick:

const flushPromises = () => new Promise((res) => process.nextTick(res));

// IF YOU'RE USING NEW JEST (>27) WITH MODERN TIMERS YOU HAVE TO USE A SLIGHTLY DIFFERENT VERSION

// const flushPromises = () => new Promise(vi.requireActual("timers").setImmediate)

let fakeClock;

beforeEach(() => {
  // --- FakeTimers.install() point the real clock to the fake
  fakeClock = FakeTimers.install();
});

afterEach(() => {
  fakeClock.uninstall();
});

test("should call callback in runInterval", async () => {
  const mockCallback = vi.fn();

  runInterval(mockCallback);

  fakeClock.tick(1000);

  await flushPromises();
  expect(mockCallback).toHaveBeenCalledTimes(1);

  fakeClock.tick(1000);
  await flushPromises();
  expect(mockCallback).toHaveBeenCalledTimes(2);
});

test("should call console.log in logEverySecWithAwait", async () => {
  const spy = vi.spyOn(console, "log");
  logEverySecWithAwait();

  fakeClock.tick(1000);
  await flushPromises();
  expect(spy).toHaveBeenCalledTimes(1);

  fakeClock.tick(1000);
  await flushPromises();
  expect(spy).toHaveBeenCalledTimes(2);
});
