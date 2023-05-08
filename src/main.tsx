import React from "react";
import ReactDOM from "react-dom/client";
import RockPaperScissors from "./RockPaperScissors";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RockPaperScissors />
    </BrowserRouter>
  </React.StrictMode>
);
