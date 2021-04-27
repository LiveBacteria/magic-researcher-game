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
import UI from "../components/UI";
import {
  checkSpellValidity,
  playSound,
  gameSetup,
} from "../services/gameEngine";

const useAudio = (state) => {
  const [audioPlayerState, setAudioPlayerState] = useState({
    src: state.user.isLoggedIn == false ? "" : "/background-music.mp3",
  });
  const [audio] = useState(new Audio(audioPlayerState.src));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play();
      setPlaying(true);
    });
  }, [audio]);

  return [playing, toggle];
};

export default function Game({ state, setState }) {
  let history = useHistory();
  useEffect(() => {
    if (state.user.isLoggedIn == false) {
      history.push("/");
    }
  }, []);

  const [playing, toggle] = useAudio(state);

  const firebaseApp = firebase.apps[0];
  return (
    <div className="game">
      <Paper className="gameBackground">
        <UI
          setState={setState}
          state={state}
          checkSpellValidity={checkSpellValidity}
          playSound={playSound}
        ></UI>
      </Paper>
    </div>
  );
}
