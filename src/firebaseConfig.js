import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBdOT8Twc_8QfkLmXhkfpLW5wnxycHIQA4",
  authDomain: "slack-clone-54370.firebaseapp.com",
  projectId: "slack-clone-54370",
  storageBucket: "slack-clone-54370.appspot.com",
  messagingSenderId: "231718406251",
  appId: "1:231718406251:web:1f04ea184e8add19a6c92e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
