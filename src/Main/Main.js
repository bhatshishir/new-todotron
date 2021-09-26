import LeftMain from "./LeftMain";
import RightMain from "./RightMain";

const Main = ({ user, pinnedTodos, unpinnedTodos, reload }) => {
  return (
    <div className="main">
      <LeftMain user={user} todos={unpinnedTodos} reload={reload} />
      <RightMain user={user} todos={pinnedTodos} reload={reload} />
    </div>
  );
};

export default Main;
