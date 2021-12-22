import { renderWithRedux, screen } from "../../utils/test-utils";
import Navbar from ".";
import { initialAppState } from "../../store/reducers";


const props = {
  themeToToggle: "Light",
  onThemeToggler: jest.fn(),
};

test("Should not render the navbar component", () => {
  renderWithRedux(<Navbar {...props} />, { initialState: initialAppState });
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
  renderWithRedux(<Navbar {...props} />, { initialState });
  const navbar = screen.queryByTestId("navbar");
  expect(navbar).toBeInTheDocument();
});