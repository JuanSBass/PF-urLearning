import React from "react";
import registerUser from "../functions/registerUser"
import logInWithGoogle from "../functions/logInWithGoogle"



export default function Login() {
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [userForm, setUserForm] = React.useState("");

    async function submitHandler(event) {
        event.prentDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        console.log("voila", username, password)

        if (isLoggingIn) {
            await logInWithGoogle(email, password)
        } else {
            await registerUser(email, password)
        }
    }

    return (
        <div>
            <h4>{isLoggingIn ? 'Inicia sesión' : 'Regístrate'}
            </h4>
            <form action="" onSubmit={submitHandler}>
                <label for="username">Username</label>
                <input type="text" id="username" />
                <label for="password">Password</label>
                <input type="password" id="password" />
                <button type="submit">{isLoggingIn ? "Acceder" :
                    'Registrate'}</button>
            </form>
            <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
                {isLoggingIn ? '¿No tienes cuenta? Crea una'
                    : '¿Ya tienes cuenta? Accede'}
            </button>
        </div>
    );
}