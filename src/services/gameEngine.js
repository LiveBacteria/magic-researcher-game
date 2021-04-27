import success from "../resources/game_assets/sounds/effects/ui/success.ogg";
import { getByRef, setWithRef } from "./firebaseFunctions";

export const checkSpellExists = async (spellObject) => {
  let collector = await getByRef(`/globalGameData/spells/`),
    error = {
      spellName: false,
      spellCast: false,
      spellDescription: false,
    };

  for (const property in collector) {
    // Check spell name
    if (
      spellObject.spellName.toLowerCase() ==
      collector[property].spellName.toLowerCase()
    ) {
      error.spellName = true;
    }
    // Check spell cast
    if (
      spellObject.spellCreationTextField.toLowerCase() ==
      collector[property].spellCreationTextField.toLowerCase()
    ) {
      error.spellCast = true;
    }

    // Check description
    if (
      spellObject.spellDescription.toLowerCase() ==
      collector[property].spellDescription.toLowerCase()
    ) {
      error.spellDescription = true;
    }
  }

  return error;
};

export const getDynamicSpellCosts = (spell) => {
  let manaCost = 0;

  spell.forEach((item, index) => {
    switch (item) {
      case "world":
        manaCost += 10;
        break;
      case "self":
        manaCost += 1;
        break;
      case "underworld":
        manaCost += 10;
        break;
      case "mana":
        manaCost += 2;
        break;
      case "fire":
        manaCost += 1;
        break;
      case "water":
        manaCost += 1;
        break;
      case "earth":
        manaCost += 1;
        break;
      case "air":
        manaCost += 1;
        break;
      case "light":
        manaCost += 3;
        break;
      case "life":
        manaCost += 3;
        break;
      case "death":
        manaCost += 4;
        break;
      case "shadow":
        manaCost += 4;
        break;
      case "control":
        manaCost += 2;
        break;
      case "absorb":
        manaCost += 2;
        break;
      case "expel":
        manaCost += 2;
        break;
      case "extend":
        manaCost += 1;
        break;
      case "link":
        manaCost += 3;
        break;
      default:
        break;
    }
  });
  return manaCost;
};

export const isValidKeywords = (spell) => {
  let keywordError = { keyword: undefined, error: false };
  spell.forEach((item, index) => {
    switch (item) {
      case "world":
        break;
      case "self":
        break;
      case "underworld":
        break;
      case "mana":
        break;
      case "fire":
        break;
      case "water":
        break;
      case "earth":
        break;
      case "air":
        break;
      case "light":
        break;
      case "life":
        break;
      case "death":
        break;
      case "shadow":
        break;
      case "control":
        break;
      case "absorb":
        break;
      case "expel":
        break;
      case "extend":
        break;
      case "link":
        break;
      default:
        console.log(item);
        keywordError.keyword += " " + item;
        keywordError.error = true;
        break;
    }
  });
  return keywordError;
};

export const getDynamicSpellRank = (manaCost) => {
  if (manaCost <= 25) {
    return "Common";
  } else if (manaCost <= 50) {
    return "Rare";
  } else if (manaCost <= 99) {
    return "King";
  } else if (manaCost >= 100) {
    return "Divine";
  }
};

