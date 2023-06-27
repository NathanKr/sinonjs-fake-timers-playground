export function pauseMs(sleepMs: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, sleepMs);
  });
}

export function isItDecember() : boolean{
  const currentDate = new Date();
  const monthZeroBased = currentDate.getMonth();
  return monthZeroBased == 11;
}
