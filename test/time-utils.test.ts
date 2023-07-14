import { expect, test } from "vitest";
import { WaitByGreenchTimeAPI, getGreenchTimeByAPI } from "../src/time-utils-async";

test("getGreenchTime result is truthy", async () => {
  const timeInfo = await getGreenchTimeByAPI();
  expect(timeInfo).toBeTruthy();
});

test("unixtime is not zero", async () => {
  const timeInfo = await getGreenchTimeByAPI();
  expect(timeInfo.unixtime).toBeGreaterThan(0);
});

test("unixtime does not go back", async () => {
  const timeInfo1 = await getGreenchTimeByAPI();
  const timeInfo2 = await getGreenchTimeByAPI();
  expect(timeInfo2.unixtime - timeInfo1.unixtime).toBeGreaterThanOrEqual(0);
});


test('WaitByGreenchTimeAPI --> wait at least 1 sec',async ()=>{
    const minimalTimoutSec = 1;
    const startMs = Date.now();
    const actualTimeOutSec = await WaitByGreenchTimeAPI(minimalTimoutSec)
    const endMs = Date.now();
    expect(actualTimeOutSec).toBeGreaterThanOrEqual(minimalTimoutSec);
    expect(endMs-startMs).toBeGreaterThanOrEqual(minimalTimoutSec*1000);
})

test('WaitByGreenchTimeAPI --> wait at least 2 sec',async ()=>{
    const minimalTimoutSec = 2;
    const startMs = Date.now();
    const actualTimeOutSec = await WaitByGreenchTimeAPI(minimalTimoutSec)
    const endMs = Date.now();
    expect(actualTimeOutSec).toBeGreaterThanOrEqual(minimalTimoutSec);
    expect(endMs-startMs).toBeGreaterThanOrEqual(minimalTimoutSec*1000);
})
