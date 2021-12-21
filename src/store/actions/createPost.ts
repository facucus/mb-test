import { AnyAction, Dispatch } from "redux";
import axios from "axios";
import * as types from "../types";
import { typedAction } from "../../utils/typedAction";
import * as storage from "../../utils/storage";
import { Post } from '../../mocks/handlers';

export interface LoginResponse {
  username: string;
  photoUrl?: string;
}

const creatingPost = () => typedAction(types.CREATING_POST);

const creatingPostSuccess = (payload: Post) =>
  typedAction(types.CREATING_POST_SUCCESS, payload);

const creatingPostError = (error: any) =>
  typedAction(types.CREATING_POST_ERROR, error);

export type CreatePostAction = ReturnType<
  typeof creatingPost | typeof creatingPostSuccess | typeof creatingPostError
>;

export const createPost = (file: string, description: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(creatingPost());
    try {
      const res = await axios.post("/posts", {
        file,
        description,
      });

      dispatch(creatingPostSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(creatingPostError(error));
    }
  };
};