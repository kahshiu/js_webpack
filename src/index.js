import React from "react";
import ReactDOM from "react-dom";
import App from "myComponents/App";

import { appCreateStore } from "myStore/rootStore";
import { Provider } from "react-redux";

const store = appCreateStore();

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>
  ,document.getElementById("root")
)
