export function logEverySec(): void {
  const intervalPeriodMs = 1000;
  const callback = () => console.log("calback is called");
  setInterval(callback, intervalPeriodMs);
}

// export function busyWait(timeoutMs: number): void {
//   const start = Date.now();

//   for (let index = 0; ; index++) {
    
//     if((Date.now() - start) > timeoutMs)
//     {
//       break;
//     }
    
//   }
// }

export function pauseMs(sleepMs: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, sleepMs);
  });
}

export function isItDecember(): boolean {
  const currentDate = new Date();
  const monthZeroBased = currentDate.getMonth();
  return monthZeroBased == 11;
}
