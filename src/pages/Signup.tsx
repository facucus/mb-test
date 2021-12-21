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
    onSubmit();
  };

  const onSubmit = () => {
    if (!username || !password || password !== confirmPassword) return;
    console.log("signup");
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

  return (
    <Main>
      <CardStyle padding="30px">
        <MainTitle>Create Account</MainTitle>
        <FormStyle onSubmit={handleSubmitForm}>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <div className="actions reverse">
            <Button onClick={onSubmit}>Sign Up</Button>
          </div>
        </FormStyle>
      </CardStyle>
    </Main>
  );
};

export default Signup;
