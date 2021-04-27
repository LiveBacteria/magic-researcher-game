import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../resources/logo.png";
import firebase from "firebase";

export default function Home({ state, invalidUrl }) {
  let history = useHistory();
  const firebaseApp = firebase.apps[0];

  function handleLoginButton() {
    history.push("/login");
  }

  return (
    <div className="home">
      <div>
        <span>
          <h1 id="title">Magic Researcher</h1>
          <img src={logo} alt="Logo" className="logo" />
        </span>
        <div className="buttons">
          <Button variant="contained" onClick={() => handleLoginButton()}>
            LOGIN
          </Button>
          <Link to="/signup">
            <Button variant="contained">SIGN UP</Button>
          </Link>
          <Link to="/credits">
            <Button variant="contained" className="button">
              CREDITS
            </Button>
          </Link>
        </div>
        {invalidUrl ? <p id="centerMe">User Not Logged In</p> : ""}
      </div>
    </div>
  );
}
