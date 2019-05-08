let firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDLg1_G2GoA_SYqRndgN_mLKlHLV8R4ZKE",
    authDomain: "nano-community-1.firebaseapp.com",
    databaseURL: "https://nano-community-1.firebaseio.com",
    projectId: "nano-community-1",
    storageBucket: "nano-community-1.appspot.com",
    messagingSenderId: "125871981201"
});

export default firebase;