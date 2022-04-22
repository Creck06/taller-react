// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAhy09LdB5kM4HGv_afCdi1pkh0SVe8Sgk",
  authDomain: "bdreact-bfcf7.firebaseapp.com",
  projectId: "bdreact-bfcf7",
  storageBucket: "bdreact-bfcf7.appspot.com",
  messagingSenderId: "664468856297",
  appId: "1:664468856297:web:dfae2c78f1d269b27f7f78"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}