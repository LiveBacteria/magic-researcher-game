import { useCallback, useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import TextBox from "./TextBox";
import Loading from "./Loading";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "../App.css";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Spellsheet from "./Spellsheet";
import GameSettingsMenu from "./GameSettingsMenu";
import CreatorMenu from "./CreatorMenu";
import { triggerEvent, scriptHandler, castSpell } from "../services/gameEngine";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function UI({ state, setState, checkSpellValidity, playSound }) {
  const [currentText, setCurrentText] = useState("");
  const [castTextField, setCastTextField] = useState("");
  const classes = useStyles();

  const [count, setCount] = useState(1);

  const handleCastTextFieldHandler = (e) => {
    setCastTextField(e.target.value);
  };

  // Need to create game backend for handling spells / enemies / traversal of world via cardinal arrows
  const handleCastTextFieldSubmit = async () => {
    await triggerEvent(
      {
        type: "spell",
        data: {
          castTextField,
        },
      },
      state,
      setState
    );
    setCastTextField("");
  };

  return (
    <div className="UI">
      {state.isLoading ? (
        <div>
          <Loading />
          <Backdrop className={classes.backdrop} open={state.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <div className="containerDiv">
          <Paper>
            <TextBox
              input={state.gameData.currentScript}
              playSound={playSound}
              triggerEvent={triggerEvent}
              disableSound={false}
              state={state}
              setState={setState}
            />
          </Paper>
          <div className="contentDiv">
            <div className="gameBoard">
              <div className="characterSprite"></div>
              <div>
                <Spellsheet
                  setState={setState}
                  knownSpells={state.gameData.knownSpells}
                  state={state}
                  playSound={playSound}
                />
                <GameSettingsMenu
                  state={state}
                  setState={setState}
                  playSound={playSound}
                />
                {state.gameData.settings?.isCreator ? (
                  <CreatorMenu
                    state={state}
                    setState={setState}
                    playSound={playSound}
                    checkSpellValidity={checkSpellValidity}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <Paper
              className="castTextField"
              inputProps={{ style: { display: "flex", flexDirection: "row" } }}
            >
              <TextField
                inputProps={{
                  style: {
                    fontFamily: "'VT323', monospace",
                    fontSize: "25px",
                  },
                  autoComplete: "new-password",
                }}
                fullWidth
                value={castTextField}
                onChange={(e) => {
                  handleCastTextFieldHandler(e);
                }}
              />
              <div
                onClick={() => {
                  handleCastTextFieldSubmit();
                }}
              >
                <SubdirectoryArrowLeftIcon />
              </div>
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
}
