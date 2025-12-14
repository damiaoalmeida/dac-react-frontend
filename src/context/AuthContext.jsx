import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode
import { api } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (credentials) => {
      // const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
      const response = await api().post("/api/auth/login", credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      //obtendo as permissões
      const decoded = jwtDecode(token);
      setUserRoles(decoded.roles);

      console.log("User: " + user);
      console.log("decoded: " + decoded);
      console.log("roles: " + decoded.roles);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    console.log("logout");
  };

  return (
    <AuthContext.Provider value={{ user, userRoles, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//Como importar essas funções em outro componente:
//import { AuthProvider, useAuth } from "./AuthContext";