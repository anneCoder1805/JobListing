import app from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCcoUnoIGpXv26QV8sB_Loe898TJgLqEso",
    authDomain: "vistaartest-214ae.firebaseapp.com",
    projectId: "vistaartest-214ae",
    storageBucket: "vistaartest-214ae.appspot.com",
    messagingSenderId: "569515210048",
    appId: "1:569515210048:web:c9c6ee47abe861f1ec76a5"
  };
  // Initialize Firebase
  const firebase = app.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();

  export {firebase, firestore, app};