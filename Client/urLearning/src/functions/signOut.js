import { auth } from "../firebase/credenciales";
import { signOut } from "firebase/auth";

export default async function logOut(email, password) {
  try {
    const user = await signOut(auth);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}
