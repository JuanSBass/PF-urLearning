import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  apiKey: "AIzaSyAgkHWcbq9beTgvoPc6fhtHKlh-VETM5rc",
  authDomain: "urlearning-12677.firebaseapp.com",
  projectId: "urlearning-12677",
  storageBucket: "urlearning-12677.appspot.com",
  messagingSenderId: "642638542513",
  appId: "1:642638542513:web:a41376f064787af8b5d490",
  measurementId: "G-RNER90V8DY",
};

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_API_KEY,

//   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,

//   projectId: import.meta.env.VITE_APP_PROJECT_ID,

//   storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,

//   messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,

//   appId: import.meta.env.VITE_APP_APP_ID,
// };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
