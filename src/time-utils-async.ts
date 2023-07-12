export function logEverySecWithAwait(): void {
  const intervalPeriodMs = 1000;
  const callback = async () => {
    // this might fetch some data from server
    const results = await Promise.resolve(42); 
    console.log("calback is called");
  };
  setInterval(callback, intervalPeriodMs);
}

export function runInterval(callback, interval = 1000) {
  setInterval(async () => {
    const results = await Promise.resolve(42); // this might fetch some data from server
    callback(results);
  }, interval);
}
