import { useState } from "react";
import { db } from "../firebase";
import TodoCard from "./TodoCard";
import firebase from "firebase/app";

const LeftMain = ({ user, todos, reload }) => {
  const [todo, setTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    if (todo !== "") {
      db.collection("users").doc(user.uid).collection("todos").add({
        todo: todo,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        pinned: false,
      });
      setTodo("");
      reload();
    }
  };

  return (
    <div className="left-main">
      <h2>My todos</h2>
      <div className="input-div">
        <input
          type="text"
          placeholder="Add your todo..."
          onChange={(e) => setTodo(e.target.value)}
          autoFocus
          value={todo}
        />
        <button onClick={handleSubmit}>Add</button>
        <input
          type="text"
          placeholder="search todo"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <div className="todos-div">
        {todos
          .filter((v) =>
            v.todo.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((t) => (
            <TodoCard t={t} key={t.id} user={user} reload={reload} pin={true} />
          ))}
      </div>
    </div>
  );
};

export default LeftMain;
