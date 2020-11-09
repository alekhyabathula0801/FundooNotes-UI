import React from "react";
import { render } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";

test("renders Login component", () => {
  const { asFragment, getByText, getByTestId } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByText(/Sign in/)).toBeInTheDocument();
  expect(getByText(/Fundoo/)).toBeInTheDocument();
  expect(getByTestId("login-sign-in")).toHaveTextContent("Sign in");
});
