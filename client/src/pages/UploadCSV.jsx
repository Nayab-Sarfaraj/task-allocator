import React, { useState } from "react";
import { CloudUpload } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadCSV() {
  const [file, setFile] = useState(null); // State to store the selected file
  const navigate = useNavigate();

  // Handles file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Updating state with the selected file
  };

  // Handles file upload
  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file"); // Show error if no file is selected

    const formData = new FormData();
    formData.append("file", file); // Append file to FormData object

    try {
      // Sending file to server
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/task/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data?.success) {
        // Show success message
        toast.success("File uploaded successfully");
        // Redirect to tasks page after upload
        navigate("/tasks");
      }
    } catch (error) {
      // Show error message if upload fails
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Upload CSV File
      </h2>

      {/* File upload input */}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />

        <CloudUpload className="text-gray-500 w-10 h-10 mb-2" />
        <span className="text-gray-500 text-sm">
          {file ? file.name : "Click to upload CSV/XLSX file"}
        </span>
      </label>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
      >
        Upload
      </button>
    </div>
  );
}

export default UploadCSV;
