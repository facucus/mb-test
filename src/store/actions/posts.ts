import { AnyAction, Dispatch } from "redux";
import axios from "axios";
import * as types from "../types";
import {typedAction} from "../../utils/typedAction";
import { Post } from "../../mocks/handlers";

export interface PostsResponse {
  posts: Post[];
  next: string | null;
}

export const fetchingPosts = () => typedAction(types.FETCHING_POSTS);

export const fetchingPostsSuccess = (payload: PostsResponse) =>
  typedAction(types.FETCHING_POSTS_SUCCESS, payload);

export const fetchingPostsError = (error: any) =>
  typedAction(types.FETCHING_POSTS_ERROR, error);

export const searchingPosts = () => typedAction(types.SEARCHING_POSTS);
export const searchingPostSuccess = (payload: PostsResponse) =>
  typedAction(types.SEARCHING_POSTS_SUCCESS, payload);

export const clearPosts = () => typedAction(types.CLEAR_POSTS);

export const likingPost = () => typedAction(types.LIKE_POST);
export const likingPostSuccess = (payload: Post) => typedAction(types.LIKE_POST_SUCCESS, payload);
export const likingPostError = (error: any) => typedAction(types.LIKE_POST_ERROR, error);

export type PostsAction = ReturnType<
  | typeof fetchingPosts
  | typeof fetchingPostsSuccess
  | typeof fetchingPostsError
  | typeof likingPost
  | typeof likingPostSuccess
  | typeof likingPostError
  | typeof searchingPosts
  | typeof searchingPostSuccess
  | typeof clearPosts
>;

export const getPosts = (path: string = "/posts?offset=0&limit=10") => {
  const isSearch = path.indexOf("query") !== -1;
  return async (dispatch: Dispatch<AnyAction>) => {
    if(isSearch) {
      dispatch(searchingPosts());
    } else {
      dispatch(fetchingPosts());
    }
    try {
      const res = await axios.get(path);
      if (isSearch) {
        dispatch(fetchingPostsSuccess(res.data.posts));
      } else {
        dispatch(fetchingPostsSuccess(res.data.posts));
      }
    } catch (error) {
      dispatch(fetchingPostsError(error));
    }
  };
};

export const likePost = (id: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(likingPost());
    try {
      const res = await axios.put(`/posts/${id}/like`);
      dispatch(likingPostSuccess(res.data.post));
    } catch (error) {
      dispatch(likingPostError(error));
    }
  }
}