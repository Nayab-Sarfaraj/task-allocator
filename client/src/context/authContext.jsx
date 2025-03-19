import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
// creating the auth context
const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  // this will contain the user credentials
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  // the functions let user login
  const login = async (formData) => {
    try {
      // making request to the server
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/login",
        {
          ...formData,
        },
        { withCredentials: true }
      );
      setUser(data?.user);
      if (data.user.isAdmin) setIsAdmin(true);
      return data;
    } catch (error) {
      toast(error.response?.data?.message || "Something went wrong");
    }
  };
  // this function will fetch the user profile
  const getUserProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/me", {
        withCredentials: true,
      });
      setUser(data?.user);
      setIsAdmin(data?.user?.isAdmin);

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ isAdmin, user, login, getUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
