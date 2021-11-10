import { useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebaseApp from "./firebase";
import firebase from "firebase/app";
import { db } from "./firebase";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import "./App.css";

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function App({ user, signOut, signInWithGoogle }) {
  const [pinnedTodos, setPinnedTodos] = useState([]);
  const [unpinnedTodos, setUnpinnedTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    function checkUserExists() {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (!snapshot.exists) {
              db.collection("users").doc(user.uid).set({});
              setPinnedTodos([]);
              setUnpinnedTodos([]);
            } else {
              db.collection("users")
                .doc(user.uid)
                .collection("todos")
                .orderBy("createdAt", "desc")
                .get()
                .then((snapshot) => {
                  let pinnedList = [];
                  let unpinnedList = [];
                  snapshot.forEach((doc) => {
                    let data = doc.data();
                    let id = doc.id;
                    if (data.pinned) {
                      pinnedList.push({ ...data, id });
                    } else {
                      unpinnedList.push({ ...data, id });
                    }
                  });
                  setPinnedTodos(pinnedList);
                  setUnpinnedTodos(unpinnedList);
                });
            }
          });
      }
    }
    checkUserExists();
  }, [user, refresh]);

  const reload = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <Navbar signout={signOut} user={user} />
      <div className="App">
        {user ? (
          <Main
            user={user}
            pinnedTodos={pinnedTodos}
            unpinnedTodos={unpinnedTodos}
            reload={reload}
          />
        ) : (
          <div className="signin-button">
            <button
              type="button"
              className="btn btn-dark"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
