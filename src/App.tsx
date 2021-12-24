import React, {useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalStyles } from "./utils/GlobalStyles";
import { lightTheme, darkTheme } from "./utils/themes";
import { useDarkMode } from "./hooks/useDarkMode";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import * as storage from "./utils/storage";
import { userLoginSuccess } from "./store/actions/login";
import Toggle from "./components/Toggle";


function App() {
  const [theme, themeToggler] = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    const auth = storage.get("is-authenticated");

    if (auth?.isAuthenticated) {
      dispatch(
        userLoginSuccess({
          username: auth.username,
          photoUrl: auth.photoUrl,
        })
      );
      navigate("/");
    }
  }, [dispatch, navigate]);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ToastContainer />
      <div>
        <Toggle
          toggleTheme={themeToggler}
          themeToToggle={theme === "light" ? "Dark" : "Light"}
        />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;


