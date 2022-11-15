import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StationView, { StationStatus } from "../../components/StationView";
import { ScoreBoardData } from "../../models/ScoreBoardData";

const mockScoreBoardData: ScoreBoardData = {
  name: "Test",
  person: {
    name: "Test",
    druck: {
      start: 300,
      end: undefined,
    },
  },
  endStationTime: undefined,
  endTimestamp: undefined,
  finished: false,
  startTimestamp: undefined,
  stationIndex: 0,
  stationStatus: StationStatus.NO_BREAK,
  stationTimes: [],
};

describe("StationView", () => {
  it("renders", () => {
    render(
      <StationView scoreBoardData={mockScoreBoardData} save={() => undefined} />
    );
  });
});
