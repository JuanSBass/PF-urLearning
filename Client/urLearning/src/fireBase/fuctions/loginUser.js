import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../credenciales";

export default async function loginUser(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    return user;
  } catch (error) {
    if(error.message === "Firebase: Error (auth/wrong-password).")
    swal("¡Correo y/o Contraseña inválida!", "Contáctanos si no recuerdas tu contraseña.", "error");
    console.log(error.message);
  }
}
