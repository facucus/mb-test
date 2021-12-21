import React, { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import reducer, { AppState } from "../store/reducers";
import { lightTheme } from "./themes";

interface Options {
  initialState?: AppState;
  store?: Store;
}

interface WrapperProps {
  children: JSX.Element;
}

function renderWithRedux(
  ui: ReactElement,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  }: Options = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function render(ui: ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: WrapperProps) {
    return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render, renderWithRedux };
