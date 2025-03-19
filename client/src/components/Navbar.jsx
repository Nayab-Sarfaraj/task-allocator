import React, { useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { SquareUser, CircleUserRound } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    if (!user) redirect("/login");
  }, [user]);
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>
        {user && (
          <button
            className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
