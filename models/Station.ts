export type Station = {
  name: string;
  description: string;
  time: number;
};

export const allStations: Station[] = [
  {
    name: "Gehen",
    description:
      "Gehen ohne und mit zwei Kanistern (Zeit: 4min) 100m gehen ohne Kanister und 100m gehen mit Kanister (je 16,6 kg)",
    time: 4 * 60,
  },
  {
    name: "Treppe",
    description:
      "Stufen rauf und heruntersteigen (Zeit: 3,5 min) ca. 180 Stufen (90 rauf und 90 hinunter)",
    time: 3.5 * 60,
  },
  {
    name: "Reifen",
    description:
      "Hämmern eines LKW-Reifen (Zeit: 2 min) Mit einem Vorschlaghammer (ca. 6kg) muss ein LKW-Reifen (ca. 47kg) über eine Strecke von drei Metern geschlagen werden.",
    time: 2 * 60,
  },
  {
    name: "Hindernis",
    description:
      "Unterkriechen und übersteigen von Hindernissen (Zeit: 3 min)\nAuf einer Länge von acht Metern werden mit einem Abstand von zwei Metern 60cm hohe Hindernisse aufgebaut.  Diese Hindernisse müssen in drei Durchläufen abwechselnd unterkrochen bzw. überstiegen werden.",
    time: 3 * 60,
  },
  {
    name: "Schlauch",
    description:
      "C-Schlauch einfach rollen (Zeit: 2min) Ein C-Schlauch muss einfach aufgerollt werden. Dabei darf sich das Ende nicht von der Stelle bewegen.",
    time: 2 * 60,
  },
];
