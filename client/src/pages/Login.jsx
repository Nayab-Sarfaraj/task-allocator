import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function Login() {
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to store user input (email & password)
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  // Extracting authentication functions and state from context
  const { login } = useAuthContext();

  // Handles changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(formData); // Call login function from context

      if (data?.success) {
        toast.success("Login Successfully");
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
