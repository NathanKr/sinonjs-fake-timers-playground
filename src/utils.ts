import FakeTimers from "@sinonjs/fake-timers";


export function fakeClockTicksVsRealClockTicks() {
  const fakeClock = FakeTimers.createClock();
  const startTimeTicks = Date.now();

  console.log(`fakeClock.now after create: ${fakeClock.now}`);
  /*
    A tick is measured in milliseconds;
    its initial length is determined by the clock rate of your processor: 
    If your CPU is 40 MHz or better, a tick is 1 ms. For slower processors,
    a tick represents 10 ms
    */
  const CLOCK_TICKS = 1500;
  console.log("setTimeout is invoked");
  fakeClock.setTimeout(function () {
    console.log(
      `setTimeout callback is invoked after : ${CLOCK_TICKS} clock ticks`
    );
  }, CLOCK_TICKS);

  fakeClock.tick(CLOCK_TICKS); // advance 15 ticks
  console.log(
    `fakeClock.now after fakeClock.tick(${CLOCK_TICKS}) : ${fakeClock.now}`
  );
  const endTimeTicks = Date.now();
  console.log(
    `total ticks real clock : ${
      endTimeTicks - startTimeTicks
    }. total ticks fake clock : ${CLOCK_TICKS}`
  );
}
