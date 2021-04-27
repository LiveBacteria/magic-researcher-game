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

export default function Signup({ state }) {
  let history = useHistory();
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebaseApp = firebase.apps[0];

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      setValidatedEmail(true);
      setEmail(email);
      updateValidForm();
    } else {
      setValidatedEmail(false);
      updateValidForm();
    }
  }

  function validatePassword(secondPassword) {
    if (password == secondPassword) {
      setValidatedPassword(true);
      updateValidForm();
    } else {
      setValidatedPassword(false);
      updateValidForm();
    }
  }

  function handlePassword(password) {
    setPassword(password);
  }

  function handleUsername(username) {
    setUsername(username);
  }

  function updateValidForm() {
    if (validatePassword && validatedEmail) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }

  function handleRedirect() {
    let redirect = signupHandler(email, password);
    if (redirect) {
      history.push("/");
    }
  }

  return (
    <div className="Signup">
      <span>
        <h1 id="title">Magic Researcher</h1>
        <img src={logo} alt="Logo" className="logo" />
      </span>
      <div>
        <Paper>
          <TextField
            label="Username"
            onChange={(e) => handleUsername(e.target.value)}
          ></TextField>
          <TextField
            label="Email"
            id="email"
            onChange={(e) => validateEmail(e.target.value)}
            error={!validatedEmail}
          ></TextField>
          <TextField
            label="Password"
            id="password"
            type="password"
            error={!validatedPassword}
            onChange={(e) => handlePassword(e.target.value)}
          ></TextField>
          <TextField
            label="Re-enter Password"
            id="passwordValidation"
            type="password"
            onChange={(e) => validatePassword(e.target.value)}
            error={!validatedPassword}
          ></TextField>
        </Paper>
      </div>
      <div>
        <Button
          variant="contained"
          disabled={!validForm}
          onClick={() => handleRedirect()}
        >
          submit
        </Button>
      </div>
    </div>
  );
}
