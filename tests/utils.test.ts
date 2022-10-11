import "@testing-library/jest-dom";
import { Person } from "../models/Person";
import { calcLPerMin } from "../utils/utils";

describe("utils.calcLPerMin", () => {
  it("", () => {
    const person: Person = {
      name: "TestName",
      druck: { start: 150, end: 100 },
    };
    const sumTimeSeconds = 10 * 60;
    expect(calcLPerMin(person, sumTimeSeconds)).toEqual("27.27");
  });

  it("", () => {
    const person: Person = {
      name: "TestName",
      druck: { start: 182, end: 77 },
    };
    const sumTimeSeconds = 16 * 60 + 12;
    expect(calcLPerMin(person, sumTimeSeconds)).toEqual("35.35");
  });
});