export const buildSpell = (spell) => {
  let finalisedSpell = {
    error: {
      error: false,
      errorText: "",
    },
    spell: {
      manaTypes: [],
      manaCost: 0,
      spellRank: "",
    },
  };

  let spellArray = [],
    externalMana = {
      sourcesValidToBeCollected: [],
      sourcesCollected: [],
      manaControlled: 0,
      count: 0,
    };

  let spellErrorBool = false;

  // Example Cast: self fire expend water expend world mana absorb mana control light link fire link water extend => glowing liquid
  // Cast Format: Source(Self, World, Underworld, Trinket) ManaType(Fire, Water, Earth, Air, Light, Life, Shadow, Death) Action(Expel, Expend, Extend, Link, Control)
  let validTypes = {
    source: {
      type: "source",
      typesList: ["self", "world", "underworld", "trinket"],
    },
    mana: {
      type: "mana",
      typesList: [
        "fire",
        "water",
        "earth",
        "air",
        "light",
        "life",
        "shadow",
        "death",
        "mana",
      ],
    },
    manaByTypes: {
      world: ["life", "light"],
      underworld: ["death", "shadow"],
      self: ["fire", "water", "earth", "air"],
      // Trinket is a variable passed from player item that contains a, or many, mana types
      trinket: [],
    },
    action: {
      type: "action",
      typesList: ["absorb", "expel", "expend", "extend", "link", "control"],
    },
  };

  // Gets next valid casts
  function nextValidCast(currentCast) {
    if (currentCast == "source") {
      return ["mana"];
    } else if (currentCast == "mana") {
      return ["action"];
    } else if (currentCast == "action") {
      return ["mana", "source"];
    } else {
      return [];
    }
  }

  // Gets previous valid casts
  function previousValidCast(currentCast) {
    if (currentCast == "source") {
      return ["action"];
    } else if (currentCast == "mana") {
      return ["source", "action"];
    } else if (currentCast == "action") {
      return ["mana"];
    } else {
      return [];
    }
  }

  // Builds string from valid casts
  function getCasts(type) {
    let validCasts = nextValidCast(type);
    let stringBuilder = "";
    validCasts.forEach((item) => {
      validTypes[item].typesList.forEach((property) => {
        stringBuilder += ` ${property}`;
      });
    });
    stringBuilder += ".";
    return stringBuilder;
  }

  spell.forEach((item, index) => {
    let tempEntry = {
      isManaControlled: false,
      isValid: false,
      type: null,
      entry: null,
      errorAtIndex: null,
      errorDescription: "",
    };

    if (spell.length === 1) {
      finalisedSpell.error.error = true;
      finalisedSpell.error.errorText =
        "There was an error in the spell data input.";
      return finalisedSpell;
    }

    if (validTypes.source.typesList.includes(spell[index]) == true) {
      tempEntry.type = "source";
      tempEntry.entry = spell[index];
      spellArray.push(tempEntry);
    } else if (validTypes.mana.typesList.includes(spell[index]) == true) {
      tempEntry.type = "mana";
      tempEntry.entry = spell[index];
      spellArray.push(tempEntry);
    } else if (validTypes.action.typesList.includes(spell[index]) == true) {
      tempEntry.type = "action";
      tempEntry.entry = spell[index];
      spellArray.push(tempEntry);
    } else {
      // Make spell error

      // Make check for current needed cast type
      let validCasts = nextValidCast(spell[index - 1]);

      spellErrorBool = true;
      tempEntry.entry = spell[index];
      tempEntry.errorAtIndex = index;
      try {
        tempEntry.errorDescription = `${
          spell[index]
        } is an incorrect keyword. Try: ${getCasts(
          spellArray[index - 1].type
        )}`;
      } catch {
        tempEntry.errorDescription = `${spell[index]} is an incorrect keyword.`;
      }

      spellArray.push(tempEntry);
    }
  });

  let spellCollectedManaTypes = ["mana", "fire", "water", "earth", "air"];

  spellArray.forEach((item, index) => {
    // Check if start and start is source type
    if (index === 0 && validTypes.source.typesList.includes(item.entry)) {
      if (item.entry !== "self") {
        externalMana.sourcesValidToBeCollected.push(item.entry);
        // spellCollectedManaTypes.push(...validTypes.manaByTypes[item.entry]);
      }
      item.isValid = true;
      return;
    } else if (index === 0) {
      // Make spell error
      spellErrorBool = true;
      item.errorAtIndex = index;
      item.errorDescription = `${item.entry} is not a valid mana source.`;
      return;
    }

    try {
      if (
        previousValidCast(item.type).includes(spellArray[index - 1].type) &&
        nextValidCast(item.type).includes(spellArray[index + 1].type)
      ) {
        if (item.type == "source") {
          if (item.entry !== "self") {
            externalMana.sourcesValidToBeCollected.push(item.entry);
          }
          item.isValid = true;
          return;
        } else if (item.type == "source") {
          // Make spell error
          spellErrorBool = true;
          item.errorAtIndex = index;
          item.errorDescription = `${item.entry} is not a valid mana source.`;
          return;
        }
        if (
          item.type === "mana" &&
          spellCollectedManaTypes.includes(item.entry)
        ) {
          item.isValid = true;
          finalisedSpell.spell.manaTypes.push(item.entry);
          return;
        } else if (item.type === "mana") {
          // Make spell error
          item.errorAtIndex = index;
          item.errorDescription = `${item.entry} is not available from the mana pool.`;
          return;
        }
        if (item.type == "action") {
          // Possibly do something dynamic within the game, such as gathering too much mana in the world or casting too many spells or something
          if (item.entry == "control") {
            if (spellArray[index - 2].entry != "absorb") {
              // Make spell error
              item.errorAtIndex = index;
              item.errorDescription = `There is no overflowing mana in the pool to be controlled.`;
              return;
            } else {
              item.isManaControlled = true;
              externalMana.manaControlled = externalMana.manaControlled + 1;
            }
          } else if (item.entry == "absorb") {
            if (
              typeof externalMana.sourcesValidToBeCollected[
                externalMana.count
              ] != "undefined"
            ) {
              spellCollectedManaTypes.push(
                ...validTypes.manaByTypes[
                  externalMana.sourcesValidToBeCollected[externalMana.count]
                ]
              );
              externalMana.sourcesCollected.push(
                externalMana.sourcesValidToBeCollected[externalMana.count]
              );
              externalMana.count =
                externalMana.sourcesValidToBeCollected.length > 0
                  ? externalMana.count + 1
                  : 0;
            } else {
              // Make spell error
              item.errorAtIndex = index;
              item.errorDescription = `There is no mana to be absorbed.`;
            }
          } else if (item.entry == "extend") {
            // Make action for final spell cast call /extend/
          }
          item.isValid = true;
        } else if (item.type == "action") {
          // Make spell error
          item.errorAtIndex = index;
          item.errorDescription = `${item.entry} is not a valid action.`;
        }
      } else if (
        nextValidCast(item.type).includes(spellArray[index + 1].type)
      ) {
        // Check for valid spell cast action
        if (nextValidCast(item.type).includes(spellArray[index - 1].type)) {
        }
      } else {
        // Consecrated Check on errors
        // Check on previous keyword for validity of current
        if (
          !nextValidCast(spellArray[index - 1].type).includes(item.type) &&
          item.errorAtIndex != null
        ) {
          console.log(item);
          console.log(spellCollectedManaTypes.includes(item.entry));
          // Make spell error
          spellErrorBool = true;
          item.errorAtIndex = index;
          item.errorDescription = `${
            spell[index]
          } is an incorrect keyword. Try: ${getCasts(
            spellArray[index - 1].type
          )}`;
        }
      }
    } catch {
      if (index == spellArray.length - 1 && item.type != "action") {
        // Make spell error
        spellErrorBool = true;
        item.errorAtIndex = index;
        item.errorDescription = `${item.entry} is an incorrect keyword. ${
          getCasts(spellArray[index - 1].type) == "."
            ? ""
            : "Try: " + getCasts(spellArray[index - 1].type)
        }`;
      } else {
        item.isValid = true;
      }
    }
  });

  // Apply absorbed mana discounts, via externalMana.manaControlled
  let manaCost = Math.floor(getDynamicSpellCosts(spell) * 3.1415);

  if (externalMana.manaControlled > 0) {
    manaCost = Math.floor(
      manaCost - manaCost * (externalMana.manaControlled / 5)
    );
  }

  finalisedSpell.spell.manaCost = manaCost;

  spellArray.forEach((item) => {
    if (item.isValid === false) {
      finalisedSpell.error.errorText += " " + item.errorDescription + " ";
      finalisedSpell.error.error = true;
    }
  });

  finalisedSpell.spell.spellRank = getDynamicSpellRank(
    finalisedSpell.spell.manaCost
  );

  return finalisedSpell;
};

