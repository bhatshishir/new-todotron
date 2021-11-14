import TodoCard from "./TodoCard";

const RightMain = ({ user, todos, reload }) => {
  return (
    <div className="rightmain">
      <h1 id="heading1">Pinned</h1>
      <div className="todos-div">
        {todos.map((t) => (
          <TodoCard t={t} key={t.id} user={user} reload={reload} pin={false} />
        ))}
      </div>
    </div>
  );
};

export default RightMain;
