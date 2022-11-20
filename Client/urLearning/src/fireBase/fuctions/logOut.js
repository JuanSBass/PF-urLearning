import { auth } from "../credenciales";
import { signOut } from "firebase/auth";

export default async function logOuts() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}
