import { Person } from "@/models/Person";

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
  )},${((totalSeconds % 1) * 10).toFixed(0)}s`;
}

export function timestampToTimeString(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function calcLPerMin(person: Person, sumTimeSeconds: number) {
  const druckDiff = person.druck.start - person.druck.end!;
  const minutes = sumTimeSeconds / 60;

  return ((6 * druckDiff) / 1.1 / minutes).toFixed(2);
}

export function milisecondsToSeconds(mili: number): number {
  return mili / 1000;
}

export function secondsToHours(seconds: number): number {
  return seconds / (60 * 60);
}
