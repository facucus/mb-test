import { renderWithRedux, screen } from "../../utils/test-utils";
import "jest-styled-components";
import Spinner from ".";



test("Should render the spinner", () => {
  renderWithRedux(<Spinner show={true} />);
  const loader = screen.getByTestId("loader");
  expect(loader).toBeInTheDocument()
});

test("Should nnont render the spinner", () => {
  renderWithRedux(<Spinner show={false} />);
  const loader = screen.queryByTestId("loader");
  expect(loader).not.toBeInTheDocument();
});