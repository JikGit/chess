import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCwEyNW6P5GEN8WiXkdkLNhKkzgyRHZL7s",
    authDomain: "chess-da272.firebaseapp.com",
    projectId: "chess-da272",
    storageBucket: "chess-da272.appspot.com",
    messagingSenderId: "105906334570",
    appId: "1:105906334570:web:b59d209968b346400ed313",
    measurementId: "G-669YJ2JQPJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });


