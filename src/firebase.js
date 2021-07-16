import firebase from 'firebase/app';
import 'firebase/firestore';

const fireBaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDl580T4lgZSzkUfpBcuqEb9ONFqNrbZUQ",
    authDomain: "postingwebsite-e4087.firebaseapp.com",
    projectId: "postingwebsite-e4087",
    storageBucket: "postingwebsite-e4087.appspot.com",
    messagingSenderId: "113195667978",
    appId: "1:113195667978:web:73e4c11c53b80b576a05f3",
    measurementId: "G-NHBS27WF2J"
});

const db = fireBaseApp.firestore();

export { db };