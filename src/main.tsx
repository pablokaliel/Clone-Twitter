import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes";
import { AuthProvider } from "./utils/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
