import loginReducer, { initialState } from "./login";
import * as types from "../types";
import { typedAction } from "../../utils/typedAction";

test("Should return initial state", () => {
  const action = typedAction("random_action");

  expect(loginReducer(initialState, action)).toEqual(initialState);
});

test("Should return is loading", () => {
  const action = typedAction(types.USER_LOGIN);
  const expectedResult = {
    ...initialState,
    isLoading: true
  }
  expect(loginReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return authenticated user", () => {
  const action = typedAction(types.USER_LOGIN_SUCCESS, {username: "facundo", photoUrl: "test-photo.jps"});
  const expectedResult = {
    ...initialState,
    isAuthenticated: true,
    username: "facundo",
    photoUrl: "test-photo.jps",
  };
  expect(loginReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return an error", () => {
  const action = typedAction(types.USER_LOGIN_ERROR, "something went wrong");
  const expectedResult = {
    ...initialState,
    error: "something went wrong",
  };
  expect(loginReducer(initialState, action)).toEqual(expectedResult);
});

test("Should return non authenticated user", () => {
  const action = typedAction(types.USER_LOGOUT);
  const initState = {
    ...initialState,
    isAuthenticated: true,
    username: "test",
    photoUrl: "test-image.jpg",
  };
  expect(loginReducer(initState, action)).toEqual(initialState);
});