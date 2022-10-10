function padTo2Digits(num: number) {
  return num.toFixed(0).toString().padStart(2, "0");
}

export function formatSecondsToMinutesAndSeconds(totalSeconds: number) {
  const negativ = totalSeconds < 0;
  if (negativ) {
    totalSeconds = -totalSeconds;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${negativ ? "-" : ""}${padTo2Digits(minutes)}min ${padTo2Digits(
    seconds
  )}s`;
}
