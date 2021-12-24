import { renderWithRedux, screen } from "../../utils/test-utils";
import Navbar from ".";
import { initialAppState } from "../../store/reducers";

test("Should not render the navbar component", () => {
  renderWithRedux(<Navbar />, { initialState: initialAppState });
  const navbar = screen.queryByTestId("navbar");
  expect(navbar).not.toBeInTheDocument();
})

test("Should render the navbar component", () => {
  const initialState = {
    ...initialAppState,
    login: {
      ...initialAppState.login,
      isAuthenticated: true,
      photoUrl: "my-photo.jpg",
      username: "test-user"
    },
  };
  renderWithRedux(<Navbar />, { initialState });
  const navbar = screen.queryByTestId("navbar");
  expect(navbar).toBeInTheDocument();
});