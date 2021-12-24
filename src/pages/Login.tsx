import {ChangeEvent, useState} from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";

import { CardStyle } from "../components/Card";
import { AppDispatch, login, userLoginSuccess } from "../store/actions/login";
import Input from "../components/Input";
import Button from "../components/Button";

import "./social-buttons.css";
import { AppState } from "../store/reducers";

export const MainTitle = styled.h1`
  color: ${({ theme }) => theme.titleColor};
  text-align: center;
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 350px;

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.reverse {
      justify-content: flex-end;
    }
  }
  label {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
`;

export const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const Login: React.FunctionComponent<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    dispatch(login(username, password, rememberMe)).then(() => {
      navigate("/");
    });
  };

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      const { givenName, imageUrl } = response.profileObj;
      dispatch(
        userLoginSuccess({
          username: givenName,
          photoUrl: imageUrl,
        })
      );
      navigate("/");
    }
    
  };

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    if (response.name && response.picture) {
      dispatch(
        userLoginSuccess({
          username: response.name,
          photoUrl: response.picture.data.url,
        })
      );
      navigate("/");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    switch (e.target.id) {
      case "username":
        return setUsername(e.target.value);
      case "password":
        return setPassword(e.target.value);
      default:
        return;
    }
  };

  return (
    <Main>
      <CardStyle padding="30px">
        <MainTitle>Login</MainTitle>
        <FormStyle onSubmit={handleSubmitForm}>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            error={!username ? "You must enter a username" : ""}
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            error={!password ? "You must enter a password" : ""}
            onChange={handleChange}
          />
          <div className="actions">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Button type="submit" isDisabled={!username || !password}>
              Sign in
            </Button>
          </div>
        </FormStyle>
        <Actions>
          {process.env.REACT_APP_FACEBOOK_ID && (
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_ID}
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,email,user_friends"
              callback={responseFacebook}
              cssClass="facebook-button-class"
              icon="fa-facebook"
            />
          )}
          {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              className="google-button-class"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
          )}
          <Button variant="secondary" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Actions>
      </CardStyle>
    </Main>
  );
};

export default Login;