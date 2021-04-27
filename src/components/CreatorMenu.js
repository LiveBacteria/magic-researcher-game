import MenuIcon from "../resources/game_assets/ui/11d-blank.gif";
import React, { useState } from "react";
import { Paper } from "@material-ui/core";
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
import Switch from "@material-ui/core/Switch";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Input } from "@material-ui/core";
import { userStatusChange } from "../util/userStatusChange";
import { createSpell } from "../services/gameEngine";

// Custom Menu Components
import CustomListComponent from "./CustomListComponent";
import GameArt from "./GameArt";

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

export default function CreatorMenu({
  state,
  setState,
  playSound,
  checkSpellValidity,
}) {
  // Spell Creator Properties
  const [spellIsValid, setSpellIsValid] = useState(false);
  const [spellCreation, setSpellCreation] = useState({
    spellName: "",
    spellCreationTextField: "",
    precursorCasts: "",
    spellDescription: "",
    typeOfMagic: {
      Water: { name: "Water", selected: false },
      Earth: { name: "Earth", selected: false },
      Fire: { name: "Fire", selected: false },
      Air: { name: "Air", selected: false },
      Light: { name: "Light", selected: false },
      Shadow: { name: "Shadow", selected: false },
      Life: { name: "Life", selected: false },
      Death: { name: "Death", selected: false },
    },
    manaCombinationsList: [],
    actionType: {
      Extend: { name: "Extend", selected: true },
      Expel: { name: "Expel", selected: false },
      Link: { name: "Link", selected: false },
      Nothing: { name: "Nothing", selected: false },
    },
    allowedActions: {
      Extend: { name: "Extend", selected: true },
      Expel: { name: "Expel", selected: false },
      Link: { name: "Link", selected: false },
      Nothing: { name: "Nothing", selected: false },
    },
    utilActions: {
      Light: { name: "Light", selected: false, amount: 50 },
      Glow: { name: "Glow", selected: false, amount: 15 },
      Heal: { name: "Heal", selected: false, amount: 0 },
      // StrengthBuff modifier will be based on healing amount percentage
      StrengthBuff: { name: "StrengthBuff", selected: false, amount: 0 },
      // ManaBuff modifier will be based on healing amount percentage
      ManaBuff: { name: "ManaBuff", selected: false, amount: 0 },
    },
    spellDamage: 0,
    spellHealing: 0,
    manaCost: 0,
    manaGiven: 0,
    spellRank: "Common",
    spellIsValid: false,
    spellArt: {
      BlueFire: { name: "BlueFire", selected: false },
      BrightFire: { name: "BrightFire", selected: false },
      Fel: { name: "Fel", selected: false },
      Fire: { name: "Fire", selected: false },
      FireSpin: { name: "FireSpin", selected: false },
      FlameLash: { name: "FlameLash", selected: false },
      FreezingSpirit: { name: "FreezingSpirit", selected: false },
      Magic8: { name: "Magic8", selected: false },
      MagicSpell: { name: "MagicSpell", selected: true },
      MagicSpell2: { name: "MagicSpell2", selected: false },
      Midnight: { name: "Midnight", selected: false },
      Nebula: { name: "Nebula", selected: false },
      Phantom: { name: "Phantom", selected: false },
      ProtectionCircle: { name: "ProtectionCircle", selected: false },
      SunBurn: { name: "SunBurn", selected: false },
      Vortex: { name: "Vortex", selected: false },
    },
  });
  const [spellError, setSpellError] = useState({
    isInvalid: false,
    errorDescription: "",
  });

  // Menu Dialog Controller
  const [open, setOpen] = useState(false);
  const [keepSpellCreationData, setKeepSpellCreationData] = useState(false);

  const handleMenuClickOpen = () => {
    playSound("confirm", state);
    setOpen(true);
  };

  const handleKeepSpellDataSwitch = (e) => {
    setKeepSpellCreationData(e.target.checked);
  };

  const handleMenuClickClose = () => {
    playSound("back", state);
    if (keepSpellCreationData == false) {
      setSpellCreation({
        spellName: "",
        spellCreationTextField: "",
        precursorCasts: "",
        spellDescription: "",
        typeOfMagic: {
          Water: { name: "Water", selected: false },
          Earth: { name: "Earth", selected: false },
          Fire: { name: "Fire", selected: false },
          Air: { name: "Air", selected: false },
          Light: { name: "Light", selected: false },
          Shadow: { name: "Shadow", selected: false },
          Life: { name: "Life", selected: false },
          Death: { name: "Death", selected: false },
        },
        manaCombinationsList: [],
        manaTypes: ["mana"],
        actionType: {
          Extend: { name: "Extend", selected: true },
          Expel: { name: "Expel", selected: false },
          Link: { name: "Link", selected: false },
          Nothing: { name: "Nothing", selected: false },
        },
        allowedActions: {
          Extend: { name: "Extend", selected: false },
          Expel: { name: "Expel", selected: false },
          Link: { name: "Link", selected: false },
          Nothing: { name: "Nothing", selected: false },
        },
        utilActions: {
          Light: { name: "Light", selected: false, amount: 50 },
          Glow: { name: "Glow", selected: false, amount: 15 },
          Heal: { name: "Heal", selected: false, amount: 0 },
          // StrengthBuff modifier will be based on healing amount percentage
          StrengthBuff: { name: "StrengthBuff", selected: false, amount: 0 },
          // ManaBuff modifier will be based on healing amount percentage
          ManaBuff: { name: "ManaBuff", selected: false, amount: 0 },
        },
        spellDamage: 0,
        spellHealing: 0,
        manaCost: 0,
        manaGiven: 0,
        spellRank: "Common",
        spellIsValid: false,
        spellArt: {
          BlueFire: { name: "BlueFire", selected: false },
          BrightFire: { name: "BrightFire", selected: false },
          Fire: { name: "Fire", selected: false },
          Fel: { name: "Fel", selected: false },
          FireSpin: { name: "FireSpin", selected: false },
          FlameLash: { name: "FlameLash", selected: false },
          FreezingSpirit: { name: "FreezingSpirit", selected: false },
          Magic8: { name: "Magic8", selected: false },
          MagicSpell: { name: "MagicSpell", selected: true },
          MagicSpell2: { name: "MagicSpell2", selected: false },
          Midnight: { name: "Midnight", selected: false },
          Nebula: { name: "Nebula", selected: false },
          Phantom: { name: "Phantom", selected: false },
          ProtectionCircle: { name: "ProtectionCircle", selected: false },
          SunBurn: { name: "SunBurn", selected: false },
          Vortex: { name: "Vortex", selected: false },
        },
      });
    }
    setOpen(false);
  };

  const handleSpellCreatorFieldChange = (e, property) => {
    let tempState = spellCreation;

    if (
      property == "typeOfMagic" ||
      property == "allowedActions" ||
      property == "actionType" ||
      property == "spellArt" ||
      property == "utilActions"
    ) {
      tempState[property] = e;
    } else {
      if (
        property == "spellDamage" ||
        (property == "spellHealing" && e.target.value <= 0)
      ) {
        tempState[property] = 0;
      } else {
        tempState[property] = e.target.value;
      }
    }

    tempState.spellIsValid = false;
    setSpellCreation({ ...tempState });
    // checkSpellValidity(true, setSpellCreation, spellCreation, setSpellError);
  };

  const handleCreateSpellClick = async () => {
    let result = await createSpell(spellCreation);
    if (result == true) {
      handleMenuClickClose();
      playSound("success", state);
    } else {
      playSound("error", state);
      setSpellError({
        isInvalid: true,
        errorDescription: "Spell is Invalid: Reason Unknown",
      });
    }
  };

  const findSelectedArtAsset = () => {
    let selectedArt = "";
    Object.keys(spellCreation.spellArt).map((item) => {
      if (spellCreation.spellArt[item].selected == true) {
        selectedArt = spellCreation.spellArt[item].name;
      }
    });
    return selectedArt;
  };

  return (
    <div className="spellSheet">
      <Tooltip title="Creator Menu" placement="left">
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
        style={{ height: "100%", overflow: "auto" }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleMenuClickClose}
        >
          <Typography
            style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
          >
            Spell Creator
            {spellError.isInvalid ? " | " + spellError.errorDescription : null}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Paper style={{ overflow: "auto" }}>
            <Typography
              style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
            >
              Spell Name:{" "}
              {spellCreation.spellName == "" ? "None" : spellCreation.spellName}
            </Typography>
            <TextField
              id="field"
              label="Spell Name"
              inputProps={{
                style: {
                  fontFamily: "'VT323', monospace",
                  fontSize: "25px",
                },
                autoComplete: "new-password",
              }}
              fullWidth
              onChange={(e) => {
                handleSpellCreatorFieldChange(e, "spellName");
              }}
              value={spellCreation.spellName}
            />
            <Typography
              style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
            >
              Spell:
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                  color: "red",
                }}
              >
                {spellCreation.spellCreationTextField == ""
                  ? "No Spell"
                  : spellCreation.spellCreationTextField}
              </Typography>
            </Typography>
            <TextField
              id="field1"
              label="Spell Cast"
              inputProps={{
                style: {
                  fontFamily: "'VT323', monospace",
                  fontSize: "25px",
                },
                autoComplete: "new-password",
              }}
              fullWidth
              onChange={(e) => {
                handleSpellCreatorFieldChange(e, "spellCreationTextField");
              }}
              value={spellCreation.spellCreationTextField}
            />
            <Typography
              style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
            >
              Precursor:
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                  color: "red",
                }}
              >
                {spellCreation.precursorCasts == ""
                  ? "No Precursors"
                  : spellCreation.precursorCasts}
              </Typography>
            </Typography>
            <TextField
              id="field1"
              label="Spell Precursor: The precursor spells to reach and cast this spell successfully"
              inputProps={{
                style: {
                  fontFamily: "'VT323', monospace",
                  fontSize: "25px",
                },
                autoComplete: "new-password",
              }}
              fullWidth
              onChange={(e) => {
                handleSpellCreatorFieldChange(e, "precursorCasts");
              }}
              value={spellCreation.precursorCasts}
            />
            <Typography
              style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
            >
              Description:
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                  color: "red",
                }}
              ></Typography>
            </Typography>
            <TextField
              id="field1"
              label="Description of the spell"
              inputProps={{
                style: {
                  fontFamily: "'VT323', monospace",
                  fontSize: "25px",
                },
                autoComplete: "new-password",
              }}
              fullWidth
              onChange={(e) => {
                handleSpellCreatorFieldChange(e, "spellDescription");
              }}
              value={spellCreation.spellDescription}
            />
            <Typography
              style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
            >
              Damage:
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                  color: "red",
                }}
              ></Typography>
            </Typography>
            <Input
              id="field1"
              label="Damage the spell deals to an enemy or self"
              inputProps={{
                style: {
                  fontFamily: "'VT323', monospace",
                  fontSize: "25px",
                },
                autoComplete: "new-password",
              }}
              type={"number"}
              fullWidth
              onChange={(e) => {
                handleSpellCreatorFieldChange(e, "spellDamage");
              }}
              value={spellCreation.spellDamage}
            />
            <Typography
              style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
            >
              Healing:
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                  color: "red",
                }}
              ></Typography>
            </Typography>
            <Input
              id="field1"
              label="Amount of healing the spell does to an enemy or self"
              inputProps={{
                style: {
                  fontFamily: "'VT323', monospace",
                  fontSize: "25px",
                },
                autoComplete: "new-password",
              }}
              type={"number"}
              fullWidth
              onChange={(e) => {
                handleSpellCreatorFieldChange(e, "spellHealing");
              }}
              value={spellCreation.spellHealing}
            />
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
                >
                  Mana Types
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CustomListComponent
                  property={spellCreation.typeOfMagic}
                  propertyType={"typeOfMagic"}
                  secondaryProperty={spellCreation.manaTypes}
                  handleSpellCreatorFieldChange={handleSpellCreatorFieldChange}
                  varient={"disabled"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
                >
                  Default Action Type
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CustomListComponent
                  property={spellCreation.actionType}
                  propertyType={"actionType"}
                  handleSpellCreatorFieldChange={handleSpellCreatorFieldChange}
                  varient={"radio"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
                >
                  Allowed Action Types
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CustomListComponent
                  property={spellCreation.allowedActions}
                  propertyType={"allowedActions"}
                  handleSpellCreatorFieldChange={handleSpellCreatorFieldChange}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
                >
                  Spell Art
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CustomListComponent
                  property={spellCreation.spellArt}
                  propertyType={"spellArt"}
                  handleSpellCreatorFieldChange={handleSpellCreatorFieldChange}
                  varient={"radio"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{ fontFamily: "'VT323', monospace", fontSize: "3vh" }}
                >
                  Utility Types
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CustomListComponent
                  property={spellCreation.utilActions}
                  propertyType={"utilActions"}
                  secondaryProperty={spellCreation.utilActions}
                  handleSpellCreatorFieldChange={handleSpellCreatorFieldChange}
                />
              </AccordionDetails>
            </Accordion>
            <GameArt sourceName={findSelectedArtAsset()} />
            <Paper style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                  color: `${spellCreation.manaCost <= 10 ? "green" : "red"}`,
                }}
              >
                Mana Cost: {spellCreation.manaCost}
              </Typography>
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                }}
              >
                Mana Given: {spellCreation.manaGiven}
              </Typography>
              <Typography
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "3vh",
                }}
              >
                Spell Rank: {spellCreation.spellRank}
              </Typography>
            </Paper>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Typography
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "25px",
              color: "red",
            }}
          >
            Keep Spell on Close
          </Typography>
          <Switch
            checked={keepSpellCreationData}
            onChange={(e) => handleKeepSpellDataSwitch(e)}
            name="checkedB"
            color="primary"
          />
          <Button
            color="primary"
            style={{ fontFamily: "'VT323', monospace", fontSize: "25px" }}
            onClick={() => {
              checkSpellValidity(
                false,
                setSpellCreation,
                spellCreation,
                setSpellError
              );
            }}
          >
            Check Spell Vailidity
          </Button>
          <Button
            color="primary"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "25px",
              color: `${spellCreation.spellIsValid ? "green" : "grey"}`,
            }}
            disabled={spellCreation.spellIsValid == false}
            onClick={() => {
              handleCreateSpellClick();
            }}
          >
            Create Spell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
