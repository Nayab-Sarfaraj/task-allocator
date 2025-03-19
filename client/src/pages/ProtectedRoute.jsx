import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import Login from "./Login";

function ProtectedRoute() {
  const { isAdmin } = useAuthContext(); // Getting authentication details from context

  // If the user is not an admin, redirect to the login page
  return !isAdmin ? <Login /> : <Outlet />;
}

export default ProtectedRoute;
