import { ChangeEvent, useState } from "react";
import styled from "styled-components";

import Toggle from "../../components/Toggle";
import Input from "../Input";
import defaultUserImg from "../../imgs/default-user.jpeg";
import { AppState } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, getPosts } from "../../store/actions/posts";
import CreatePost from "../CreatePost";
import * as storage from "../../utils/storage"
interface NavbarPros {
  themeToToggle: string;
  onThemeToggler: any;
}

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

    img {
      max-width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
`;


const Navbar: React.FunctionComponent<NavbarPros> = ({
  themeToToggle,
  onThemeToggler,
}) => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const loginData = useSelector((state: AppState) => state.login);
  const dispatch = useDispatch();
  const theme = storage.get("theme");


  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearPosts())
    if (search) {
      dispatch(getPosts(`/posts?query=${search}`));
    } else {
      dispatch(getPosts());
    }
  };

  if(!loginData.isAuthenticated) return null;

  return (
    <NavbarStyle data-testid="navbar">
      <CreatePost theme={theme}/>
      <Toggle toggleTheme={onThemeToggler} themeToToggle={themeToToggle} />
      <div>
        <div className="user-info">
          <img src={loginData.photoUrl || defaultUserImg} alt="user profile" />{" "}
          <span>{loginData.username}</span>
        </div>
        <form onSubmit={handleSearch}>
          <Input
            id="search"
            type="text"
            placeholder="Search posts"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </form>
      </div>
    </NavbarStyle>
  );
};

export default Navbar;
