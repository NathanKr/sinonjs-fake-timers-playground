import FakeTimers from "@sinonjs/fake-timers";

export function theRealClockReferenceTheFakeClock() {
  let fakeClock;
  try {
    // --- the real clock reference the fake clock
    fakeClock = FakeTimers.install();
    const CLOCK_TICKS_IN_MS = 15;

    // global setTimout is invoked with fakeClock
    console.log(`fakeClock.now after create: ${fakeClock.now}`);
    setTimeout(() => console.log("setTimeout is called"), CLOCK_TICKS_IN_MS);
    for (let index = 0; index < 2 * CLOCK_TICKS_IN_MS; index++) {
      console.log(`index : ${index}`);
      const time_unix = fakeClock.tick(1);
      console.log(`time_unix : ${time_unix}`);
      
    }
    console.log(`fakeClock.now after loop : ${fakeClock.now}`);
  } finally {
    // --- inside finally to uninstall even when exception happens
    // --- the real clock reference itself again
    fakeClock?.uninstall();
  }
}

export function fakeClockTicksVsRealClockTicks() {
  const fakeClock = FakeTimers.createClock();
  const startTimeTicks = Date.now();

  console.log(`fakeClock.now after create: ${fakeClock.now}`);
  const CLOCK_TICKS_IN_MS = 1500;
  console.log("setTimeout is invoked");
  fakeClock.setTimeout(function () {
    console.log(
      `setTimeout callback is invoked after : ${CLOCK_TICKS_IN_MS} clock ticks`
    );
  }, CLOCK_TICKS_IN_MS);

  const time_unix = fakeClock.tick(CLOCK_TICKS_IN_MS); // advance 15 ticks
  console.log(
    `fakeClock.now after fakeClock.tick(${CLOCK_TICKS_IN_MS}) : ${fakeClock.now} . time_unix : ${time_unix}`
  );
  const endTimeTicks = Date.now();
  console.log(
    `total ticks real clock : ${
      endTimeTicks - startTimeTicks
    }. total ticks fake clock : ${CLOCK_TICKS_IN_MS}`
  );
}
