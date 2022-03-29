import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@assets/styles/_main.pcss";
import "@application/init";
import "uno.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
