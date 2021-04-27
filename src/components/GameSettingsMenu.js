import MenuIcon from "../resources/game_assets/ui/10a-blank.gif";
import React, { useState } from "react";
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
import TextField from "@material-ui/core/TextField";
import { userStatusChange } from "../util/userStatusChange";
import { triggerEvent } from "../services/gameEngine";

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

export default function GameSettingsMenu({ state, setState, playSound }) {
  const [adminPassword, setAdminPassword] = useState("");
  const [creatorPassword, setCreatorPassword] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleMenuClickOpen = () => {
    playSound("confirm", state);
    setOpen(true);
  };
  const handleMenuClickClose = () => {
    if (characterName !== "") {
      triggerEvent(
        { type: "userInfo", subType: "characterName", data: characterName },
        state,
        setState
      );
    }
    playSound("back", state);
    setAdminPassword("");
    setCreatorPassword("");
    setCharacterName("");
    setOpen(false);
  };

  const handleAdminTextfieldChange = (e) => {
    setAdminPassword(e.target.value);
  };

  const handleCharacterNameTextfieldChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleCreatorTextfieldChange = (e) => {
    setCreatorPassword(e.target.value);
  };

  const handleStatusChange = () => {
    userStatusChange(
      { admin: adminPassword, creator: creatorPassword },
      state,
      setState,
      playSound
    );
    setAdminPassword("");
    setCreatorPassword("");
    setCharacterName("");
  };

  return (
    <div className="spellSheet">
      <Tooltip title="Menu" placement="left">
        <img
          src={MenuIcon}
          className="image2"
          onClick={() => {
            handleMenuClickOpen();
          }}
        ></img>
      </Tooltip>
      <Dialog
        onClose={handleMenuClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ minHeight: "100%", overflow: "auto" }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleMenuClickClose}
        >
          <Typography
            style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
          >
            Settings
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
          >
            Character Name: {state.gameData.settings.characterName}
          </Typography>
          <TextField
            id="field"
            label="Character Name"
            type="text"
            inputProps={{
              style: {
                fontFamily: "'VT323', monospace",
                fontSize: "25px",
              },
            }}
            fullWidth
            onChange={(e) => {
              handleCharacterNameTextfieldChange(e);
            }}
            value={characterName}
          />
          <Typography
            style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
          >
            Admin: {state.gameData.settings.isAdmin ? "Yes" : "No"}
          </Typography>
          <TextField
            id="field"
            label="Password"
            type="password"
            inputProps={{
              style: {
                fontFamily: "'VT323', monospace",
                fontSize: "25px",
              },
              autoComplete: "new-password",
            }}
            fullWidth
            onChange={(e) => {
              handleAdminTextfieldChange(e);
            }}
            value={adminPassword}
          />
          <Typography
            style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
          >
            Creator: {state.gameData.settings.isCreator ? "Yes" : "No"}
          </Typography>
          <TextField
            id="field1"
            label="Password"
            type="password"
            inputProps={{
              style: {
                fontFamily: "'VT323', monospace",
                fontSize: "25px",
              },
              autoComplete: "new-password",
            }}
            fullWidth
            onChange={(e) => {
              handleCreatorTextfieldChange(e);
            }}
            value={creatorPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleMenuClickClose}
            color="primary"
            style={{ fontFamily: "'VT323', monospace", fontSize: "25px" }}
          >
            Save changes
          </Button>
          <Button
            autoFocus
            onClick={handleStatusChange}
            color="primary"
            style={{ fontFamily: "'VT323', monospace", fontSize: "25px" }}
          >
            Unlock
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
