import { db, storage } from "../firebase";
import { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import { useSpeechContext } from "@speechly/react-client";
import { ReactMic } from "react-mic";
import firebase from "firebase/app";
import DatePicker from "../utils/DatePicker";
import PriorityDropdown from "../utils/PriorityDropdown";
import toast from "react-hot-toast";
import addicon from "../../src/addicons.png"

const LeftMain = ({ user, todos, reload }) => {
  const [todo, setTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [priority, setPriority] = useState(1);
  const [date, setDate] = useState(new Date());
  const { segment, toggleRecording } = useSpeechContext();

  useEffect(() => {
    setSearchTerm(
      segment ? segment.words.map((w) => w.value.toLowerCase()).join(" ") : ""
    );
  }, [segment, segment && segment.words.length]); // eslint-disable-line

  const handleSubmit = (e) => {
    function update() {
      const data = {
        todo: todo,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        pinned: false,
        type: "text",
        priority,
        date,
      };

      try {
        db.collection("users").doc(user.uid).collection("todos").add(data);
        setTodo("");
        reload();
        toast.success("Task added");
      } catch (error) {
        console.log(error);
      }
    }

    if ((!e.key && todo !== "") || (e.key === "Enter" && todo !== "")) {
      update();
    }
  };

  const onUpload = async (file) => {
    const fname = `audio_${Date.now()}.mp3`;
    try {
      const snap = await storage.ref("audio").child(fname).put(file.blob);
      const audioUrl = await snap.ref.getDownloadURL();
      await db.collection("users").doc(user.uid).collection("todos").add({
        todo: audioUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        pinned: false,
        type: "audio",
        fname,
        priority,
        date,
      });
      setTodo("");
      reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="left-main">
      <h1 classname="mytodo1" id="heading1">My Todos</h1>
      <div className="input-div">
        
      <div className="input">
          <input
            class="form-control form-control-lg"
            aria-describedby="basic-addon2"
            id="ip"
            type="text"
            placeholder="Add tasks and todos..."
            onChange={(e) => setTodo(e.target.value)}
            autoFocus
            value={todo}
            onKeyDown={(e) => handleSubmit(e)}
          />
           <img id="addicon" src={addicon} alt="add" onClick={handleSubmit}/>
          <ReactMic
            record={isRecording}
            className="d-none"
            onStop={onUpload}
            mimeType="audio/mp3"
          />
          <button
            onClick={() =>
              setIsRecording((p) => {
                if (p === false) {
                 toast("Recording...");
                }
                return !p;
              })
            }
          >
            {isRecording ? "Recording" : "Add voice task"}
          </button>
          <PriorityDropdown
            setPriority={setPriority}
            priority={priority}
            edit={false}
          />
          <DatePicker
            date={date}
            setDate={setDate}
            edit={false}
            setNewDate={null}
          />
        </div>

        <input
          class="form-control form-control-lg"
          id="ip"
          type="text"
          placeholder="Search todo"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

         <button
          onClick={() => {
            toggleRecording();
            setIsListening(!isListening);
          }}
        >
          {isListening ? "Listening" : "Voice search"}
        </button>

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
