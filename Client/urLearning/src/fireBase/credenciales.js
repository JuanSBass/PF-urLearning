import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrDnc3Zr0dBAqnMg8MEpBeoxLhBIZ5h8k",
  authDomain: "urlearning-1fe9f.firebaseapp.com",
  projectId: "urlearning-1fe9f",
  storageBucket: "urlearning-1fe9f.appspot.com",
  messagingSenderId: "600786481432",
  appId: "1:600786481432:web:463817be9f4f2ee4bd2e6d",
  measurementId: "G-N3V5D1X8K1",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
