import { DE } from "./DE";
import { EN } from "./EN";

export type LanguageData = {
  [key: string]: string;
};

let languageLocale: string | undefined = undefined;
export function setLanguageLocale(locale: string | undefined) {
  languageLocale = locale;
}

export function lang(key: string) {
  let val: string | undefined = undefined;
  switch (languageLocale) {
    case "en":
      val = EN[key];
      break;
    case "de":
    default:
      val = DE[key];
      break;
  }

  if (val === undefined) {
    console.warn(`Language key ${key} not found in ${languageLocale}!`);
    return key;
  }
  return val;
}
