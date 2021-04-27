import firebase from "firebase";

export async function userStatusChange(
  submittedPasswords,
  state,
  setState,
  playSound
) {
  let collector = {
    adminPassword: "",
    creatorPassword: "",
  };
  await firebase
    .database()
    .ref(`/globalGameData/user-status-passwords/`)
    .once("value", (snapshot) => {
      const data = snapshot.val();
      collector.adminPassword = data.admin;
      collector.creatorPassword = data.creator;
    });

  if (submittedPasswords.admin == collector.adminPassword) {
    await firebase
      .database()
      .ref(
        `${state.user.email
          .replace("@", "")
          .replace(".", "")}/gameData/settings/isAdmin`
      )
      .set(true);
    let tempState = { ...state };
    tempState.gameData.settings.isAdmin = true;
    setState({ ...tempState });
  }

  if (submittedPasswords.creator == collector.creatorPassword) {
    await firebase
      .database()
      .ref(
        `${state.user.email
          .replace("@", "")
          .replace(".", "")}/gameData/settings/isCreator`
      )
      .set(true);
    let tempState = { ...state };
    tempState.gameData.settings.isCreator = true;
    setState({ ...tempState });
  }

  if (
    state.gameData.settings.isAdmin == false &&
    state.gameData.settings.isCreator == false
  ) {
    playSound("error", state);
  } else if (state.gameData.settings.isAdmin || state.gameData.isCreator) {
    playSound("success", state);
  }
}
