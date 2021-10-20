import { useState } from "react";
import { useWindowSize } from "../customHook/windowSize";
import LeftMain from "./LeftMain";
import RightMain from "./RightMain";
import "./Main.css";

const Main = ({ user, pinnedTodos, unpinnedTodos, reload }) => {
  const [width] = useWindowSize();
  const [view, setView] = useState(true);

  return (
    <div className="main">
      {width > 400 ? (
        <div className="web-view">
          <LeftMain user={user} todos={unpinnedTodos} reload={reload} />
          <RightMain user={user} todos={pinnedTodos} reload={reload} />
        </div>
      ) : (
        <div className="mobile-view">
          <button onClick={() => setView(true)}>Todos view</button>
          <button onClick={() => setView(false)}>Pinned Todos view</button>
          {view ? (
            <LeftMain user={user} todos={unpinnedTodos} reload={reload} />
          ) : (
            <RightMain user={user} todos={pinnedTodos} reload={reload} />
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
