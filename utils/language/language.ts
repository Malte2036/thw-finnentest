import { DE } from "./DE";

export type LanguageData = {
  [key: string]: string;
};

export function lang(key: string) {
  const val = DE[key];
  if (val === undefined) {
    console.warn(`Language key ${key} not found!`);
    return key;
  }
  return val;
}
