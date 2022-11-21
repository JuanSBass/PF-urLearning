

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


  const firebaseConfig = {
    apiKey: "AIzaSyBmfVVMl6AW_uFIwDP9KkasUVHTLbzVP20",
    authDomain: "urlearning-6d76c.firebaseapp.com",
    projectId: "urlearning-6d76c",
    storageBucket: "urlearning-6d76c.appspot.com",
    messagingSenderId: "360505523716",
    appId: "1:360505523716:web:1eb90af98e17dd5f3aff51",
    measurementId: "G-K10899DR07"
  };



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;