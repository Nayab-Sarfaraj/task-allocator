import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import AuthContextProvider from "./context/authContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <Toaster />
      <App />
    </AuthContextProvider>
  </StrictMode>
);
