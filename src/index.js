import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <React.StrictMode>
     <SpeechProvider
      appId="dc1e80ed-ee7e-4c86-b7fa-eedfed674ca1"
      language="en-US"
    >
      <App />
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
