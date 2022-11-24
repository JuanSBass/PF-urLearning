import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCcRgsrYa3kZSVtbAoK-0TUP9uCSDPd_1Q",
  authDomain: "urlearning-9e225.firebaseapp.com",
  projectId: "urlearning-9e225",
  storageBucket: "urlearning-9e225.appspot.com",
  messagingSenderId: "766483503136",
  appId: "1:766483503136:web:fe6823e955337623c0c445",
  measurementId: "G-N5KY4SBTFN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
