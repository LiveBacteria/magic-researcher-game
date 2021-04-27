import SpellsheetImage from "../resources/game_assets/ui/11c-blank.gif";
import MenuIcon from "../resources/game_assets/ui/10a-blank.gif";
import SampleDialog from "./SampleDialog";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Spellsheet({
  state,
  setState,
  setDocState,
  playSound,
}) {
  const [open, setOpen] = React.useState(false);

  const handleSpellbookClickOpen = () => {
    playSound("confirm", state);
    setOpen(true);
  };

  const handleSpellbookClickClose = () => {
    playSound("back", state);
    setOpen(false);
  };

  return (
    <div className="spellSheet">
      <Tooltip title="Spellbook" placement="left">
        <img
          src={SpellsheetImage}
          className="image2"
          onClick={() => {
            handleSpellbookClickOpen();
          }}
        ></img>
      </Tooltip>
      <Dialog
        onClose={() => {
          handleSpellbookClickClose();
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ minHeight: "100%", overflow: "auto" }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => {
            handleSpellbookClickClose();
          }}
        >
          <Typography
            style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
          >
            Spellbook
          </Typography>
        </DialogTitle>
        <DialogContent dividers scroll="body">
          {typeof state.gameData.knownSpells === "object" &&
          state.gameData.knownSpells !== null &&
          Object.keys(state.gameData.knownSpells).length >= 1 ? (
            Object.keys(state.gameData.knownSpells).map((item, index) => {
              return (
                <Tooltip
                  placement="top"
                  title={
                    <React.Fragment>
                      <p
                        style={{
                          fontFamily: "'VT323', monospace",
                          fontSize: "2vh",
                          color: "red",
                        }}
                        key={index}
                      >
                        {state.gameData.knownSpells[item].spellDescription}
                      </p>
                      <p
                        style={{
                          fontFamily: "'VT323', monospace",
                          fontSize: "2vh",
                          color: "white",
                        }}
                      >
                        {state.gameData.knownSpells[item].precursorCasts}
                      </p>
                    </React.Fragment>
                  }
                >
                  <Button
                    style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: "2vh",
                      color: "red",
                    }}
                    onClick={() => {
                      document.querySelector(
                        ".MuiInputBase-input.MuiInput-input"
                      ).value = state.gameData.knownSpells[item].spellName;
                    }}
                  >
                    {state.gameData.knownSpells[item].spellName}
                  </Button>
                </Tooltip>
              );
            })
          ) : (
            <Typography
              gutterBottom
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "2vh",
                color: "lightgrey",
              }}
            >
              No Known Spells
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleSpellbookClickClose();
            }}
            color="primary"
            style={{ fontFamily: "'VT323', monospace", fontSize: "25px" }}
          >
            Close Spellbook
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
