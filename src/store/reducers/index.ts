import { combineReducers } from "redux";
import loginReducer, { LoginState } from "./login";
import postsReducer, { PostsState } from "./posts";

export interface AppState {
  posts: PostsState,
  login: LoginState
}
const reducers = {
  posts: postsReducer,
  login: loginReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
