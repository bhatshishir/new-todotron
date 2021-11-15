 import { useState } from "react";
import { db } from "../firebase";
import TodoCard from "./TodoCard";
import firebase from "firebase/app";
import addicon from "../../src/addicons.png"

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
      <h2 classname="mytodo1" id="heading1">My Todos</h2>
      <div className="input-div">
        
        <input
          class="form-control form-control-lg"
          aria-describedby="basic-addon2"
          id="ip"
          type="text"
          placeholder="Add your todo..."
          onChange={(e) => setTodo(e.target.value)}
          autoFocus
          value={todo}
        />
      
        <img id="addicon" src={addicon} alt="add" onClick={handleSubmit}/>
       
        
        <input
          class="form-control form-control-lg"
          id="ip"
          type="text"
          placeholder="Search todo"
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
