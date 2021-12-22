import { renderWithRedux, screen } from "../../utils/test-utils";
import RequireAuth from ".";
import { initialAppState } from "../../store/reducers";

test("Should render protected content", () => {
  const initialState = {
    ...initialAppState,
    login: {
      ...initialAppState.login,
      isAuthenticated: true,
      photoUrl: "my-photo.jpg",
      username: "test-user",
    },
  };
  renderWithRedux(
    <RequireAuth>
      <h1>Protected content</h1>
    </RequireAuth>,
    { initialState }
  );
  const protectedContent = screen.queryByText(/Protected content/);
  expect(protectedContent).toBeInTheDocument();
});
