import { combineReducers } from "redux";
import loginReducer, { LoginState } from "./login";
import postsReducer, { PostsState } from "./posts";
import {initialState as loginState} from "./login" ;
import { initialState as postsState } from "./posts"; 

export interface AppState {
  posts: PostsState,
  login: LoginState
}

export const initialAppState: AppState = {
  login: loginState,
  posts: postsState,
};

const reducers = {
  posts: postsReducer,
  login: loginReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
