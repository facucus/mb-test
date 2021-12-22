import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import "jest-styled-components";
import LinkButton from ".";

const props = {
  onClick: jest.fn(),
};

test("Should render the LinknButton with children", () => {
  render(<LinkButton {...props}>Click me</LinkButton>);
  const button = screen.getByText(/Click me/);
  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule("cursor", "pointer");
});

test("Should call onClick", () => {
  render(<LinkButton {...props}>Click me</LinkButton>);
  const button = screen.getByText(/Click me/);
  userEvent.click(button);
  expect(props.onClick).toHaveBeenCalled();
});