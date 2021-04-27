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
import TextBox from "./TextBox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

export default function Loading() {
  return (
    <Card>
      <img src="/loading.png" />
    </Card>
  );
}
