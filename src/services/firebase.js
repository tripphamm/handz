import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyDzD4Vj79TqTYDqe4-Qkwz1j1LkngdG_QU",
  authDomain: "handz-891.firebaseapp.com",
  databaseURL: "https://handz-891.firebaseio.com",
  projectId: "handz-891",
  storageBucket: "handz-891.appspot.com",
  messagingSenderId: "148972355677",
  appId: "1:148972355677:web:a7c1d848d027eea7",
}

firebase.initializeApp(config)

if (firebase.firestore === undefined) {
  throw new Error("Firebase Firestore library was not loaded")
}

export const firestore = firebase.firestore()

if (firebase.auth === undefined) {
  throw new Error("Firebase Auth library was not loaded")
}

export const auth = firebase.auth()
