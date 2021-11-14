import { db } from "../firebase";
import { Button } from "react-bootstrap";
import deleteicon from "../../src/trash.png"
import pinicon from "../../src/pin.png"
import unpinicon from "../../src/unpin.png"

const TodoCard = ({
  t: { todo, id, createdAt, pinned },
  user: { uid },
  reload,
  pin,
}) => {
  const handleDelete = () => {
    db.collection("users").doc(uid).collection("todos").doc(id).delete();
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

  return (
    <div className="card shadow mb-1 bg-white rounded">
      <div className="card-body " id="insidecard">
        {todo}
        {pin ? (
          //  <Button variant="dark ms-5" onClick={handlePin}>
          //   Pin
          // </Button>
          <img src={ pinicon } className="pin" id="icons" alt="pin" onClick={handlePin}/>
        ) : (
          // <Button variant="dark ms-5" onClick={handlePin}>
          //   Unpin
          // </Button>
          <img src={ unpinicon } className="pin" id="icons" alt="pin" onClick={handlePin}/>
        )}
        <img src={deleteicon} className="trash" id="icons" alt="delete" onClick={handleDelete}/>
        {/* <Button variant="danger ms-5" onClick={handleDelete}>
         Delete
        </Button> */}
      </div>
    </div>
  );
};

export default TodoCard;
