import { useState } from "react";
import { db } from "../firebase";
import { Button } from "react-bootstrap";
import { storage } from "../firebase"
import FlagIcon from "@mui/icons-material/Flag";
import Chip from "@mui/material/Chip";
import { Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import DatePicker from "../utils/DatePicker";
import PriorityDropdown from "../utils/PriorityDropdown";
import "./TodoCard.css";
import unpinicon from "../../src/unpin.png";
// import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PinIcon from '@mui/icons-material/PushPin';


const TodoCard = ({
  t: { todo, id, createdAt, pinned,type,fname, priority, date},
  user: { uid },
  reload,
  pin,
}) => {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState(todo);
  const [newDate, setNewDate] = useState(date.toDate());
  const [newPriority, setNewPriority] = useState(priority);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const flagColor = {
    1: "#dc3545",
    2: "#198754",
    3: "#0d6efd",
  };

  const onEdit = () => {
    db.collection("users")
      .doc(uid)
      .collection("todos")
      .doc(id)
      .update({ todo: task, date: newDate, priority: newPriority });

    reload();
  };


  const handleDelete = () => {
    db.collection("users").doc(uid).collection("todos").doc(id).delete();
    if (type === "audio") {
      storage.ref("audio").child(fname).delete();
    }
    reload();
  };

  const handlePin = () => {
    db.collection("users")
      .doc(uid)
      .collection("todos")
      .doc(id)
      .update({ todo, createdAt, pinned: !pinned });

    reload();
  };
  const day = date.toDate().toDateString().split(" ")[2];
  const month = date.toDate().toDateString().split(" ")[1];
  return (
    <div className="card shadow mb-1 bg-white rounded" id="card">
      <div className="card-body " id="insidecard">
      {type === "text" && todo}
        {type === "audio" && (
          <audio className="audio" controls style={{ outline: "none" }}>
            <source src={todo} type="audio/mp3" />
          </audio>
        )}
         <FlagIcon style={{ fill: `${flagColor[priority]}` }} />
        <Chip label={`${day} ${month}`} variant="outlined" />
        {pin ? (
          
          <IconButton aria-label="pin">
        <PinIcon onClick={handlePin} style={{fill: "rgb(38, 166, 154)"}} />
      </IconButton>
        ) : (
         
          <img src={ unpinicon } className="unpin" id="icons" alt="pin" onClick={handlePin} />
        )}
       
        <IconButton aria-label="edit">
        <EditIcon onClick={handleShow}  style={{fill: "rgb(104, 159, 56)"}}/>
      </IconButton>
        
        <IconButton aria-label="delete">
        <DeleteIcon onClick={handleDelete} style={{fill: "rgb(213, 0, 0)"}}/>
      </IconButton>
        
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mbody" style={{ display: "flex", flexDirection: "column" }}>
        {type == "text" && (
            <TextField
              className="mb-3"
              id="outlined-basic"
              label="Task"
              variant="outlined"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          )}
          <DatePicker
            date={newDate}
            setNewDate={setNewDate}
            edit={true}
            setDate={null}
          />
          <PriorityDropdown
            style={{ marginTop: "10px" }}
            priority={newPriority}
            setNewPriority={setNewPriority}
            edit={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              onEdit();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoCard;
