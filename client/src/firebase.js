// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTVQM8iWcgsuAhkpxct9_u2bghxpUjf9I",
  authDomain: "expanse-app-fba2f.firebaseapp.com",
  projectId: "expanse-app-fba2f",
  storageBucket: "expanse-app-fba2f.appspot.com",
  messagingSenderId: "160846495955",
  appId: "1:160846495955:web:53fe87fe33b658479b5426"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);