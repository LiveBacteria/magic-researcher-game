import firebase from "firebase";
import { Redirect } from "react-router";
import { fbLogin } from "./firebaseFunctions";

export default async function loginHandler(email, password) {
  let userInfo = await fbLogin(email, password);
  return userInfo;
}
