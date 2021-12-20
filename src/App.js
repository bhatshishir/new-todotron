import { useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebaseApp from "./firebase";
import firebase from "firebase/app";
import { db } from "./firebase";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import "./App.css";
import { Toaster } from "react-hot-toast";


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
           <>
           <Toaster />
           <Main
             user={user}
             pinnedTodos={pinnedTodos}
             unpinnedTodos={unpinnedTodos}
             reload={reload}
           />
         </>
        ) : (
          <div className="signin-button">
            <div className="page1text">
            <div className="welcomepage">
              <h1 id="wtext">Welcome to Todotron!</h1>
              </div>
              <div>
              <h5 id="wtext2">The place where you can list your tasks, schedule and prioritize them. 
                </h5>
                </div>
              <div>
            <button
              id="but"
              type="button"
              className="btn btn-dark"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
            </div>
            </div>
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
