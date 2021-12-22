import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import Toggle from ".";

const props = {
  themeToToggle: "Light",
  toggleTheme: jest.fn(),
};

test("Should render the Toggle with proper text", () => {
  render(<Toggle {...props} />);
  const btn = screen.getByText(/Switch to Light Theme/);
  expect(btn).toBeInTheDocument();
});

test("Should call toggleTheme function", () => {
  render(<Toggle {...props} />);
  const btn = screen.getByText(/Switch to Light Theme/);
  userEvent.click(btn)
  expect(props.toggleTheme).toHaveBeenCalled()
});
