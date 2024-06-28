import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [users, setUsers] = useState([]);

  const storeTokenInLS = (serverToken, userData) => {
    localStorage.setItem("token", serverToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(serverToken);
    setUser(userData);
  };

  let isLoggedIn = !!token && !!user;

  console.log("token", token);
  console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);

  const LogoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    console.log("Token and user after logout:", localStorage.getItem("token"), localStorage.getItem("user"));
  };

  const getUser = async (userId, token) => {
    if (token && userId) {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (error) {
        console.error('Failed to fetch user', error);
        LogoutUser();
      }
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    getUser();
    getAllUsers();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