// Move to functions util file and allow for database querying
export const checkSpellValidity = async (
  autoCheck,
  setSpellCreation,
  spellCreation,
  setSpellError
) => {
  let tempState = spellCreation,
    tempError = {
      isInvalid: false,
      errorDescription: "",
    };

  let error = await checkSpellExists(spellCreation);
  // Make error from builtSpell compatible with current error fields
  let builtSpell = buildSpell(spellCreation.spellCreationTextField.split(" "));

  let errorBool = false;

  if (error.spellName == true) {
    tempError.isInvalid = true;
    tempError.errorDescription += " Name Exists, ";
    errorBool = true;
  }
  if (error.spellCast == true) {
    tempError.isInvalid = true;
    tempError.errorDescription += " Cast Exists, ";
    errorBool = true;
  }
  if (error.spellDescription == true) {
    tempError.isInvalid = true;
    tempError.errorDescription += " Description Exists ";
    errorBool = true;
  }

  if (builtSpell.error.error === true) {
    tempError.isInvalid = true;
    tempError.errorDescription += builtSpell.error.errorText;
    errorBool = true;
  }

  if (
    spellCreation.spellCreationTextField != "" &&
    spellCreation.spellDescription != "" &&
    spellCreation.spellName != "" &&
    errorBool === false
  ) {
    if (autoCheck == false) {
      playSound("success", { isLoggedIn: true });
    }
    setSpellError({
      isInvalid: false,
      errorDescription: "",
    });

    tempState.manaCost = builtSpell.spell.manaCost;
    tempState.spellRank = builtSpell.spell.spellRank;
    tempState.spellIsValid = true;
    tempState.manaTypes = builtSpell.spell.manaTypes;

    Object.keys(tempState.typeOfMagic).forEach((stateMagicProperty) => {
      tempState.typeOfMagic[stateMagicProperty].selected = false;
    });

    Object.keys(tempState.typeOfMagic).forEach((stateMagicProperty) => {
      builtSpell.spell.manaTypes.forEach((manaTypesProperty) => {
        let strToUpperCase =
          manaTypesProperty.charAt(0).toUpperCase() +
          manaTypesProperty.slice(1);
        if (stateMagicProperty == strToUpperCase) {
          tempState.typeOfMagic[stateMagicProperty].selected = true;
        }
      });
    });

    setSpellCreation({ ...tempState });
  } else {
    if (autoCheck == false) {
      playSound("error", { isLoggedIn: true });
    }

    setSpellError({ ...tempError });
    tempState.spellIsValid = false;
    tempState.errorDescription = "Spell is Invalid: Unkown Reason";
    setSpellCreation({ ...tempState });
  }
};

