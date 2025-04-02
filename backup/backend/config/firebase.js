const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4rF__--xCkMNzp89EWYibQQhXstlDXtI",
    authDomain: "team-portfolio-da966.firebaseapp.com",
    projectId: "team-portfolio-da966",
    storageBucket: "team-portfolio-da966.firebasestorage.app",
    messagingSenderId: "258119392366",
    appId: "1:258119392366:web:bca874efb3da69298fda7f",
    measurementId: "G-48PJNJJ5YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db }; 