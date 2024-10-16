import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SignUpForm from "../SignUpForm";

// describe("Empty registration form", async () => {
//   render(<SignUpForm />);
//   const button = await screen.getByText("Sign Up");
//   fireEvent.click(button);
//   const formError = screen.getByText("This field may not be blank.");
//   expect(formError).toBeInTheDocument;
// });

// TypeError: default is not a function
describe("Empty registration form", () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test("shows error message when clicking Sign Up without filling the form", async () => {
    const button = screen.getByText("Sign Up");
    fireEvent.click(button);
    const formError = await screen.findByText("This field may not be blank.");
    expect(formError).toBeInTheDocument();
  });
});
