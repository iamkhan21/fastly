import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@assets/styles/_main.pcss";
import "@application/init";
import "uno.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
