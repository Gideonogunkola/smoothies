 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCjQ_lEi8062iiEfXhtq30BFUVOuRbWZRQ",
    authDomain: "geegee-smoothies.firebaseapp.com",
    projectId: "geegee-smoothies",
    storageBucket: "geegee-smoothies.appspot.com",
    messagingSenderId: "520972474264",
    appId: "1:520972474264:web:e9f1b588894e3bd1e4fded",
    measurementId: "G-0GT3VYT6CM"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics(); 

  export default firebaseApp.firestore()