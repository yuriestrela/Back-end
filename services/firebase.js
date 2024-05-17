// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArd6H5A-VsAU0flojjjapiCIBCtyQCnbc",
  authDomain: "criando-crud.firebaseapp.com",
  projectId: "criando-crud",
  storageBucket: "criando-crud.appspot.com",
  messagingSenderId: "648633060501",
  appId: "1:648633060501:web:a5c05d32ff43fab98edf9c",
  measurementId: "G-8V2Q9294Q4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);