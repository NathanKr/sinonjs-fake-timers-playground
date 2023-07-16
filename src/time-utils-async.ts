import ITimeInfo from "./types/i-time-info";

export function logEverySecWithAwait(): void {
  const intervalPeriodMs = 1000;
  const callback = async () => {
    // this might fetch some data from server
    const results = await Promise.resolve(42);
    console.log("calback is called");
  };
  setInterval(callback, intervalPeriodMs);
}

export function logEverySecWaitAboveTimeoutMs(timeoutSec: number): void {
  const intervalPeriodMs = 1000;
  const callback = async () => {
    await WaitByGreenchTimeAPI(timeoutSec);
    console.log('called after WaitByGreenchTimeAPI');
  }
  setInterval(callback, intervalPeriodMs);
}

export function runInterval(callback, interval = 1000) {
  setInterval(async () => {
    // this might fetch some data from server
    const results = await Promise.resolve(42);
    callback(results);
  }, interval);
}

export async function getGreenchTimeByAPI(): Promise<ITimeInfo> | never {
  const url = "http://worldtimeapi.org/api/timezone/Asia/Jerusalem";
  try {
    const response = await fetch(url);
    const data: ITimeInfo = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching time info: " + error);
  }
}

export async function WaitByGreenchTimeAPI(
  minimalTimoutSec: number,
  saftyMargin = 0.5
): Promise<number> {
  const { unixtime: unixtimeStartSec } = await getGreenchTimeByAPI();
  let diffSec: number = -1;
  do {
    const { unixtime: unixtimeCurrentSec } = await getGreenchTimeByAPI();
    diffSec = unixtimeCurrentSec - unixtimeStartSec;
  } while (diffSec < minimalTimoutSec + saftyMargin);

  return diffSec;
}
