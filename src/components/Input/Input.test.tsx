import { useState } from "react";
import { render, screen, fireEvent } from "../../utils/test-utils";
import Input from ".";



const TestInput: React.FunctionComponent<{error: string}> = ({error}) => {
  const [text, setText] = useState("")
  return <Input id="username" placeholder="username" type="text" value={text} error={error} onChange={(e) => setText(e.target.value)} />;
}

test("Should render input", () => {
  render(<TestInput error="" />);
  const input = screen.getByTestId("input")
  expect(input).toBeInTheDocument();
});

test("Should change input value", () => {
  render(<TestInput error="" />);
  const input = screen.getByTestId("input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "$23.0" } });
  expect(input.value).toBe("$23.0");
});

test("Should show an error message", () => {
  render(<TestInput error="show error message"/>);
  const input = screen.getByTestId("input") as HTMLInputElement;
  fireEvent.focus(input);
  fireEvent.focusOut(input);
  const textError = screen.getByText(/show error message/);
  expect(textError).toBeInTheDocument()
});