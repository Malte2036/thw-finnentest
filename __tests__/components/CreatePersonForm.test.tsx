import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CreatePersonForm from "@/components/CreatePersonForm";

describe("CreatePersonForm", () => {
  it("renders nameInputField and startdruckInputField", () => {
    render(<CreatePersonForm addPerson={() => undefined} allNames={[]} />);

    const nameInputField = screen.getByPlaceholderText("Name");
    const startdruckInputField = screen.getByPlaceholderText("Startdruck");

    expect(nameInputField).toBeVisible();
    expect(startdruckInputField).toBeVisible();
  });
});
