// import { useEffect, useState } from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import firebaseApp from "./firebase";
// import firebase from "firebase/app";
// import { db } from "./firebase";
// import Navbar from "./Navbar/Navbar";
// import Main from "./Main/Main";
// import "./App.css";

// const firebaseAppAuth = firebaseApp.auth();
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// function App({ user, signOut, signInWithGoogle }) {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     async function checkUserExists() {
//       if (user) {
//         let exists = false;
//         await db
//           .collection("users")
//           .get()
//           .then((snapshot) => {
//             snapshot.forEach((doc) => {
//               if (doc.id === user.uid) {
//                 exists = true;
//                 setTodos(doc.data().todos);
//               }
//             });
//           });

//         if (!exists) {
//           db.collection("users").doc(user.uid).set({});
//         }
//       }
//     }
//     checkUserExists();
//   }, [user]);

//   return (
//     <>
//       <Navbar signout={signOut} user={user} />
//       <div className="App">
//         {user ? (
//           <Main user={user} todos={todos} />
//         ) : (
//           <div className="signin-button">
//             <button
//               type="button"
//               className="btn btn-dark"
//               onClick={signInWithGoogle}
//             >
//               Sign in with Google
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);

import { useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebaseApp from "./firebase";
import firebase from "firebase/app";
import { rdb } from "./firebase";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import "./App.css";

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function App({ user, signOut, signInWithGoogle }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function checkUserExists() {
      if (user) {
        let exists = false;
        await rdb.ref("users").once("value", (snapshot) => {
          let obj = snapshot.val();
          for (let key in obj) {
            if (key === user.uid) {
              exists = true;
            }
          }
        });

        if (!exists) {
          rdb.ref("users");
        }
      }
    }

    checkUserExists();
  }, [user]);

  return (
    <>
      <Navbar signout={signOut} user={user} />
      <div className="App">
        {user ? (
          <Main user={user} todos={todos} />
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






////////////////////////////////////////////////////////////////////////////////////////////////


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
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function checkUserExists() {
      if (user) {
        let exists = false;
        await db
          .collection("users")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.id === user.uid) {
                exists = true;
                let data = [];
                for (const [id, todo] of Object.entries(doc.data())) {
                  data.push({ id, todo });
                }
                setTodos(data);
              }
            });
          });

        if (!exists) {
          db.collection("users").doc(user.uid).set({});
        }
      }
    }
    checkUserExists();
  }, [user]);

  return (
    <>
      <Navbar signout={signOut} user={user} />
      <div className="App">
        {user ? (
          <Main user={user} todos={todos} />
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




import { useState } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./TodoCard";

const LeftMain = ({ user, todos }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = () => {
    db.collection("users")
      .doc(user.uid)
      .set({ [uuidv4()]: todo }, { merge: true });
  };

  return (
    <div className="left-main">
      <div className="input-div">
        <input
          type="text"
          placeholder="add your todo .."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>
      <div className="todos-div">
        {todos.map((t) => (
          <TodoCard t={t} key={t.id} />
        ))}
      </div>
    </div>
  );
};

export default LeftMain;


//////////////////////////////////////////////////////////////////////////////

