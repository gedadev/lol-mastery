import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import APIProvider from "./context/APIContext.jsx";
import SummonerProvider from "./context/SummonerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <APIProvider>
      <SummonerProvider>
        <Router />
      </SummonerProvider>
    </APIProvider>
  </React.StrictMode>
);
