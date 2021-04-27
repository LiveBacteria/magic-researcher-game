import React, { useEffect, useState } from "react";
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
import Typewriter from "typewriter-effect";
import textHandler from "../util/textHandler";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

export default function TextBox({
  input,
  playSound,
  triggerEvent,
  disableSound,
  state,
  setState,
}) {
  return (
    <span className="gameText">
      {textHandler(input, playSound, disableSound)}
      <SubdirectoryArrowLeftIcon
        onClick={() => {
          if (disableSound == false && input !== "") {
            playSound("confirm", state);
          }
          triggerEvent({ type: "script", data: null }, state, setState);
        }}
      />
    </span>
  );
}
