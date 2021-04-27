import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../resources/logo.png";
import firebase from "firebase";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import signupHandler from "../services/signup";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import loginHandler from "../services/login";
import { gameSetup } from "../services/gameEngine";

export default function Login({ state, setState }) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRedirect() {
    let collector = await loginHandler(email, password);
    let bool = collector.bool,
      user = collector.user;

    if (bool == false) {
      history.push("/login");
    } else {
      await gameSetup(state, setState, user, collector);
      history.push("/game");
    }
  }

  function handleEmail(input) {
    setEmail(input);
  }

  function handlePassword(input) {
    setPassword(input);
  }

  const firebaseApp = firebase.apps[0];
  return (
    <div className="login">
      <div>
        <span>
          <h1 id="title">Magic Researcher</h1>
          <img src={logo} alt="Logo" className="logo" />
        </span>
      </div>
      <Paper>
        <TextField
          label="Email"
          id="email"
          onChange={(e) => handleEmail(e.target.value)}
        ></TextField>
        <TextField
          label="Password"
          id="password"
          type="password"
          onChange={(e) => handlePassword(e.target.value)}
        ></TextField>
      </Paper>
      <div>
        <Button
          variant="contained"
          //   disabled={!validForm}
          onClick={() => handleRedirect()}
        >
          login
        </Button>
      </div>
    </div>
  );
}
