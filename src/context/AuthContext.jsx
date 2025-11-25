import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
   
  };

  return (
    <AuthContext.Provider value={{ signUp, user, isAuthenticated, signin }}>
      {children}
    </AuthContext.Provider>
  );
};
