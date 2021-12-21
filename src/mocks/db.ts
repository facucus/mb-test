import { v4 as uuidv4 } from "uuid";
import randomWords from "random-words";

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export const initialPosts = () => {
  const posts = []
  for(let i = 0; i < 30; i++) {
    posts.push({
      id: uuidv4(),
      imageUrl: `https://picsum.photos/id/${i+1}/400`,
      likes: getRandomNumber(30),
      likedPost: false,
      description: randomWords({ min: 10, max: 30, join: " " }),
      create_at: randomDate(new Date(2020, 0, 1), new Date()),
    });
  }
  return posts;
};