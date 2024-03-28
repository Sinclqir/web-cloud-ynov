// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmz0XZX7YEq4iUE4oY3pm2uiWAh6XHboY",
  authDomain: "web-cloud-ynov-46f1d.firebaseapp.com",
  projectId: "web-cloud-ynov-46f1d",
  storageBucket: "web-cloud-ynov-46f1d.appspot.com",
  messagingSenderId: "197393246051",
  appId: "1:197393246051:web:631a2a3a33dc61f1a05556",
  measurementId: "G-7XVNWFNRP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);