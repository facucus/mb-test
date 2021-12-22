import { render, screen } from "../../utils/test-utils";
import Spinner from ".";



test("Should render the spinner", () => {
  render(<Spinner show={true} />);
  const loader = screen.getByTestId("loader");
  expect(loader).toBeInTheDocument()
});

test("Should nnont render the spinner", () => {
  render(<Spinner show={false} />);
  const loader = screen.queryByTestId("loader");
  expect(loader).not.toBeInTheDocument();
});