import postsReducer, { initialState } from "./posts";
import * as types from "../types";
import { typedAction } from "../../utils/typedAction";

test("Should return initial state", () => {
  const action = typedAction("random_action");

  expect(postsReducer(initialState, action)).toEqual(initialState);
});

test("Should return is loading", () => {
  const action = typedAction(types.FETCHING_POSTS);
  const expectedResult = {
    ...initialState,
    isLoading: true,
  };
  expect(postsReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return new posts", () => {
  const action = typedAction(types.FETCHING_POSTS_SUCCESS, {
    posts: [
      {
        id: "3",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "4",
        description: "test",
        imageUrl: "photo2",
        likes: 1,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
    next: "/posts?offset=3&limit=10",
  });
  const initState = {
    ...initialState,
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      }
    ]
  };
  const expectedResult = {
    ...initialState,
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "3",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "4",
        description: "test",
        imageUrl: "photo2",
        likes: 1,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
    next: "/posts?offset=3&limit=10",
  };
  expect(postsReducer(initState, action)).toEqual(expectedResult);
});

test("Should return an error", () => {
  const action = typedAction(types.FETCHING_POSTS_ERROR, "something went wrong");
  const expectedResult = {
    ...initialState,
    error: "something went wrong",
  };
  expect(postsReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return is searching/loading", () => {
  const action = typedAction(types.SEARCHING_POSTS);
  const expectedResult = {
    ...initialState,
    isLoading: true,
  };
  expect(postsReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return search result", () => {
  const action = typedAction(types.SEARCHING_POSTS_SUCCESS, {
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
  });
  const expectedResult = {
    ...initialState,
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
  };
  expect(postsReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return like a post", () => {
  const action = typedAction(types.LIKE_POST_SUCCESS, {
    id: "1",
    description: "test",
    imageUrl: "photo",
    likes: 2,
    likedPost: true,
    create_at: "10/20/2021",
  });

  const initState = {
    ...initialState,
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "2",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
  };

  const expectedResult = {
    ...initialState,
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: true,
        create_at: "10/20/2021",
      },
      {
        id: "2",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
  };
  expect(postsReducer(initState, action)).toEqual(expectedResult);
});

test("Should clear posts array", () => {
  const action = typedAction(types.CLEAR_POSTS);

  const initState = {
    ...initialState,
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "2",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
  };

  const expectedResult = {
    ...initialState,
    posts: [],
  };
  expect(postsReducer(initState, action)).toEqual(expectedResult);
});

test("Should return is creating post", () => {
  const action = typedAction(types.CREATING_POST);
  const expectedResult = {
    ...initialState,
    newPost: {
      isCreating: true,
      error: null,
    },
  };
  expect(postsReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return created post", () => {
  const action = typedAction(types.CREATING_POST_SUCCESS, {
    post: {
      id: "3",
      description: "test",
      imageUrl: "photo",
      likes: 2,
      likedPost: false,
      create_at: "10/20/2021",
    },
  });
  const initState = {
    ...initialState,
    posts: [
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "2",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
  };
  const expectedResult = {
    ...initialState,
    posts: [
      {
        id: "3",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "1",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
      {
        id: "2",
        description: "test",
        imageUrl: "photo",
        likes: 2,
        likedPost: false,
        create_at: "10/20/2021",
      },
    ],
  };
  expect(postsReducer(initState, action)).toEqual(expectedResult);
});

test("Should return created post  error", () => {
  const action = typedAction(
    types.CREATING_POST_ERROR,
    "something went wrong"
  );
  const expectedResult = {
    ...initialState,
    newPost: {
      isCreating: false,
      error: "something went wrong",
    },
  };
  expect(postsReducer(initialState, action)).toEqual(expectedResult);
});