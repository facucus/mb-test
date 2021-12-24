import { ChangeEvent, useState } from "react";
import styled from "styled-components";

import Input from "../Input";
import defaultUserImg from "../../imgs/default-user.jpeg";
import { AppState } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, getPosts } from "../../store/actions/posts";
import {userLogout} from "../../store/actions/login";
import CreatePost from "../CreatePost";
import * as storage from "../../utils/storage"
import { useNavigate } from "react-router-dom";
import LinkButton from "../LinkButton";

const NavbarStyle = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom: ${({theme}) => theme.navbarBorder};
  background-color: ${({theme}) => theme.navbarBg};
  color: ${({theme}) => theme.navbarColor};

  .user-info {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5px;

    span {
      margin-right: 5px;
    }

    img {
      max-width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
`;

const FormStyle = styled.form`
  position: relative;
  display: flex;
  min-width: 180px;

  .link-container {
    position: absolute;
    z-index: 10;
    left: -45px;
  }
`;

const Navbar: React.FunctionComponent<{}> = () => {
  const [search, setSearch] = useState("");
  const loginData = useSelector((state: AppState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = storage.get("theme");


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (search) {
      dispatch(getPosts(`/posts?query=${search}`));
      setSearch("");
    } else {
      dispatch(clearPosts());
      dispatch(getPosts());
    }
  };

  const handleLogout = () => {
    storage.remove("is-authenticated");
    window.sessionStorage.clear();
    dispatch(userLogout());
    navigate("/login");
  }

  if(!loginData.isAuthenticated) return null;

  return (
    <NavbarStyle data-testid="navbar">
      <CreatePost theme={theme} />
      <div>
        <div className="user-info">
          <img src={loginData.photoUrl || defaultUserImg} alt="user profile" />{" "}
          <span>{loginData.username},</span>
          <LinkButton onClick={handleLogout}>logout</LinkButton>
        </div>
        <FormStyle onSubmit={handleSubmit}>
          <Input
            id="search"
            type="text"
            placeholder="Search posts"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </FormStyle>
      </div>
    </NavbarStyle>
  );
};

export default Navbar;
