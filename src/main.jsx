import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import APIProvider from "./APIContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <APIProvider>
      <Router />
    </APIProvider>
  </React.StrictMode>
);
