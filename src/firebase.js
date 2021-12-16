import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var conf = {
  apiKey: "AIzaSyAfw6YZ9jJSmpYnxD_xJLvanVbVaLH4l1g",
  authDomain: "firetodo-a3e5a.firebaseapp.com",
  projectId: "firetodo-a3e5a",
  storageBucket: "firetodo-a3e5a.appspot.com",
  messagingSenderId: "98011556130",
  appId: "1:98011556130:web:f5b2391a06a8d3d42d5d7b",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(conf)
  : firebase.app();

export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export default firebaseApp;
