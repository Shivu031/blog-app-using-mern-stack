import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken,userData) => {
    setToken(serverToken);
    setUser(userData);
    localStorage.setItem("token", serverToken);
    localStorage.setItem("user", userData);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("user",user);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Get user function to check the user Authentication or not
  const getUser = async (userId, token) => {
    if (token && userId) {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`);
            setUser(res.data);
            localStorage.setItem("user",res.data);
            console.log(res);
        } catch (error) {
            console.error('Failed to fetch user', error);
            LogoutUser(); // Logout the user if token is invalid
        }
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}>
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