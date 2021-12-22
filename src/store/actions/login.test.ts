import * as loginActions from "./login";
import * as types from "../types";

test("Should return USER_LOGIN type", () => {
  expect(loginActions.userLogin()).toEqual({type: types.USER_LOGIN});
});

test("Should return USER_LOGIN_SUCCESS type", () => {
  const loginResponse = {
    username: "test",
    photoUrl: "test-imaage.jpg"
  }
  expect(loginActions.userLoginSuccess(loginResponse)).toEqual({
    type: types.USER_LOGIN_SUCCESS,
    payload: loginResponse,
  });
});

test("Should return USER_LOGIN_ERROR type", () => {
  expect(loginActions.userLoginError("something went wrong")).toEqual({
    type: types.USER_LOGIN_ERROR,
    payload: "something went wrong",
  });
});