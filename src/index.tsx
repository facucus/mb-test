import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import App from './App';
import {BrowserRouter} from "react-router-dom"
import { worker } from "./mocks/browser";
import { initialPosts } from "./mocks/db";
import * as storage from "./utils/storage"
import store from './store';

worker.start({ onUnhandledRequest: "bypass" });

const db = storage.get("db");

if(!db) {
  storage.set("db", initialPosts());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


