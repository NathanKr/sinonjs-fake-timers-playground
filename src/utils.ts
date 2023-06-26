export function pauseMs(sleepMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, sleepMs);
  });
}
