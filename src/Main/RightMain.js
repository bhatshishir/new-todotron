import TodoCard from "./TodoCard";

const RightMain = ({ user, todos, reload }) => {
  return (
    <div className="ms-5">
      <h2>Pinned</h2>
      <div className="todos-div">
        {todos.map((t) => (
          <TodoCard t={t} key={t.id} user={user} reload={reload} pin={false} />
        ))}
      </div>
    </div>
  );
};

export default RightMain;
