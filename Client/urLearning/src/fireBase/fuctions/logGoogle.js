import { auth } from "../credenciales";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

export default async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const user = await signInWithRedirect(auth, provider);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}
