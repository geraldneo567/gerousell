import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDm_DrFcO5S9maGZu9c8bafh0ecfyzVJNc",
    authDomain: "gerousell.firebaseapp.com",
    projectId: "gerousell",
    storageBucket: "gerousell.appspot.com",
    messagingSenderId: "32441222200",
    appId: "1:32441222200:web:f14e4ad847b79462bf92cd",
    measurementId: "G-BW7GKLFG92"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };