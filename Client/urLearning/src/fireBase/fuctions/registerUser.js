import { auth } from "../credenciales";
import { createUserWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert';

export default async function registerUser(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    return user;
  } catch (error) {
    error.message === "Firebase: Error (auth/email-already-in-use)."
      ? swal("El correo electrónico ya existe!", "Intenta con otra cuenta.", "info")
      : console.log(error);
  }
}


