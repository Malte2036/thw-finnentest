import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BreakStationCard from "../../../components/StationCard/BreakStationCard";

describe("BreakStationCard", () => {
  it("renders nextStationText and nextStationButton", () => {
    render(
      <BreakStationCard
        seconds={10}
        stationIndex={0}
        clickNextStation={(passed: boolean | undefined) => undefined}
      />
    );

    const nextStationText = screen.getByText("Nächste Station: Treppe (2)", {
      exact: false,
    });

    const nextStationButton = screen.getByText("Nächste Station starten");

    expect(nextStationText).toBeVisible();
    expect(nextStationButton).toBeVisible();
  });
});
