import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

//firebase
import * as firebase from "firebase";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

const config = {
  apiKey: "AIzaSyDtRWwp8jU5NkGanL6ye-0s2Fncut5WuCE",
  authDomain: "workoutchallenge30day.firebaseapp.com",
  databaseURL: "https://workoutchallenge30day.firebaseio.com",
  projectId: "workoutchallenge30day",
  storageBucket: "workoutchallenge30day.appspot.com",
  messagingSenderId: "306961289924",
  appId: "1:306961289924:web:f84ad90dff3ccff26baf91",
  measurementId: "G-TYJSZN9GEH",
};

firebase.initializeApp(config);

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
