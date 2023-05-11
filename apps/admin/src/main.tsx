import * as React from "react";

import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
