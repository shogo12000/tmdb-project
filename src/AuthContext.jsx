import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [tokenValidate, setTokenValidate] = useState(
    !!Cookies.get("authToken")
  );

  useEffect(() => {
    console.log("checando o token");
    const token = Cookies.get("authToken");
    setTokenValidate(!!token);
    console.log(tokenValidate);
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    setUser("");
    setTokenValidate(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, tokenValidate, setTokenValidate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
