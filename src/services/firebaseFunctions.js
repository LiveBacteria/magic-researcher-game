import firebase from "firebase";

export const fbLogin = async (email, password) => {
  let collector = { bool: false, user: "", gameData: "" };
  let userCredential;

  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        userCredential = data;
      })
      .catch((error) => {
        console.error(error.code, error.message);
        collector.bool = false;
      });
    await firebase
      .database()
      .ref(
        `${userCredential.user.email
          .replace("@", "")
          .replace(".", "")}/gameData/`
      )
      .once("value", (snapshot) => {
        const data = snapshot.val();
        collector.gameData = data;
        collector.user = userCredential.user;
        collector.bool = true;
      })
      .catch((error) => {
        console.error(error.code, error.message);
        collector.bool = false;
      });
    await firebase
      .database()
      .ref("globalScript")
      .once("value", (snapshot) => {
        const data = snapshot.val();
        collector.globalScript = data;
      })
      .catch((error) => {
        console.error(error.code, error.message);
        collector.bool = false;
      });
  } catch (error) {
    console.error(error.code, error.message);
    collector.bool = false;
  }
  console.log("collector", collector);
  return collector;
};

export const getByRef = async (ref) => {
  let collector;
  await firebase
    .database()
    .ref(ref)
    .once("value", (snapshot) => {
      const data = snapshot.val();
      collector = data;
    });
  return collector;
};

// Data must be in object format, with no arrays.
// Set overwrites all previous values with the current data values.
export const setWithRef = async (ref, data) => {
  let success = false;
  await firebase
    .database()
    .ref(ref)
    .set(data)
    .then(() => {
      success = true;
    })
    .catch(() => {
      success = false;
    });
  return success;
};

// Data must be in object format, with no arrays.
// Push adds to ref directory.
export const pushWithRef = async (ref, data) => {
  await firebase.database().ref(ref).set(data);
};
