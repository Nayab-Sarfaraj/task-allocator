import React, { useState } from "react";
import * as countryCodes from "country-codes-list";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAgent() {
  // Generate a list of country codes in the format: [Code] Country: +CallingCode
  const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "[{countryCode}] {countryNameEn}: +{countryCallingCode}"
  );

  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "countryCode") {
      // Extract only the country calling code
      const arr = e.target.value.split(" ");
      const code = arr[arr.length - 1];
      setFormData({ ...formData, [e.target.name]: code });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.phone.trim()) return toast.error("Mobile number is required");
    if (!formData.countryCode.trim())
      return toast.error("Country code is required");
    if (!formData.password.trim()) return toast.error("Password is required");

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return toast.error("Invalid email format");

    // Phone number validation regex (7 to 15 digits)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(formData.phone))
      return toast.error("Invalid mobile number");

    // Password validation (minimum 6 characters)
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      // Send form data to backend API
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/add-agent",
        { ...formData },
        { withCredentials: true }
      );

      // Reset form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "",
        password: "",
      });

      toast.success("Agent added successfully");
      // 18002090365
      // Navigate to home page if successful
      if (data?.success) navigate("/");
    } catch (error) {
      // Display error message
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Agent</h2>

      {/* Agent Registration Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Agent Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Agent Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        {/* Mobile Number Field */}
        <div>
          <label className="block text-gray-700">Mobile Number</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            name="phone"
          />
        </div>

        {/* Country Code Selection */}
        <div>
          <label className="block text-gray-700">Country Code</label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            name="countryCode"
            onChange={handleChange}
          >
            {Object.values(myCountryCodesObject)
              // sorting the values according to the country code
              .sort()
              .map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          type="submit"
        >
          Add Agent
        </button>
      </form>
    </div>
  );
}

export default AddAgent;
