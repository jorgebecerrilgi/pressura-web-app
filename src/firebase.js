import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1WGUlDpicPh4AxAxmHMyViVfB4E1azf8",
    authDomain: "pressuraapp.firebaseapp.com",
    projectId: "pressuraapp",
    storageBucket: "pressuraapp.appspot.com",
    messagingSenderId: "780305792682",
    appId: "1:780305792682:web:ba9aba326a8a433ccc9ad3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
