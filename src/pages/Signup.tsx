import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { CardStyle } from "../components/Card";
import Input from "../components/Input";
import { AppDispatch, signup } from "../store/actions/login";
import { FormStyle, Main, MainTitle } from "./Login";

const Signup: React.FunctionComponent<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username || !password || password !== confirmPassword) return;
    dispatch(signup(username, password, confirmPassword)).then(() => {
      navigate("/");
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    switch (e.target.id) {
      case "username":
        return setUsername(e.target.value);
      case "password":
        return setPassword(e.target.value);
      case "confirmPassword":
        return setConfirmPassword(e.target.value);
      default:
        return;
    }
  };

  const isDisabled = !username || !password || password !== confirmPassword;

  return (
    <Main>
      <CardStyle padding="30px">
        <MainTitle>Create Account</MainTitle>
        <FormStyle onSubmit={handleSubmitForm}>
          <Input
            id="username"
            dataTestid="username"
            type="text"
            placeholder="Enter username"
            value={username}
            error={!username ? "You must enter a username" : ""}
            onChange={handleChange}
          />
          <Input
            id="password"
            dataTestid="password"
            type="password"
            placeholder="Enter password"
            value={password}
            error={!password ? "You must enter a password" : ""}
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            dataTestid="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            error={
              password !== confirmPassword ? "Passwords doesn't match" : ""
            }
            onChange={handleChange}
          />
          <div className="actions reverse">
            <Button type="submit" isDisabled={isDisabled}>
              Sign Up
            </Button>
          </div>
        </FormStyle>
      </CardStyle>
    </Main>
  );
};

export default Signup;
