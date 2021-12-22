import * as createPostActions from "./createPost";
import * as types from "../types";

test("Should return CREATING_POST type", () => {
  expect(createPostActions.creatingPost()).toEqual({
    type: types.CREATING_POST,
  });
});

test("Should return CREATING_POST_SUCCESS type", () => {
  const post = {
    id: "1",
    description: "test",
    imageUrl: "photo",
    likes: 2,
    likedPost: false,
    create_at: "10/20/2021",
  };
  expect(createPostActions.creatingPostSuccess(post)).toEqual({
    type: types.CREATING_POST_SUCCESS,
    payload: post,
  });
});

test("Should return CREATING_POST_ERROR type", () => {
  expect(createPostActions.creatingPostError("something went wrong")).toEqual({
    type: types.CREATING_POST_ERROR,
    payload: "something went wrong",
  });
});
