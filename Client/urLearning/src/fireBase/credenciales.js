import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_CONFIG,

  authDomain: "urlearning-e9009.firebaseapp.com",

  projectId: "urlearning-e9009",

  storageBucket: "urlearning-e9009.appspot.com",

  messagingSenderId: "903360110022",

  appId: "1:903360110022:web:76d00bb3ce5489565866c7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
