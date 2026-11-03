import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.css";

// Mount the React application to the root DOM element
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found in HTML!");
}

