import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Form from "../components/Form";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("form component render", () => {
  render(<Form />);

  const form = screen.getByTestId("registerForm");
  expect(form).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText("Name");
  expect(nameInput).toBeInTheDocument();

  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText("Password");
  expect(passwordInput).toBeInTheDocument();

  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();
});

describe("form validation check", () => {
  test("email must be include @", async () => {
    render(<Form />);
    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "abcdefg");

    const alertForEmailValidation = screen.getByText(
      "email must have character, @"
    );
    expect(alertForEmailValidation).toBeInTheDocument();
  });

  test("there must not be alert when input value is correct", () => {
    render(<Form />);
    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "abcdefg@gmai.com");

    const alertForEmailValidation = screen.queryByText(
      "email must have character, @"
    );

    expect(alertForEmailValidation).not.toBeInTheDocument();
  });

  test("password must be longer than 6 chars", () => {
    render(<Form />);
    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "123");

    const alertForPasswordValidation = screen.getByText(
      "password must be longer than 6 characters"
    );

    expect(alertForPasswordValidation).toBeInTheDocument();
  });

  test("there must not be alert when password value is correct", () => {
    render(<Form />);
    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "12345678");

    const alertForPasswordValidation = screen.queryByText(
      "password must be longer than 6 characters"
    );

    expect(alertForPasswordValidation).not.toBeInTheDocument();
  });

  test("if", () => {
    render(<Form />);
    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "12345678");

    const alertForPasswordValidation = screen.queryByText(
      "password must be longer than 6 characters"
    );

    expect(alertForPasswordValidation).not.toBeInTheDocument();
  });
});

describe("check if the button is disabled when the form validation has not completed", () => {
  test("button is disabled when not validated", () => {
    render(<Form />);

    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "123");

    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "abcdefg");

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  test("empty string is NOT permitted as the name", () => {
    render(<Form />);
    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "123");

    const alertForPasswordValidation = screen.getByText(
      "password must be longer than 6 characters"
    );

    expect(alertForPasswordValidation).toBeInTheDocument();
  });

  test("button is NOT disabled when validated", () => {
    render(<Form />);

    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "12345678");

    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "abcdefg@gmail.com");

    const button = screen.getByRole("button");

    expect(button).not.toBeDisabled();
  });
});

describe("the success message will be shown after a user submit the form", () => {
  test("message must not be shown until submitted", async () => {
    render(<Form />);

    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "12345678");

    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "abcdefg@gmail.com");

    const successMessage = screen.queryByText("registered successfully!!");

    expect(successMessage).not.toBeInTheDocument();
  });

  test("message must  be shown after submitted", async () => {
    render(<Form />);

    const passwordInput = screen.getByPlaceholderText("Password");
    userEvent.type(passwordInput, "12345678");

    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "abcdefg@gmail.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const successMessage = screen.queryByText("registered successfully!!");

    expect(successMessage).toBeInTheDocument();
  });
});
