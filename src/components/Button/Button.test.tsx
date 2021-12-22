import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import "jest-styled-components";
import Button from ".";

const props = {
  type: "button",
  onClick: jest.fn(),
};

test("Should render the button with children", () => {
  render(<Button {...props}>Click me</Button>);
  const button = screen.getByText(/Click me/);
  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule("cursor", "pointer");
});

test("Should render a disabled button", () => {
  render(<Button {...props} isDisabled={true}>Click me</Button>);
  const button = screen.getByText(/Click me/);
  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule("cursor", "not-allowed");
});

test("Should call onClick", () => {
  render(<Button {...props}>Click me</Button>);
  const button = screen.getByText(/Click me/);
  userEvent.click(button);
  expect(props.onClick).toHaveBeenCalled();
});
