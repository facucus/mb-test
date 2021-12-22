import { useState } from "react";
import { render, screen, fireEvent } from "../../utils/test-utils";
import Input from ".";



const TestInput = () => {
  const [text, setText] = useState("")
  return <Input id="username" placeholder="username" type="text" value={text} onChange={(e) => setText(e.target.value)} />;
}

test("Should render input", () => {
  render(<TestInput/>);
  const input = screen.getByTestId("input")
  expect(input).toBeInTheDocument();
});

test("Should change input value", () => {
  render(<TestInput />);
  const input = screen.getByTestId("input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "$23.0" } });
  expect(input.value).toBe("$23.0");
});