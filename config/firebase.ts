// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBb7_mMdo3lYC0ekqefgqZeXsoFpHJXz0A",
    authDomain: "fir-db-ddb5b.firebaseapp.com",
    projectId: "fir-db-ddb5b",
    storageBucket: "fir-db-ddb5b.appspot.com",
    messagingSenderId: "467089242680",
    appId: "1:467089242680:web:e0be423fccf88269d404cd",
    measurementId: "G-XREN3QBH59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storeDb = getStorage(app);