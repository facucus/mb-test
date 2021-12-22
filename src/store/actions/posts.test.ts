import * as postsActions from "./posts";
import * as types from "../types";

test("Should return FETCHING_POSTS type", () => {
  expect(postsActions.fetchingPosts()).toEqual({ type: types.FETCHING_POSTS });
});

test("Should return FETCHING_POSTS_SUCCESS type", () => {
  const postsResponse = {
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
    next: "next url",
  };
  expect(postsActions.fetchingPostsSuccess(postsResponse)).toEqual({
    type: types.FETCHING_POSTS_SUCCESS,
    payload: postsResponse,
  });
});

test("Should return FETCHING_POSTS_ERROR type", () => {
  expect(postsActions.fetchingPostsError("something went wrong")).toEqual({
    type: types.FETCHING_POSTS_ERROR,
    payload: "something went wrong",
  });
});

test("Should return SEARCHING_POSTS type", () => {
  expect(postsActions.searchingPosts()).toEqual({
    type: types.SEARCHING_POSTS,
  });
});

test("Should return SEARCHING_POSTS_SUCCESS type", () => {
  const postsResponse = {
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
    next: "next url",
  };
  expect(postsActions.searchingPostSuccess(postsResponse)).toEqual({
    type: types.SEARCHING_POSTS_SUCCESS,
    payload: postsResponse,
  });
});

test("Should return CLEAR_POSTS type", () => {
  expect(postsActions.clearPosts()).toEqual({ type: types.CLEAR_POSTS });
});

test("Should return LIKE_POST type", () => {
  expect(postsActions.likingPost()).toEqual({ type: types.LIKE_POST });
});

test("Should return LIKE_POST_SUCCESS type", () => {
  const post = {
    id: "1",
    description: "test",
    imageUrl: "photo",
    likes: 2,
    likedPost: true,
    create_at: "10/20/2021",
  };
  expect(postsActions.likingPostSuccess(post)).toEqual({
    type: types.LIKE_POST_SUCCESS,
    payload: post,
  });
});

test("Should return LIKE_POST_ERROR type", () => {
  expect(postsActions.likingPostError("something went wrong")).toEqual({
    type: types.LIKE_POST_ERROR,
    payload: "something went wrong",
  });
});