import { renderWithRedux, screen } from "./utils/test-utils";
import { initialAppState } from "./store/reducers";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Should render login page", () => {
  renderWithRedux(<App />, { initialState: initialAppState });
  const loginTitle = screen.queryByText(/Login/);
  expect(loginTitle).toBeInTheDocument();
});

test("Should navigate to signup page", () => {
  renderWithRedux(<App />, { initialState: initialAppState });
  const btn = screen.queryByText(/Sign up/) as HTMLButtonElement;
  userEvent.click(btn);
  const signupTitle = screen.getByText(/Create Account/);
  expect(signupTitle).toBeInTheDocument();
});