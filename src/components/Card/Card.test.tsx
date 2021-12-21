import { renderWithRedux, screen } from "../../utils/test-utils";
import "jest-styled-components";
import Card from ".";

const props = {
  id: "1",
  imageUrl: "my-image.jpg",
  create_at: new Date("08-20-2021").toString(),
  likes: 2,
  description: "This is my description",
  likedPost: false
};

test("Should render the card with all props", () => {
  renderWithRedux(<Card {...props} />);
  const image = screen.getAllByAltText(/post pic/)[0];
  expect(image).toBeInTheDocument();
  const datetext = screen.getByText("08/20/2021");
  expect(datetext).toBeInTheDocument();
  const likesCount = screen.getByText(/2 likes/);
  expect(likesCount).toBeInTheDocument();
  const description = screen.getByText(/This is my description/);
  expect(description).toBeInTheDocument();
  const likedcheckbox = screen.getByTestId("likedPost") as HTMLInputElement;
  expect(likedcheckbox.checked).toEqual(false);
});

