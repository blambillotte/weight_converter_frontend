import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import Routes from "./routes";

// loads the Icon plugin
UIkit.use(Icons);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
