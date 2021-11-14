import { db } from "../firebase";
import { Button } from "react-bootstrap";

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
      <div className="card-body ">
        {todo}
        {pin ? (
          <Button variant="dark ms-5" onClick={handlePin}>
            Pin
          </Button>
        ) : (
          <Button variant="dark ms-5" onClick={handlePin}>
            Unpin
          </Button>
        )}
        <Button variant="danger ms-5" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
