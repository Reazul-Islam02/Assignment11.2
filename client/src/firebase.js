import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA0qam-aH_ZwbXo7hJ7VRJHKPSVNJ8IbkE",
    authDomain: "digitallifelessons-c0bed.firebaseapp.com",
    projectId: "digitallifelessons-c0bed",
    storageBucket: "digitallifelessons-c0bed.firebasestorage.app",
    messagingSenderId: "758557980152",
    appId: "1:758557980152:web:26f4bd98692047bc19d20d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
