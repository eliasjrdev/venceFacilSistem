import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDlJ14HWJe9UcW5EfiQtPA5yP8RWOPGIVY",
    authDomain: "vencefacil.firebaseapp.com",
    projectId: "vencefacil",
    storageBucket: "vencefacil.firebasestorage.app",
    messagingSenderId: "951700127329",
    appId: "1:951700127329:web:05d9b7d4b3d22c39a2f420"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
export { app, auth, db };