import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../credenciales";

export default async function loginUser(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error.message);
  }
}
