import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import { Radio } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    height: "20vh",
    overflow: "scroll",
  },
}));

export default function CustomListComponent({
  property,
  propertyType,
  handleSpellCreatorFieldChange,
  varient,
}) {
  const classes = useStyles();

  const handleToggle = (name) => () => {
    let tempTypes = { ...property };

    if (varient == "radio") {
      for (const value in tempTypes) {
        tempTypes[value].selected = false;
      }
      tempTypes[name].selected = tempTypes[name].selected ? false : true;
      handleSpellCreatorFieldChange(tempTypes, propertyType);
    } else if (varient != "disabled") {
      tempTypes[name].selected = tempTypes[name].selected ? false : true;
      handleSpellCreatorFieldChange(tempTypes, propertyType);
    }
  };

  return (
    <List className={classes.root}>
      {Object.keys(property).map((value, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} dense button onClick={handleToggle(value)}>
            {varient == "radio" ? (
              <Radio
                checked={property[value].selected}
                value
                color="red"
                name={value}
                inputProps={{ "aria-label": value }}
              />
            ) : (
              <Checkbox
                edge="start"
                checked={property[value].selected}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            )}
            <ListItemText id={labelId} primary={property[value].name} />
          </ListItem>
        );
      })}
    </List>
  );
}