export const createSpell = async (spellCreationObject) => {
  let spellName = spellCreationObject.spellName;
  return await setWithRef(
    `/globalGameData/spells/${spellName}/`,
    spellCreationObject
  );
};

export const castSpell = (spell, state) => {};

export const gameSetup = async (state, setState, user, collector) => {
  let tempState = { ...state };
  tempState.gameData = await getByRef(
    `${user.email.replace("@", "").replace(".", "")}/gameData`
  );

  tempState.gameData.globalScript = await getByRef("globalScript/");
  tempState.user = user;
  tempState.id = user.uid;
  tempState.isLoggedIn = true;
  tempState.isLoading = false;
  if (tempState.gameData.introComplete === false) {
    tempState.gameData.currentScript =
      tempState.gameData.globalScript.events.intro.theBeginning.text;
    tempState.gameData.introComplete = true;
  } else {
    tempState.gameData.currentScript = `Welcome back, ${tempState.gameData.settings.characterName}!`;
  }

  setState(tempState);
};

export const triggerEvent = async (event, state, setState) => {
  switch (event.type) {
    case "script":
      await scriptHandler(event, state, setState);
      break;
    case "battle":
      // battleHandler
      break;
    case "spell":
      await spellHandler(event, state, setState);
      break;
    case "userInfo":
      await userInfoHandler(event, state, setState);
      break;
    case "sound":
      playSound(event.data.sound, event.data.state);
      break;
  }
  updatePlayerInfo(state, state.gameData);
};

export const userInfoHandler = (event, state, setState) => {
  if (event.subType === "characterName") {
    let tempState = { ...state };
    tempState.gameData.settings.characterName = event.data;
    setState({ ...tempState });
  }
};

