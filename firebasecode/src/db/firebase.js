// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAkRaRt21Yz79MCklq0-VZDHGemlEEXAQ",
  authDomain: "fir-stressen.firebaseapp.com",
  projectId: "fir-stressen",
  storageBucket: "fir-stressen.appspot.com",
  messagingSenderId: "141904458644",
  appId: "1:141904458644:web:df354478ecb9f231ec5581",
  measurementId: "G-6QN5LHE88K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);