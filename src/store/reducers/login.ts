import * as types from "../types";
import { LoginAction } from "../actions/login";

export interface LoginState {
  isLoading: boolean;
  isAuthenticated: boolean;
  username: string;
  photoUrl: string;
  error: any;
}

export const initialState: LoginState = {
  isLoading: false,
  isAuthenticated: false,
  username: "",
  photoUrl: "",
  error: null,
};

const loginReducer = (
  state: LoginState = initialState,
  action: LoginAction
) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        isLoading: false,
        error: null,
        isAuthenticated: true,
        ...action.payload,
      };
    case types.USER_LOGIN_ERROR:
      return {
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        username: "",
        photoUrl: "",
      };
    default:
      return state;
  }
};

export default loginReducer;
