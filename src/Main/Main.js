import { useState } from "react";
import { useWindowSize } from "../customHook/windowSize";
import LeftMain from "./LeftMain";
import RightMain from "./RightMain";
import "./Main.css";
//  import { NoEncryption } from "@mui/icons-material";

const Main = ({ user, pinnedTodos, unpinnedTodos, reload }) => {
  const [width] = useWindowSize();
  const [view, setView] = useState(true);
  const [active, setActive] = useState(true);
  

  return (
    <div className="main" >
      {width > 400 ? (
        <div className="web-view">
          <LeftMain user={user} todos={unpinnedTodos} reload={reload} />
          <RightMain user={user} todos={pinnedTodos} reload={reload} />
        </div>
      ) : (
        <div className="mobile-view">
          {/* <button className="tabs" onClick={() => setView(true)}>Todos view</button> */}
          <ul class="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                class={`nav-link ${active && "active"}`}
                id="ex3-tab-1"
                data-mdb-toggle="tab"
                role="tab"
                href="#"
                aria-controls="tab-1"
                aria-selected="true"
                onClick={() => {
                  setView(true);
                  setActive(true);
                }}
              >
                My Todos
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class={`nav-link ${!active && "active"}`}
                id="ex3-tab-2"
                data-mdb-toggle="tab"
                role="tab"
                href="#"
                aria-controls="tab-2"
                aria-selected="false"
                onClick={() => {
                  setView(false);
                  setActive(false);
                }}
              >
                Pinned Todos
              </a>
            </li>
          </ul>
          {/* <button className="tabs" onClick={() => setView(false)}>Pinned Todos view</button> */}
          {view ? (
            <LeftMain
              id="tab-1"
              class="tab-pane fade"
              user={user}
              todos={unpinnedTodos}
              reload={reload}
            />
          ) : (
            <RightMain
              id="tab-2"
              class="tab-pane fade"
              user={user}
              todos={pinnedTodos}
              reload={reload}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Main;