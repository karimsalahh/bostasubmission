import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import init from "./components/translationWrapper";
ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={init(i18n)}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
