import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { SquareUser, CircleUserRound } from "lucide-react";

function Navbar() {
  const { user } = useAuthContext();
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>
        {user ? (
          <>
            <CircleUserRound />
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
