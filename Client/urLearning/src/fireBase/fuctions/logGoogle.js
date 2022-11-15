import { auth } from "../credenciales";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);

    return user;
  } catch (error) {
    console.log(error);
  }
}
