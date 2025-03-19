import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./context/authContext"; // Import authentication context
import AddAgent from "./pages/AddAgent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import UploadCSV from "./pages/UploadCSV";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  // Get user profile function from authentication context
  const { getUserProfile } = useAuthContext();

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* public route */}
        <Route path="/login" element={<Login />} />

        {/* protected routes( require authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-agent" element={<AddAgent />} />
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
