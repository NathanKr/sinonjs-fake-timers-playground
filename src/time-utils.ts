export function pauseMs(sleepMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, sleepMs);
  });
}

export function isItDecember() {
  const currentDate = new Date();
  const monthZeroBased = currentDate.getMonth();
  return (monthZeroBased == 11)
}
