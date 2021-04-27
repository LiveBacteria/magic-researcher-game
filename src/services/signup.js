import firebase from "firebase";
import { Redirect } from "react-router";

export default async function signupHandler(email, password) {
  let bool = false;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      bool = true;
      firebase
        .database()
        .ref(`${user.email.replace("@", "").replace(".", "")}/gameData/`)
        .set({
          currentScript: "",
          introComplete: false,
          knownSpells: {},
          settings: {
            characterName: "Morticus",
            isAdmin: false,
            isCreator: false,
          },
        });
    })
    .catch((error) => {
      console.log(error.code, error.message);
      bool = false;
    });
  return bool;
}
