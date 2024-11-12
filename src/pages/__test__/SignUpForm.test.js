import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import SignUpForm from "../auth/SignUpForm";


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
