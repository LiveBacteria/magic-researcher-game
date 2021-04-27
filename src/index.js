import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBnTfb_mBCIh3ZVvReUMDwykBFEjVObM8U",
  authDomain: "magic-researcher-app.firebaseapp.com",
  projectId: "magic-researcher-app",
  storageBucket: "magic-researcher-app.appspot.com",
  messagingSenderId: "248581938892",
  appId: "1:248581938892:web:01ccaeb53a8f608f856c69",
  measurementId: "G-Q8W74MGP4F",
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
