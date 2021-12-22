import { AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import * as types from "../types";
import { typedAction } from "../../utils/typedAction";
import * as storage from "../../utils/storage";


export interface LoginResponse {
  username: string;
  photoUrl?: string;
}

export type AppDispatch = ThunkDispatch<any, any, AnyAction>; 

export const userLogin = () => typedAction(types.USER_LOGIN);

export const userLoginSuccess = (payload: LoginResponse) =>
  typedAction(types.USER_LOGIN_SUCCESS, payload);

export const userLoginError = (error: any) =>
  typedAction(types.USER_LOGIN_ERROR, error);

export type LoginAction = ReturnType<
  typeof userLogin | typeof userLoginSuccess | typeof userLoginError
>;

export const login = (username: string, password: string, rememberMe: boolean = false) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(userLogin());
    try {
      const res = await axios.post("/login", {
        username,
        password
      });
      if(rememberMe) {
        storage.set("is-authenticated", { isAuthenticated: true, ...res.data });
      }
      
      dispatch(userLoginSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(userLoginError(error));
    }
  };
};

export const signup = (username: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(userLogin());
    try {
      const res = await axios.post("/signup", {
        username,
        password,
        confirmPassword,
      });

      dispatch(userLoginSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(userLoginError(error));
    }
  };
};