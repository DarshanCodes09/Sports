import React from "react";
import ReactDOM from "react-dom/client";
import PreviewApp from "./PreviewApp.jsx";
import "./Preview.css";

const rootElement = document.getElementById("preview-root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <PreviewApp />
    </React.StrictMode>,
  );
} else {
  console.error("Preview root element not found.");
}
