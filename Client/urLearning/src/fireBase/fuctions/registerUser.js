import { auth } from "../credenciales";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function registerUser(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    return user;
  } catch (error) {
    error.message === "Firebase: Error (auth/email-already-in-use)."
      ? alert("La cuenta de usuario ya se encuentra registrada")
      : console.log(error);
  }
}
