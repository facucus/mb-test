import * as types from "../types";
import { PostsAction } from "../actions/posts";
import { Post } from "../../mocks/handlers";

interface NewPost {
  isCreating: boolean;
  error: any;
}

export interface PostsState {
  isLoading: boolean;
  error: any;
  posts: Post[];
  next: string | null;
  newPost: NewPost;
}

const initialState: PostsState = {
  isLoading: false,
  error: null,
  posts: [],
  next: null,
  newPost: {
    isCreating: false,
    error: null
  }
};

const postsReducer = (state: PostsState = initialState, action: PostsAction) => {
  switch (action.type) {
    case types.FETCHING_POSTS:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCHING_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        posts: [...state.posts, ...action.payload.posts],
        next: action.payload.next,
      };
    case types.FETCHING_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        posts: [],
      };
    case types.SEARCHING_POSTS:
      return {
        ...state,
        isLoading: true,
        error: null,
        posts: [],
      };
    case types.SEARCHING_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        posts: action.payload.posts,
      };
    case types.LIKE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        posts: state.posts.map((p: Post) => {
          if (p.id === action.payload.id) {
            return action.payload;
          }
          return p;
        }),
      };
    case types.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };
    case types.CREATING_POST:
      return {
        ...state,
        newPost: {
          isCreating: true,
          error: null,
        },
      };
    case types.CREATING_POST_ERROR:
      return {
        ...state,
        newPost: {
          isCreating: false,
          error: action.payload,
        },
      };
    case types.CREATING_POST_SUCCESS:
      return {
        ...state,
        posts:[action.payload.post, ...state.posts],
        newPost: {
          isCreating: false,
          error: null,
        },
      };
    default:
      return state;
  }
}

export default postsReducer;