export const spellHandler = async (event, state, setState) => {
  let checkSpellCastObject = await checkSpellCast(event.data);
  let foundSpell = checkSpellCastObject.foundSpell,
    spellIsValid = checkSpellCastObject.spellIsValid;

  let isSpellKnown = false;
  let knownSpells = state.gameData.knownSpells;

  // This checks whether the user has this spell in their spellbook or not
  if (spellIsValid) {
    for (const property in knownSpells) {
      if (foundSpell.spellName === knownSpells[property].spellName) {
        isSpellKnown = true;
        break;
      }
    }
  } else {
    // Spell is not valid do something to let the user know.
    alert("Spell is not valid.");
    return;
  }

  // event.subType === "addToSpellbook" &&
  // event.subType === "castFromSpellbook" &&
  // Add check if spell cast is unknown and then to add to spellbook
  // New function to add to spellbook
  if (isSpellKnown === false) {
    // Add spell to spellbook upon learning
    let tempState = { ...state };

    //
    if (typeof tempState.gameData.knownSpells === "undefined") {
      tempState.gameData.knownSpells = {};
    }
    console.log("");
    tempState.gameData.knownSpells[foundSpell.spellName] = foundSpell;
    await triggerEvent(
      {
        type: "script",
        data: {
          subType: "spell",
          directory: "spell",
          selector: "spellDiscover",
          spellName: foundSpell.spellName,
        },
      },
      state,
      setState
    );
    triggerEvent(
      { type: "sound", data: { sound: "spellLearned", state } },
      state,
      setState
    );
  } else {
    // Cast spell from spellbook
    await triggerEvent(
      {
        type: "script",
        data: {
          subType: "spell",
          directory: "spell",
          selector: "spellCast",
          spellName: foundSpell.spellName,
        },
      },
      state,
      setState
    );
    triggerEvent(
      { type: "sound", data: { sound: "spellCast1", state } },
      state,
      setState
    );
  }
};

export const checkSpellCast = async (spell) => {
  let spellsList = await getByRef("globalGameData/spells");
  let spellIsValid = false,
    foundSpell = undefined;

  for (const property in spellsList) {
    if (
      spellsList[property].spellCreationTextField.toLowerCase() ==
      spell.castTextField.toLowerCase()
    ) {
      spellIsValid = true;
      foundSpell = spellsList[property];
      break;
    }
  }
  return { spellIsValid, foundSpell };
};

// Rewrite script handler funcitonality to run off of event based triggers

export const scriptHandler = (triggeredEvent, state, setState) => {
  let tempState = { ...state };
  let event = triggeredEvent.data;

  if (event == null) {
    tempState.gameData.currentScript = "";
  } else if (event.subType == "spell") {
    if (event.selector === "spellCast") {
      tempState.gameData.currentScript = `${
        tempState.gameData.globalScript.events[event.directory][event.selector]
      } ${event.spellName} `;
    } else {
      tempState.gameData.currentScript = `${event.spellName} ${
        tempState.gameData.globalScript.events[event.directory][event.selector]
      }`;
    }
  } else {
    // Spellname might be the wrong selector here!
    tempState.gameData.currentScript = `${
      tempState.gameData.globalScript.events[event.directory][event.selector]
        .text
    }`;
  }

  setState({ ...tempState });
};

export const updatePlayerInfo = (state, gameData) => {
  setWithRef(
    `${state.user.email.replace("@", "").replace(".", "")}/gameData`,
    gameData
  );
};

// export const scriptHandler = (script, state, setCurrentText) => {
//   let count, setCount;
//   for (const property in state.globalScript) {
//     if (state.globalScript[property].index === count) {
//       setCount((count) => {
//         return count + 1;
//       });
//       break;
//     } else if (count >= 3) {
//       setCount(4);
//     }
//   }
//   for (const property in state.globalScript) {
//     if (state.globalScript[property].index == count) {
//       setCurrentText(state.globalScript[property].text);
//       break;
//     }
//   }
// };

export const playSound = (sound, state) => {
  let audio;
  if (sound == "success") {
    audio = new Audio(success);
  } else {
    audio = new Audio(`/sounds/effects/ui/${sound}.ogg`);
  }

  if (state.isLoggedIn == true) {
    audio.currentTime = 0;
    audio.play();
  }
};
