import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {StoreProvider} from 'easy-peasy';
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
    <Router>
    <App />
    </Router>
    </StoreProvider>
  </React.StrictMode>

);
