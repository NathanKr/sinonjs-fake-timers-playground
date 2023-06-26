import {test,expect} from 'vitest'
import { pauseMs } from '../src/utils';
import FakeTimers from "@sinonjs/fake-timers";


test('pauseMs wait using FakeTimers',async ()=>{
    const sleepMs = 1000;
    // --- FakeTimers.install() point the real clock to the fake
    const fakeClock = FakeTimers.install({
        shouldAdvanceTime: true,
        advanceTimeDelta: 50,
    });
    const startTimeTicks = Date.now();
    await pauseMs(sleepMs);
    const endTimeTicks = Date.now();
    fakeClock.uninstall();
    expect(endTimeTicks-startTimeTicks).toBe(sleepMs);
})